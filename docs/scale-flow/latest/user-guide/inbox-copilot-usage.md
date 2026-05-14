---
id: inbox-copilot-usage
title: Inbox Copilot Usage
sidebar_label: Inbox Copilot Usage
sidebar_position: 17
description: Practical guide to enable, configure, and use Inbox Co-pilot based on the current UI.
displayed_sidebar: scaleFlowSidebar
---

# Inbox Copilot Usage

## What Inbox Co-pilot is for

In the current UI, Inbox Co-pilot includes 5 assistants:

- **AI Smart Summary (Smart Summary)**: generates conversation summaries
- **Smart Reply (Smart Reply)**: provides quick reply suggestions
- **Smart Writing (Smart Writing)**: rewrites draft content based on selected actions
- **Custom AI Assistant (Smart Assistant)**: uses a published Agent to assist conversations automatically
- **Follow-up Assistant (Follow-up)**: sends follow-up after a period of inactivity

## Open Inbox Co-pilot

1. In the left sidebar, open **AI**.
2. Select **Inbox Assistant (Inbox Co-pilot)**.
3. You will see assistant cards.

![Inbox Co-pilot assistant list](/img/list-inbox-copilot.png)

## Required permissions

Based on the current UI route guards:

- **Open Inbox Co-pilot and main configuration pages**: `Inbox -> Update`
- **Use View Tasks in Smart Assistant**: `Agen -> Manage`

If you cannot see the menu or edit/save buttons, ask your admin to review your permissions.

## Assistant list page

The list page shows:

- Assistant name
- **Enabled** / **Disabled** status
- Short description
- Last updated date

Click any card to open that assistant's edit page.

## Configure each assistant

![Inbox Co-pilot edit page](/img/edit-inbox-copilot.png)

Each edit page has:

- **Cancel**: return to list
- **Save changes**: save configuration

### 1) Smart Summary and Smart Reply

Both pages have the same structure:

- **Model**: choose AI model
- **Messages used**: number of messages used as context
- **Enabled**: turn assistant on/off
- **System Prompt / AI Instructions**: instructions for how AI should generate content

Recommended setup:

- Start with a short and clear prompt.
- Save and test directly in Inbox chat.
- If responses are too long/short, adjust prompt first, then advanced model settings.

### 2) Smart Writing

This page includes:

- **Model**
- **Messages used**
- **Enabled**
- **Writing actions** section

Inside **Writing actions**, you can:

- **Add action**: add an executable prompt action (leaf action)
- **Add group**: create a group for menu organization
- Drag and drop to reorder
- Click a row to edit:
  - **Display name**
  - **Icon**
  - **Disabled** (hide from chat UI)
  - **Prompt** (leaf actions only)

Notes:

- Groups are for menu organization only and do not run prompts.
- Only leaf actions execute rewriting.

### 3) Smart Assistant

This page allows you to use an existing Agent:

- **Agent**: choose an agent
- **Agent version**: choose a published version or keep **Latest**
- **Runtime config**:
  - **Always**
  - **Outside working hours** (preset 17:00-08:00)
  - **Custom** (set custom time ranges)
- **Messages used**
- **Enabled**
- **Contact identification enabled** + **Conversation instructions**

If you have agent management permission, you will also see **View Tasks**.

### 4) Follow-up

This page includes:

- **Wait time before sending (hours)**: from 1 to 23
- **Messages used**
- **Model**
- **Enabled**
- **Action**:
  - **Send message**
  - **Notify Admin** (currently shows a notice and will be completed in a later version)

If you choose **Send message**, fill in:

- **Follow-up message instructions**

## Use Inbox Co-pilot directly in Inbox chat

After enabling assistants in settings, use them directly in Inbox chat:

1. Open a conversation.
2. In the composer area:
   - **Reply** tab: use **AI Smart Reply** (Smart Reply)
   - **Internal Note** tab: use **AI Smart Summary** (Smart Summary)
3. When draft text exists and Smart Writing is enabled, use **AI Smart Writing**:
   - Select an action from the menu to rewrite
   - Or use **Custom prompt** for one-time instructions
4. Review the generated text, then click **Send** (or **Add Note**).

## Recommended workflow

1. Enable **Smart Reply** first for the fastest impact.
2. Set a simple, clear prompt that matches your brand tone.
3. Enable **Smart Summary** for internal-note workflows.
4. Then configure **Smart Writing** with 5-10 truly useful actions.
5. Test in chat/inbox before rolling out to the whole team.

## Quick troubleshooting

### Cannot see Inbox Co-pilot menu

- Check `inbox.conversation.update`.

### Can open the page but cannot use AI in chat

- Check whether the corresponding assistant is **Enabled**.
- Check whether a valid **Model** is selected.

### Cannot see Smart Writing button in composer

- The button appears only when:
  - Smart Writing is enabled, and
  - The input already contains draft text.

### Smart Assistant does not run on the expected schedule

- Review **Runtime config**.
- If using **Custom**, make sure each time window has valid start/end times.
