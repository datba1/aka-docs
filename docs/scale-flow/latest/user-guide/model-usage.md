---
id: model-usage
title: Model Usage
sidebar_label: Model Usage
sidebar_position: 16
description: Practical guide to create providers, create models, and select models in AI Agent using the current UI.
displayed_sidebar: scaleFlowSidebar
---

# Model Usage

## What Models are for

Use **Models** to:

- Connect your AI provider (for example OpenAI, Anthropic, Google)
- Configure API keys and connection settings for each provider
- Create and manage models that AI Agents can use
- Let users choose model behavior in agent setup

## Open Models from the menu

1. In the left sidebar, open **AI**.
2. Select **Models**.
3. You will see the provider list page.

## Required permissions

In the current UI:

- **View Models pages**: `AI Model -> View`
- **Create/update/delete provider or model**: `AI Model -> Manage`

If you can open the page but cannot see buttons such as **Create**, **New Model**, or **Settings**, ask your admin to review your permissions.

## Models page (provider list)

On the **Models** page, you can:

- Search providers
- Click **Create** to add a new provider (if authorized)
- Click a provider card to open its detail page

Each provider card shows:

- Provider display name
- Number of models
- Enabled status
- Configuration status (whether API key is configured)
- Last updated date

![Provider list page](/img/list-provider.png)

## Create a provider

1. Click **Create** on the provider list page.
2. Fill in the dialog:
   - **Provider Type** (OpenAI, Anthropic, DeepSeek, Google, Mistral AI, Amazon Bedrock, Microsoft Azure OpenAI, Alibaba Cloud Model Studio, Hugging Face, Ollama)
   - **Provider Name**
   - **Base URL** (optional)
   - **API Key**
   - **Enabled** (on/off)
   - **Import default models** (on/off, available only when creating a new provider)

![Create provider dialog](/img/create-provider.png)

3. Click **Create**.
4. Open the created provider card to view details.

## Provider detail page

When you open a provider, you can:

- Search models by name
- Click **New Model** to create a model
- Open the actions menu (**...**) and choose:
  - **Settings**
  - **Delete** provider

If no model exists, the page shows an empty state.

![Model list in provider detail](/img/list-model.png)

## Provider Settings

In **Settings**, you can update:

- **Base URL**
- **API Key** (leave it empty to keep the current key)
- **Enabled** switch

You can also see:

- Provider type and provider name (read-only)
- Current API key (masked) and update time (if available)

![Provider settings dialog](/img/setting-provider.png)

## Create a model

1. In provider detail, click **New Model**.
2. Fill required fields:
   - **Model ID** (for example `gpt-4o`)
   - **Model Name** (display name shown in UI)
   - **Capabilities** (select one or more: Text, Vision, Audio, Video, Reasoning, Embeddings)
   - **Enabled** switch

![Create model dialog](/img/create-model.png)

3. Click **Create**.

Notes based on current UI behavior:

- Model name can be auto-suggested from selected capability until you enter a custom name.
- On the provider detail page, provider selection is fixed, so you do not need to choose provider again.

## Edit or delete a model

For each model card:

1. Click the actions icon on the card.
2. Choose **Edit** or **Delete**.
3. Confirm in the dialog when deleting.

![Edit model dialog](/img/edit-model.png)

Delete is permanent for that model entry.

## Managed provider/model behavior

Some providers or models are marked as system-managed.

In the current UI:

- Managed providers do not show **New Model**, **Settings**, or **Delete** actions.
- Managed models cannot be edited or deleted.

This is expected behavior to protect system-managed configuration.

## Use a model in AI Agent

After models are configured, users can select them in AI Agent:

1. Open **AI Agent** > **Agents**.
2. Open an agent.
3. In **Basic information**, find **Model**.
4. Choose a model from the dropdown (grouped by provider).
5. (Optional) Click the settings icon next to the model field to open **Advanced Model Settings**.

## Advanced Model Settings (in agent form)

In the model settings dialog, users can adjust:

- **Temperature**
- **Top P**
- **Max Tokens**
- **Stop Words**
- **Reasoning Level**
- **Verbosity**

Then click **Save**.

Important:

- Some model families do not support temperature control, so temperature will be locked.
- These settings tune the agent response style and length, not provider connection setup.

## Recommended workflow

1. Create one provider with a valid API key.
2. Ensure the provider is **Enabled**.
3. Create 1-3 models your team needs.
4. Open an agent and select the target model.
5. Test responses before publishing agent changes.

## Quick troubleshooting

### I cannot see the Models menu

- Check `AI Model -> View`.

### I can view but cannot create or edit provider/model

- Check `AI Model -> Manage`.

### Provider is created but model list is empty

- Open provider detail and create models with **New Model**.
- Or recreate provider with **Import default models** enabled.

### Agent cannot use my model

- Verify the model is **Enabled**.
- Verify the provider is **Enabled** and has a valid API key.
- Re-open the agent page and select the model again from the dropdown.
