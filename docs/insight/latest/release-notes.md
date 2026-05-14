---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 2
description: What's new, improved, and fixed in each version of Akabot Insight.
displayed_sidebar: insightSidebar
---

# Akabot Insight — Release Notes

## v3.2.0 — April 2026

### New features
- **AI anomaly detection** — Insight automatically flags unusual drops in success rate or throughput and surfaces probable root causes.
- **Custom metrics** — Define calculated metrics using a formula editor that combines raw execution data with business data from Data Service.
- **Dashboard sharing links** — Generate a read-only shareable URL for any dashboard; no login required for recipients.

### Improvements
- Dashboard rendering time for charts with more than 1 million data points reduced by 55%.
- Scheduled report emails now include an embedded summary table so recipients don't need to open the attachment.
- Filter panels now support multi-select for process names, robot groups, and environments.

### Bug fixes
- Fixed robot utilization chart showing values above 100% when overlapping job windows were present.
- Resolved dashboard widgets losing their position after a browser refresh in Firefox.
- Fixed scheduled reports not sending when the report time fell on a daylight-saving clock change.

---

## v3.1.0 — January 2026

### New features
- **FTE savings calculator** — Input average task handling time and volume; Insight computes estimated FTE equivalent and cost savings.
- **Process comparison view** — Compare KPIs for two or more processes side-by-side on a single chart.
- **Drill-down to job logs** — Click any data point on a chart to open the filtered execution log list for that period.

### Improvements
- Data retention window extended to 24 months (up from 12 months).
- Export to Excel now respects applied dashboard filters.
- Insight API rate limit increased from 60 to 300 requests/minute per tenant.

### Bug fixes
- Fixed queue throughput widget counting abandoned items as successfully completed.
- Corrected timezone handling in scheduled reports for tenants in UTC+5:30 and UTC+5:45.

---

## v3.0.0 — September 2025

### New features
- **Akabot Insight v3 launch** — New analytics engine with sub-second query response on datasets up to 500 million rows.
- **Pre-built dashboard library** — 12 out-of-the-box dashboards for process health, robot fleet, queue management, and exception analysis.
- **Drag-and-drop dashboard builder** — Build custom dashboards without writing queries; choose from 20 widget types.

### Breaking changes
- Insight v2 custom dashboard definitions (JSON export) are not importable in v3. Rebuild dashboards using the new builder.

### Bug fixes
- Resolved incorrect aggregation for processes with parallel branches producing multiple log entries per transaction.
