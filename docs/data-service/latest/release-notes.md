---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 2
description: What's new, improved, and fixed in each version of Akabot Data Service.
displayed_sidebar: dataSidebar
---

# Data Service — Release Notes

## v3.2.0 — April 2026

### New features
- **Computed fields** — Define read-only fields whose values are derived from a formula over other fields in the same entity.
- **Entity relationships** — Link records across entities with foreign-key style references and follow them in a single API call.
- **Bulk upsert API** — Insert or update up to 5,000 records in a single request with conflict resolution options.

### Improvements
- Query API now supports `$orderBy`, `$top`, and `$skip` OData parameters for server-side pagination.
- Record history retention period is now configurable per entity (default 90 days).
- Studio activities show auto-complete suggestions for entity names and field paths.

### Bug fixes
- Fixed a deadlock when two workflows performed concurrent upsert operations on the same record.
- Resolved incorrect `updatedAt` timestamps when records were modified via the REST API.
- Fixed export to Excel failing for entities with more than 65,000 records.

---

## v3.1.0 — January 2026

### New features
- **Field-level encryption** — Mark individual fields as encrypted-at-rest; decrypted values are only returned to authorized callers.
- **Webhooks** — Trigger an outbound HTTP call whenever a record is created, updated, or deleted.
- **Import from CSV** — Bulk-import records directly from a CSV file in the Center portal.

### Improvements
- Maximum entity count per tenant increased from 50 to 200.
- Maximum field count per entity increased from 50 to 150.
- REST API responses now include an `X-Request-Id` header for distributed tracing.

### Bug fixes
- Fixed a schema migration issue that caused field reordering to be lost after a Center upgrade.
- Corrected permission checks that allowed read-only users to call the delete endpoint.

---

## v3.0.0 — September 2025

### New features
- **Data Service v3 launch** — New schema-driven NoSQL store replacing the legacy Orchestrator assets system.
- **Visual schema builder** — Create and modify entity schemas directly in the Center web UI with no downtime.
- **Studio activity pack** — First-party `Create Record`, `Get Record`, `Update Record`, and `Delete Record` activities.

### Breaking changes
- Legacy Orchestrator `Assets` API is deprecated; migrate asset-backed data to Data Service entities.
- Existing assets are read-only in v3.0 and will be removed in v4.0.

### Bug fixes
- Resolved an issue where deleting an entity with active record references threw an unhandled 500 error.
