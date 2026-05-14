---
id: knowledge-usage
title: Knowledge Usage
sidebar_label: Knowledge Usage
sidebar_position: 15
description: Practical guide to create, sync, test, and manage Knowledge Bases using the current UI.
displayed_sidebar: scaleFlowSidebar
---

# Knowledge Usage

## What Knowledge is for

Use **Knowledge** to:

- Store business documents and reference data for AI
- Keep data updated by syncing from connected sources
- Test answers before linking knowledge to an AI Agent

## Open Knowledge from the menu

1. In the left sidebar, open **AI**.
2. Select **Knowledge**.
3. You will see the knowledge base list page.

## Permissions you need

In the current UI, actions are controlled by permissions:

- **View Knowledge list/detail**: `knowledge.view`
- **Create/Edit/Delete Knowledge and Upload files**: `knowledge.manage`
- **Run sync/crawl/test actions**: `knowledge.update` (or permissions that imply it, such as `knowledge.manage`)

If action buttons are missing (for example **Add knowledge**, **Upload**, **Synchronize**, **Crawl Web**, **Test Knowledge**), ask your admin to review your permissions.

## Knowledge list page

![Knowledge list page](/img/list-knowledge.png)

On the **Knowledge** page, you can:

- Search by source name with **Search by data source name**
- Filter by status with **All statuses**
- Use **Reset filters** to clear search and status filters
- Open one knowledge base by clicking its card
- Create a new knowledge base with **Add knowledge** (if authorized)

Knowledge cards display:

- Name
- Source type (File Upload, Google Drive, or Crawl Web)
- Current status (`Ready`, `Syncing`, `Pending`, `Failed`)
- Last update date

## Create a new knowledge base

![Create a new knowledge](/img/create-knowledge.png)

1. Click **Add knowledge**.
2. Enter:
   - **Name** (required)
   - **Description** (optional)
3. Select **Source type**:
   - **File Upload**
   - **Google Drive**
   - **Crawl Web**
4. Complete source-specific fields.
5. Click **Add knowledge**.

After creation, the UI opens the knowledge detail page automatically.

## Source type setup (what users will see)

### 1) File Upload

![Create a new knowledge](/img/create-knowledge.png)

- Best for manual document uploads
- No connection setup is required in the create dialog
- After creation, use **Upload** to add files

Supported upload formats in the current UI:

- `.pdf`, `.docx`, `.txt`, `.csv`, `.json`, `.xlsx`, `.xls`

### 2) Google Drive

![Google Drive](/img/knowledge-google-drive.png)

- Requires an active Google Drive connection
- You select:
  - Google Drive account connection
  - Specific files to sync
- If no active connection exists, the UI asks you to add one in **Integrations** first

### 3) Crawl Web

![Crawl Web](/img/web-crawl.png)

- Enter a target URL (for example documentation or help center pages)
- You can configure crawl behavior, including:
  - Crawl mode
  - Include/Exclude URL filters
  - Max pages and timeout
- Main action button on detail page becomes **Crawl Web**

## Knowledge detail page

![Knowledge detail page](/img/edit-document.png)

Inside one knowledge base, you can:

- Search documents with **Search documents...**
- Filter documents by status
- Select one or many rows in the document table
- Download document files
- Delete documents (if authorized)
- Open action menu for edit/test/delete options

The page also shows an ingestion notice when a sync job is running or queued. While active, the page auto-refreshes and you can cancel the job.

## Main actions by source type

### File Upload knowledge

- Primary button: **Upload**
- More actions:
  - **Edit knowledge**
  - **Synchronize**
  - **Test Knowledge**
  - **Delete**

### Google Drive knowledge

- Primary button: **Sync knowledge**
- More actions:
  - **Edit knowledge**
  - **Test Knowledge**
  - **Delete**

### Crawl Web knowledge

- Primary button: **Crawl Web**
- More actions:
  - **Edit knowledge**
  - **Test Knowledge**
  - **Delete**

## Upload documents (File Upload flow)

![Upload documents](/img/upload-document.png)

1. Open a File Upload knowledge base.
2. Click **Upload**.
3. Choose one or more files.
4. Click **Upload** in the dialog.
5. Wait for upload to complete and review rows in document table.

If a file fails, the UI shows an error toast and file-level status feedback.

## Sync and recrawl behavior

- **Synchronize** starts ingestion for selected documents or all pending documents.
- If another ingestion is already running, the UI shows a conflict dialog:
  - **Wait**
  - **Cancel and Restart**
- For Crawl Web, a similar conflict case allows **Force recrawl**.

## Test Knowledge before real usage

![Test Knowledge](/img/test-document.png)

Use **Test Knowledge** to validate data quality before connecting to AI Agent flows.

Inside the test dialog, you can:

- Ask questions in a chat-style test panel
- Toggle **RAG Query**
- Toggle **With Metadata**
- Select model (required when **RAG Query** is enabled)
- Clear test history with the trash icon

Practical tip: ask 3-5 real customer questions and verify responses before go-live.

## Document table and statuses

The table includes columns such as:

- Name
- Size
- Source Type
- Status
- Last Synced
- Uploaded At
- Sync Error (shown when there are sync errors)

When a web-crawl knowledge base has no documents yet, the empty state shows **Crawl and Sync Now**.

## Delete a knowledge base

![Delete Knowledge](/img/action-knowledge.png)

1. Open the knowledge detail page.
2. Open the action menu.
3. Click **Delete**.
4. Confirm in the dialog.

This removes the knowledge source from the library. Confirm carefully before deleting.

## Recommended workflow for non-technical teams

1. Create the knowledge base with a clear name.
2. Add or sync data from one source type.
3. Wait until status is healthy (`Ready` when possible).
4. Use **Test Knowledge** with real business questions.
5. Update data regularly (Upload/Sync/Crawl) to keep answers fresh.

## Quick troubleshooting

### I cannot see the Knowledge page

- Check `Knowledge -> View` permission.

### I can view but cannot create/edit/upload/delete

- Check `Knowledge -> Manage` permission.

### I cannot run Sync, Crawl, or Test

- Check `Knowledge -> Update` permission (or `Knowledge -> Manage`, which can imply it).

### Sync stays in progress too long

1. Check the ingestion alert on top of the detail page.
2. Use **Cancel** if needed.
3. Start sync again.

### Test Knowledge returns no useful answer

- Verify documents were uploaded/synced successfully.
- Check document statuses and sync errors in the table.
- Re-run sync or crawl after fixing data source issues.
