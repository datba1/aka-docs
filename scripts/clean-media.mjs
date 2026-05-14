#!/usr/bin/env node
// scripts/clean-media.mjs
//
// Find and (optionally) delete unused media files. Maintainer tool —
// run periodically to keep the repo lean.
//
// Usage:
//   node scripts/clean-media.mjs           # interactive
//   node scripts/clean-media.mjs --dry-run # report only, no prompts
//
// Logic:
//   1. Scan every .md / .mdx in docs/ and i18n/ for media references
//      (markdown image/link syntax + HTML <img>/<video>/<source>).
//   2. Walk static/ and diff: anything not referenced is an orphan.
//   3. Prompt: delete (a)ll, (n)one, or (s)elect each.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(REPO_ROOT, 'static');
const DRY_RUN = process.argv.includes('--dry-run');

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function relPosix(from, to) {
  return path.relative(from, to).split(path.sep).join('/');
}

function isExternal(url) {
  return /^(https?:|mailto:|tel:|ftp:|#)/i.test(url);
}

// ---------- 1. Collect all media references from markdown -------------------
const MD_IMG_RE  = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const MD_LINK_RE = /(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const HTML_SRC_RE = /<(?:img|video|source|audio)\b[^>]*\bsrc=["']([^"']+)["']/gi;

const referenced = new Set();
const mdRoots = ['docs', 'i18n'].map((d) => path.join(REPO_ROOT, d));
const mdFiles = mdRoots
  .flatMap((d) => walk(d))
  .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

for (const mdFile of mdFiles) {
  const c = fs.readFileSync(mdFile, 'utf8');
  for (const re of [MD_IMG_RE, MD_LINK_RE, HTML_SRC_RE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(c)) !== null) {
      const url = m[1].split('#')[0].split('?')[0];
      if (!url || isExternal(url) || !url.startsWith('/')) continue;
      referenced.add(url.slice(1));  // store path relative to static/
    }
  }
}

// ---------- 2. Diff against static/ ----------------------------------------
const orphans = [];
for (const file of walk(STATIC_DIR)) {
  const relToStatic = relPosix(STATIC_DIR, file);
  if (!referenced.has(relToStatic)) orphans.push(file);
}

if (orphans.length === 0) {
  console.log('OK  no unused media files.');
  process.exit(0);
}

console.log(`\nFound ${orphans.length} unused file(s):\n`);
let totalBytes = 0;
for (let i = 0; i < orphans.length; i++) {
  const sizeKb = fs.statSync(orphans[i]).size / 1024;
  totalBytes += sizeKb * 1024;
  console.log(
    `  [${String(i + 1).padStart(3)}]  ${relPosix(REPO_ROOT, orphans[i])}` +
    `  (${sizeKb.toFixed(1)} KB)`
  );
}
console.log(`\n  Total: ${(totalBytes / 1024 / 1024).toFixed(2)} MB\n`);

if (DRY_RUN) {
  console.log('Dry run — nothing deleted.');
  process.exit(0);
}

// ---------- 3. Interactive prompt -------------------------------------------
const rl = readline.createInterface({input: stdin, output: stdout});

const top = (await rl.question('Delete (a)ll, (n)one, or (s)elect one-by-one? [a/n/s] '))
  .trim()
  .toLowerCase();

let toDelete = [];
if (top === 'a' || top === 'all') {
  toDelete = orphans;
} else if (top === 's' || top === 'select') {
  for (const file of orphans) {
    const rel = relPosix(REPO_ROOT, file);
    const ans = (await rl.question(`  delete ${rel}? [y/N] `)).trim().toLowerCase();
    if (ans === 'y' || ans === 'yes') toDelete.push(file);
  }
} else {
  console.log('Aborted.');
  rl.close();
  process.exit(0);
}

rl.close();

for (const file of toDelete) {
  fs.unlinkSync(file);
  console.log('  deleted: ' + relPosix(REPO_ROOT, file));
}
console.log(`\nOK  deleted ${toDelete.length} file(s).`);
