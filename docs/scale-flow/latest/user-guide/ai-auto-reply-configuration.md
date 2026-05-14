---
id: ai-auto-reply-configuration
title: AI Auto-Reply for Inbox
sidebar_label: AI Auto-Reply for Inbox
sidebar_position: 5
description: Practical guide to set up and use Smart Reply in Inbox based on the current UI.
displayed_sidebar: scaleFlowSidebar
---

# AI Auto-Reply for Inbox

## What AI auto-reply means in the current product

In the current UI, Inbox auto-reply is configured at:

- **AI > Inbox Co-pilot > Smart Reply**

When **Smart Reply** is enabled, the system suggests draft replies that agents can quickly review and send to customers.

## Open the Smart Reply settings page

![Smart Reply card in Inbox Co-pilot](/img/smart-reply.png)

1. In the left sidebar, open **AI**.
2. Select **Inbox Co-pilot**.
3. Click the **Smart Reply** card.

If you still cannot find it, use this checklist:

- You should be on page title **Inbox Co-pilot** first (a page with assistant cards).
- The **Smart Reply** card has a message/reply icon and the label **Smart Reply**.
- Clicking that card opens the edit page with action buttons **Cancel** and **Save changes** at the top-right.

## Configure Smart Reply

The Smart Reply page currently includes:

- **Model**: select the AI model used for reply generation.
- **Messages used**: number of recent messages used as context.
- **Enabled**: turn Smart Reply on or off.
- **System Prompt / AI Instructions**: tell AI how replies should sound and behave.

After making changes:

- Click **Save changes** to save.
- Click **Cancel** to return to the assistant list.

## Starter setup (safe and easy)

### Where each setting is located on screen

After you open **AI > Inbox Co-pilot > Smart Reply**, look at the edit form:

1. **Model**
   - Position: first row of the form, as a model selector.
   - What to do: pick the same model your team already uses in other assistants.
2. **Messages used**
   - Position: first row, next to Model (number input).
   - What to do: enter a moderate value like **8-12**.
3. **Enabled**
   - Position: first row, shown as a toggle switch with status text.
   - What to do: switch it to **Enabled**.
4. **System Prompt / AI Instructions**
   - Position: large text editor area below the first row.
   - What to do: paste short instructions for reply style and behavior.
5. **Save changes**
   - Position: top-right corner of the page.
   - What to do: click it after editing; wait for success message.

### Recommended starting point

- Turn on **Enabled**.
- Choose a stable **Model** already used by your team.
- Set **Messages used** to a moderate value (for example, 8-12) so AI has enough context.
- Use a short and clear prompt, for example:
  - Reply briefly and politely using only information already present in the conversation.
  - If information is missing, ask one short clarification question instead of guessing.
  - Do not promise policies or outcomes that are not confirmed.

### Copy-ready starter prompt

You can paste this directly into **System Prompt / AI Instructions**:

> Reply briefly, politely, and clearly using only information already present in this conversation.  
> If key information is missing, ask one short clarification question instead of guessing.  
> Do not promise policies, timelines, or outcomes that are not confirmed.

## Use Smart Reply directly in Inbox

![AI Smart Reply in Inbox composer](/img/ai-smart-writing.png)

1. Open **Inbox** and select a conversation.
2. In the composer, keep the tab on **Reply**.
3. Click **AI Smart Reply**.
4. AI fills the draft into the input box.
5. Review the message and click **Send**.

Important notes:

- In the **Internal note** tab, the AI button changes to **AI Smart Summary** (not Smart Reply).
- If there is existing draft text and Smart Writing is enabled, you may see **AI Smart Writing** instead of **AI Smart Reply**.

## Suggested workflow for support teams

1. Start with one shared prompt for the whole team.
2. Let 1-2 agents test it on real Inbox conversations.
3. Collect feedback: too long, too robotic, or missing key details.
4. Adjust the prompt first; only change the model if truly necessary.
5. Roll it out to the full team after results are stable.

## Quick troubleshooting

### Cannot find Smart Reply under AI > Inbox Co-pilot

- Ask your admin to check access permissions (especially Inbox update-related permissions).

### Smart Reply is visible but cannot be clicked or generates nothing

- Verify **Enabled** is turned on.
- Verify a **Model** is selected.
- Try another conversation in Inbox.

### AI Smart Reply button does not appear in Inbox

- Make sure you are on the **Reply** tab.
- If **AI Smart Writing** appears, clear the draft or temporarily disable Smart Writing and check again.

### AI suggestions are not aligned with expectations

- Refine **System Prompt / AI Instructions** first.
- Keep instructions short, explicit, and action-oriented.
