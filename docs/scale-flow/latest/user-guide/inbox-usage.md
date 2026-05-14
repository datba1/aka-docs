---
id: inbox-usage
title: Inbox Usage
sidebar_label: Inbox Usage
sidebar_position: 19
description: Step-by-step Inbox guide based on the current ScaleFlow UI.
displayed_sidebar: scaleFlowSidebar
---

# Inbox Usage

## What Inbox is for

Use Inbox to:

- View customer conversations from connected channels
- Organize work by assignee, lifecycle stage, or company-wide queue
- Reply to customers or add internal notes
- Assign conversations to users, teams, or AI assistants
- Update contact lifecycle stage while handling a conversation

## Open Inbox

1. In the left sidebar, click **Inbox**.
2. The page opens in a 3-column layout:
   - Left: inbox categories
   - Middle: conversation list
   - Right: active conversation + contact panel

![Inbox overview with 3-column layout](/img/inbox.png)

If you cannot open Inbox, ask your admin to check your `inbox.conversation.view` permission.

## Understand the left inbox categories

Inbox categories are shown in the left panel:

- **My inbox**
  - **Assigned to me**
  - **Assigned to my team**
  - **Mentions**
  - **Unassigned**
- **Lifecycle stages** (dynamic list from your workspace tags)
- **Company inbox**
  - **All**

Tip: click the same category again to refresh conversation data.

## Work with the conversation list (middle panel)

In the middle panel, you can:

- **Search** conversations by keyword
- **Sort** by newest or oldest
- **Filter** by:
  - Channel
  - Contact labels
  - Lifecycle stage
- Scroll to load more conversations automatically

![Conversation list with search, sort, and filters](/img/conversation-list-search-sort-filter.png)

Click any conversation row to open it.

## Understand each conversation row

Each row can show:

- Contact avatar and channel badge
- Conversation title/contact name
- Latest message preview
- Relative time (for example, "5m ago")
- Contact/lifecycle badges

For users with update/manage access, a menu is available to:

- Close conversation
- (UI shows pin/mark unread options, but close is the core action used in current flow)

Important: closing a conversation removes that conversation and related messages/notes.

## Use the conversation header (top of chat area)

When a conversation is open, the header lets you:

- Select a specific channel or keep **All channels**
- Change lifecycle stage for the contact
- Move to next lifecycle stage quickly
- Assign/unassign conversation to:
  - User
  - Team
  - AI Assistant
- Show/hide the right contact info panel

## Reply to customers or add internal notes

At the bottom input area:

1. Choose tab:
   - **Reply**: sends customer-facing message
   - **Internal note**: adds internal note only
2. Type your message.
3. (Optional) Attach a file using the upload button.
4. Click **Send** (or **Add Note** in Internal note tab).

If you can open the conversation but cannot type/send, you are in read-only mode for that conversation.

## Use AI buttons in chat (if enabled)

When Inbox Co-pilot assistants are enabled:

- In **Reply** tab: **AI Smart Reply** can draft a reply
- In **Internal note** tab: **AI Smart Summary** can draft a note
- If your draft already has text: **AI Smart Writing** appears to rewrite/translate/improve text

If AI buttons are missing, check whether those assistants are enabled in Inbox Co-pilot settings.

## Reply to a specific message

On each message, open the action menu to:

- Copy message
- Reply to that specific message (quote-style reply)
- Copy message link

![Message action menu in a conversation](/img/action-message.png)

After choosing reply, a reply preview appears above the input. You can remove it before sending.

## Use the contact panel (right side)

The right panel shows contact details for the active conversation.

Main tabs:

- **Contact**: core contact profile fields
- **Tickets**: view related tickets and create a new ticket
- **Attachments**: files related to the contact

![Contact profile panel in Inbox](/img/profile-inbox.png)

You can also open the full contact page using the external-link icon in the panel header.

## Test chat (safe simulation)

In Inbox header actions, a flask icon opens **Test Chat** (if your role allows it).

Use it to simulate customer messages for internal testing:

- Messages are for testing only
- They do not impact real customers
- The first test message can create a test conversation in Inbox automatically

## Recommended workflow

1. Start from **Assigned to me**.
2. Open one conversation and review contact info first.
3. Use **Reply** for customer messages and **Internal note** for team context.
4. Set lifecycle stage and assignment before moving to next conversation.
5. Use filters when the queue is large (channel + lifecycle stage is usually enough).
