---
id: channel-integration
title: Channel Integration
sidebar_label: Channel Integration
sidebar_position: 4
description: Step-by-step guide to connect messaging channels in ScaleFlow.
displayed_sidebar: scaleFlowSidebar
---

# Channel Integration

This guide helps you connect messaging channels to ScaleFlow so all customer messages come into one place.

## What to know before you start

- Open **Channels** from the left sidebar menu.
- On the Channels page, you will see the channel list on the left (Zalo, Messenger, WhatsApp, Telegram, and more).
- A channel has a **Connect** button only when that channel type is currently supported.
- If you cannot see **Connect / Test / Reconnect / Delete**, your account likely does not have channel management permission. Ask your admin to grant access.

## Channels currently supported for connection

- Zalo OA
- Messenger (Facebook)
- WhatsApp Business API
- Telegram

Note: Some other channels are visible in the list but currently show **Coming Soon**.

## Standard connection flow (Zalo, Messenger, WhatsApp)

1. Open **Channels**.
2. Select the channel you want from the left panel.
3. Click **Connect**.
4. The system opens that platform's login/authorization popup.
5. Sign in and grant the requested permissions in the popup.
6. Return to ScaleFlow and wait for confirmation (you will see "Waiting for authorization...").
7. Connection is successful when the account appears in **Connected accounts**.

If the process takes too long, click **Cancel** and try again.

![Zalo connection flow](/img/zalo.png)

## Connecting Telegram (slightly different)

![Telegram bot token connection](/img/telegram.png)

Telegram uses a **Bot Token** instead of OAuth popup authorization.

1. Go to **Channels** > **Telegram**.
2. Click **Connect**.
3. Enter your **Bot Token**.
4. Click **Verify Token**.
5. When bot info appears (for example `@yourbotname`), click **Connect** to finish.

If you do not have a Bot Token yet:

1. Open Telegram and search for **@BotFather**.
2. Send `/newbot` and follow the instructions.
3. Copy the generated token and paste it into ScaleFlow.

## Managing connected accounts

After connection, each account is shown in **Connected accounts**. You can:

- **Test**: Check whether the channel is still reachable.
- **Reconnect**: Re-authorize when token/permissions expire or fail.
- **Delete**: Remove the connection from ScaleFlow (new messages from that channel will stop).

You can also see the channel status on each account card (for example: `active`).

## How to confirm it works

1. Click **Test** on the newly connected account.
2. Send a real test message from that channel (Zalo/Facebook/WhatsApp/Telegram).
3. Open **Inbox** and confirm the message arrives.

If the test fails:

- Try **Reconnect**.
- Check whether the source account (Facebook/Zalo/Meta/Telegram) still has valid permissions.
- If it still fails, contact your admin or technical team to check backend integration settings.
