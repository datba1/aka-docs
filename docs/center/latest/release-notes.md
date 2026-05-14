---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 2
description: What's new, improved, and fixed in each version of Akabot Center.
displayed_sidebar: centerSidebar
---

# Akabot Center — Release Notes

## v3.2.0 — April 2026

### New features
- **Autopilot orchestration** — Describe a trigger condition and goal in natural language; Center builds the schedule and queue configuration automatically.
- **Robot health dashboard** — New dedicated view showing CPU, memory, and session status for every connected robot in real time.
- **Environment promotion wizard** — Guided workflow to promote a process package from Dev → UAT → Prod with approval gates.

### Improvements
- Queue item priority levels increased from 3 to 10 for finer-grained dispatch control.
- Execution log search now supports regex patterns and date-range filters.
- API response times for `/processes` and `/jobs` endpoints improved by 35%.

### Bug fixes
- Fixed a race condition causing duplicate job dispatches when two schedules fired within the same second.
- Resolved incorrect "last seen" timestamps for robots in the GMT+7 timezone.
- Fixed broken pagination in the audit log when filtering by user.

---

## v3.1.0 — January 2026

### New features
- **Multi-tenancy** — A single Center installation can now host multiple isolated tenants with separate users, robots, and processes.
- **Webhook triggers** — Start a process via an inbound HTTP POST from any external system.
- **SLA tracking** — Define expected completion times per queue; Center alerts when items breach their SLA.

### Improvements
- Role management UI redesigned with permission-group templates (Operator, Developer, Admin).
- Package upload size limit increased from 50 MB to 200 MB.

### Bug fixes
- Fixed an issue where disabling a schedule did not immediately halt the next pending trigger.
- Corrected queue throughput metrics when items were abandoned and retried.

---

## v3.0.0 — September 2025

### New features
- **Center 3.0 portal** — Fully redesigned web UI built on React with improved accessibility (WCAG 2.1 AA).
- **High-availability mode** — Active-passive failover with automatic leader election using Raft consensus.
- **Fine-grained audit log** — Every API call, login, and configuration change is now recorded with IP and user agent.

### Breaking changes
- The v2 REST API (`/api/v2/`) is deprecated. Migrate to `/api/v3/` before the v4.0 release.
- Robot machine keys from v2.x must be re-registered after upgrading.

### Bug fixes
- Resolved a database deadlock under high-concurrency queue processing.
- Fixed LDAP group sync failing silently when the directory server returned partial results.
