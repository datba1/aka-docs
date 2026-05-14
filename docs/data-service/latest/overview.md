---
id: overview
title: Data Service
sidebar_label: Overview
sidebar_position: 1
description: Store, query, and manage structured data used across your automation workflows.
displayed_sidebar: dataSidebar
---

# Data Service

Akabot Data Service provides a managed, schema-driven data store that automation workflows can read from and write to at runtime. It removes the need to maintain external databases for workflow state, lookup tables, audit trails, or inter-process communication.

## Key features

- **Schema builder** — Define entities (tables) and fields visually with type validation, without writing SQL.
- **CRUD from workflows** — Built-in Studio activities let workflows create, read, update, and delete records at runtime.
- **Record history** — Every change is versioned so you can audit what data a workflow read or wrote during a run.
- **Access control** — Restrict which robots, processes, or users can read or modify each entity.
- **REST API** — Query or modify records from external systems using the Data Service REST API.
- **Export / Import** — Export entity data to CSV/Excel or bulk-import seed data.

## Common use cases

| Use case | Description |
|----------|-------------|
| **Lookup tables** | Store product codes, employee IDs, or routing rules that multiple workflows share. |
| **Process state** | Track the progress of long-running, multi-step processes across runs. |
| **Audit log** | Record inputs, outputs, and decisions made by every workflow execution. |
| **Configuration** | Centralize environment-specific settings that can be updated without redeploying a workflow. |

## Getting started

1. Open Akabot Center and navigate to **Data Service**.
2. Create a new entity and define its fields.
3. Use the **Data Service** activities in Studio to read or write records.

## Next steps

- [API Reference](/docs/latest/api-reference/overview) — Query Data Service via REST.
- [Admin guide](/docs/latest/admin/overview) — Manage permissions and storage quotas.
