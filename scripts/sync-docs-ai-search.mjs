import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const env = process.env;

const required = [
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_API_TOKEN",
  "AI_SEARCH_INSTANCE_ID",
  "R2_BUCKET",
];

for (const key of required) {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const docsPrefix = normalizePrefix(env.DOCS_PREFIX || "docs/");
const intervalDays = Number(env.SYNC_INTERVAL_DAYS || "14");
const force = env.FORCE_REINDEX === "true";
const stateKey = env.R2_STATE_KEY || "_meta/ai-search-index-state.json";
const statePath = join(".tmp", "ai-search-index-state.json");
const newStatePath = join(".tmp", "ai-search-index-state.next.json");
const r2Endpoint = `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const r2StateUri = `s3://${env.R2_BUCKET}/${stateKey}`;

mkdirSync(dirname(statePath), { recursive: true });

const headCommit = git(["rev-parse", "HEAD"]);
const now = new Date();
const state = readState();

if (!state.lastIndexedCommit) {
  writeState({
    lastIndexedAt: now.toISOString(),
    lastIndexedCommit: headCommit,
    lastIndexedBranch: env.GITHUB_REF_NAME || "",
    note: "Baseline initialized by GitHub Action. First full upload/index was handled manually.",
  });
  console.log("No previous state found. Initialized baseline at current HEAD without syncing.");
  process.exit(0);
}

if (!force && !isOlderThanDays(state.lastIndexedAt, intervalDays, now)) {
  console.log(`Last index is newer than ${intervalDays} days. Skipping.`);
  console.log(`lastIndexedAt=${state.lastIndexedAt}`);
  process.exit(0);
}

ensureCommitExists(state.lastIndexedCommit);

const changes = getChangedDocs(state.lastIndexedCommit, headCommit, docsPrefix);

if (changes.length === 0) {
  console.log(`No changes under ${docsPrefix}. Updating state to current HEAD.`);
  writeState({
    ...state,
    lastIndexedAt: now.toISOString(),
    lastIndexedCommit: headCommit,
    lastIndexedBranch: env.GITHUB_REF_NAME || state.lastIndexedBranch || "",
    lastRunResult: {
      changed: 0,
      uploaded: 0,
      deleted: 0,
      skipped: 0,
    },
  });
  process.exit(0);
}

let uploaded = 0;
let deleted = 0;
let skipped = 0;
const failed = [];

for (const change of changes) {
  if (change.status === "D") {
    try {
      await deleteFromR2(change.path);
      await deleteFromAiSearch(change.path);
      deleted += 1;
      console.log(`Deleted ${change.path}`);
    } catch (error) {
      failed.push({ path: change.path, status: change.status, error: messageOf(error) });
    }
    continue;
  }

  if (!existsSync(change.path)) {
    skipped += 1;
    console.log(`Skipped missing file ${change.path}`);
    continue;
  }

  try {
    await uploadToR2(change.path);
    await indexInAiSearch(change.path);
    uploaded += 1;
    console.log(`Uploaded and indexed ${change.path}`);
  } catch (error) {
    failed.push({ path: change.path, status: change.status, error: messageOf(error) });
  }
}

if (failed.length > 0) {
  console.error(JSON.stringify({ failed }, null, 2));
  throw new Error(`Docs sync failed for ${failed.length} file(s)`);
}

writeState({
  lastIndexedAt: now.toISOString(),
  lastIndexedCommit: headCommit,
  lastIndexedBranch: env.GITHUB_REF_NAME || state.lastIndexedBranch || "",
  lastRunResult: {
    changed: changes.length,
    uploaded,
    deleted,
    skipped,
  },
});

console.log(
  JSON.stringify(
    {
      ok: true,
      changed: changes.length,
      uploaded,
      deleted,
      skipped,
      headCommit,
    },
    null,
    2,
  ),
);

function readState() {
  const result = run(
    "aws",
    [
      "s3",
      "cp",
      r2StateUri,
      statePath,
      "--endpoint-url",
      r2Endpoint,
      "--only-show-errors",
    ],
    { allowFailure: true },
  );

  if (result.status !== 0 || !existsSync(statePath)) {
    return {};
  }

  return JSON.parse(readFileSync(statePath, "utf8"));
}

function writeState(nextState) {
  writeFileSync(newStatePath, `${JSON.stringify(nextState, null, 2)}\n`);
  run("aws", [
    "s3",
    "cp",
    newStatePath,
    r2StateUri,
    "--endpoint-url",
    r2Endpoint,
    "--content-type",
    "application/json",
    "--only-show-errors",
  ]);
}

function getChangedDocs(baseCommit, headCommit, prefix) {
  const output = git(["diff", "--name-status", "-M", baseCommit, headCommit, "--", prefix]);

  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const parts = line.split("\t");
      const status = parts[0];

      if (status.startsWith("R")) {
        const oldPath = parts[1];
        const newPath = parts[2];
        return [
          { status: "D", path: oldPath },
          { status: "A", path: newPath },
        ].filter((item) => isIndexableDoc(item.path));
      }

      return [{ status, path: parts[1] }].filter((item) => isIndexableDoc(item.path));
    });
}

