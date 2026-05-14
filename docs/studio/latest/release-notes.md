---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
sidebar_position: 2
description: What's new, improved, and fixed in each version of Akabot Studio.
displayed_sidebar: studioSidebar
---

# Akabot Studio — Release Notes

## v3.2.0 — April 2026

### New features
- **AI-assisted workflow generation** — Describe a process in plain text and Studio generates a draft workflow skeleton.
- **Multi-monitor support** — Anchor the canvas and properties panel across separate monitors.
- **Activity search improvements** — Fuzzy search now matches partial activity names and property labels.

### Improvements
- Debugger step-over is now 40% faster on workflows with more than 200 activities.
- Project templates updated to use the latest activity package versions.
- Variable panel now groups variables by scope (workflow, sequence, global).

### Bug fixes
- Fixed a crash when dragging an activity onto a collapsed sequence container.
- Fixed incorrect line numbers reported in error messages for nested Try/Catch blocks.
- Resolved an issue where undo history was lost after saving a workflow.

---

## v3.1.0 — January 2026

### New features
- **Canvas minimap** — Navigate large workflows using the minimap overlay in the bottom-right corner.
- **Inline property validation** — Mandatory properties are highlighted immediately when left empty.
- **Git diff viewer** — View a side-by-side diff of workflow changes before committing.

### Improvements
- Publish to Center dialog now shows target environment and robot group selection.
- Improved startup time by 25% by lazy-loading activity package metadata.

### Bug fixes
- Fixed an issue where the browser activity failed to launch on machines with multiple Chrome profiles.
- Corrected argument binding when invoking a workflow file with output arguments.

---

## v3.0.0 — September 2025

### New features
- **Akabot Studio 3.0 redesign** — New dark-mode-first UI with resizable panels and a command palette (`Ctrl+P`).
- **Native ARM64 support** — Studio now runs natively on ARM64 Windows devices.
- **Workflow analyzer** — Static analysis engine flags unreachable code, unused variables, and naming violations.

### Breaking changes
- Projects created in v2.x must be migrated using **File → Migrate Project** before opening in v3.0.
- The legacy Silverlight-based UI recorder has been removed. Use the new cross-browser recorder instead.

### Bug fixes
- Resolved a memory leak when running long-duration debugging sessions.
- Fixed token expiry handling when publishing to a Center with SSO enabled.
