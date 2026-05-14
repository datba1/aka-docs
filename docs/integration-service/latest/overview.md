---
id: overview
title: Integration Service
sidebar_label: Overview
sidebar_position: 1
description: Connect Akabot with enterprise applications, APIs, and third-party services.
displayed_sidebar: integrationServiceSidebar
---

# Integration Service

Akabot Integration Service provides a low-code connectivity layer that bridges Akabot with enterprise applications, cloud platforms, and third-party APIs. Instead of writing custom HTTP calls inside every workflow, teams configure reusable connections and triggers once and use them anywhere.

## Key features

- **Pre-built connectors** — Ready-made connections to 200+ applications including SAP, Salesforce, ServiceNow, Microsoft 365, Jira, and major cloud services.
- **REST & SOAP support** — Configure any HTTP endpoint as a named connection; Integration Service handles authentication, retries, and error mapping.
- **Event triggers** — Start workflows automatically when an external event occurs — a new email, a form submission, a webhook from a SaaS app.
- **Data transformation** — Map and transform payloads between systems using a visual field mapper or JSONata expressions.
- **Connection vault** — Credentials and OAuth tokens are stored securely and never exposed to workflow developers.
- **Health monitoring** — Real-time connectivity status for every configured connection with alerting on failures.

## Common integration patterns

| Pattern | Description |
|---------|-------------|
| **Trigger on event** | A webhook from an external system launches an Akabot workflow automatically. |
| **Read & sync** | Pull data from a source system, transform it, and write it to a target system. |
| **Callback on completion** | After a workflow finishes, post the result back to the originating system. |
| **Polling** | Periodically check an external API for new records and process each one as a queue item. |

## Supported authentication methods

- API Key / Bearer Token
- OAuth 2.0 (Authorization Code, Client Credentials)
- Basic Authentication
- Certificate-based (mTLS)

## Getting started

1. Open Akabot Center and navigate to **Integration Service**.
2. Browse the connector catalog and select your target application.
3. Configure authentication and test the connection.
4. Use the connector in Studio via the **Integration Service** activity group.

## Next steps

- [API Reference](/docs/latest/api-reference/overview) — Manage connections programmatically.
- [Akabot Hub](/docs/latest/hub/overview) — Find community-published connectors.