function isIndexableDoc(path) {
  return (
    path.startsWith(docsPrefix) &&
    (path.endsWith(".md") || path.endsWith(".mdx") || path.endsWith("_category_.json"))
  );
}

async function uploadToR2(path) {
  run("aws", [
    "s3",
    "cp",
    path,
    `s3://${env.R2_BUCKET}/${path}`,
    "--endpoint-url",
    r2Endpoint,
    "--content-type",
    contentTypeFor(path),
    "--only-show-errors",
  ]);
}

async function deleteFromR2(path) {
  run("aws", [
    "s3",
    "rm",
    `s3://${env.R2_BUCKET}/${path}`,
    "--endpoint-url",
    r2Endpoint,
    "--only-show-errors",
  ]);
}

async function indexInAiSearch(path) {
  const body = {
    key: path,
    next_action: "INDEX",
  };

  const response = await fetch(aiSearchItemsUrl(), {
    method: "PUT",
    headers: {
      authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  await assertCloudflareResponse(response, `AI Search index failed for ${path}`);
}

async function deleteFromAiSearch(path) {
  const item = await findAiSearchItemByKey(path);

  if (!item) {
    console.log(`AI Search item not found for deleted key ${path}; skipping AI Search delete.`);
    return;
  }

  const itemId = encodeURIComponent(item.id);
  const response = await fetch(`${aiSearchItemsUrl()}/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
    },
  });

  if (response.status === 404) {
    return;
  }

  await assertCloudflareResponse(response, `AI Search delete failed for ${path}`);
}

async function findAiSearchItemByKey(path) {
  for (let page = 1; page <= 50; page += 1) {
    const url = new URL(aiSearchItemsUrl());
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", "100");

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      },
    });

    const payload = await assertCloudflareResponse(response, `AI Search list items failed`);
    const items = Array.isArray(payload?.result) ? payload.result : [];
    const found = items.find((item) => item.key === path);

    if (found) {
      return found;
    }

    if (items.length < 100) {
      return null;
    }
  }

  throw new Error(`AI Search item lookup exceeded pagination limit for ${path}`);
}

function aiSearchItemsUrl() {
  const base = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai-search`;

  if (env.AI_SEARCH_NAMESPACE) {
    return `${base}/namespaces/${encodeURIComponent(env.AI_SEARCH_NAMESPACE)}/instances/${encodeURIComponent(
      env.AI_SEARCH_INSTANCE_ID,
    )}/items`;
  }

  return `${base}/instances/${encodeURIComponent(env.AI_SEARCH_INSTANCE_ID)}/items`;
}

async function assertCloudflareResponse(response, message) {
  const text = await response.text();
  let payload = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success === false) {
    throw new Error(`${message}: ${response.status} ${text.slice(0, 1000)}`);
  }

  return payload;
}

function ensureCommitExists(commit) {
  run("git", ["cat-file", "-e", `${commit}^{commit}`]);
}

function git(args) {
  return run("git", args).stdout.trim();
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0 && !options.allowFailure) {
    throw new Error(
      `${command} ${args.join(" ")} failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }

  return result;
}

function isOlderThanDays(value, days, nowDate) {
  if (!value) {
    return true;
  }

  const then = new Date(value);
  if (Number.isNaN(then.getTime())) {
    return true;
  }

  return nowDate.getTime() - then.getTime() >= days * 24 * 60 * 60 * 1000;
}

function normalizePrefix(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function contentTypeFor(path) {
  if (path.endsWith(".md") || path.endsWith(".mdx")) {
    return "text/markdown; charset=utf-8";
  }

  if (path.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }

  return "application/octet-stream";
}

function messageOf(error) {
  return String(error?.message || error);
}

process.on("exit", () => {
  if (existsSync(".tmp")) {
    rmSync(".tmp", { recursive: true, force: true });
  }
});
