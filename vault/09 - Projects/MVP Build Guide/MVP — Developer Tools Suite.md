---
title: MVP — Developer Tools Suite
tags:
- mvp
- binary-loom
- complexity-medium
- arch-developer-portal
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Developer Tools Suite
updated: 2026-10-04
division: Binary Loom
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#22D3EE'
product_type: Developer Platform
module_archetype: Developer Portal
---
# MVP — Developer Tools Suite

MVP build brief for **Developer Tools Suite** (Developer Platform), Binary Loom division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Product note | [[Developer Tools Suite]] |
| Product type | Developer Platform |
| Priority | Year 3 - Series B |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#22D3EE` |
| Division palette | `#0B1220` `#22D3EE` `#A3E635` `#F0FDFA` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Developer Portal ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

CLI tools, SDKs, and libraries for Natural Script, ZenFlow integration, and Binary Loom deployments.

## UI direction

- UI vibe: Cloud infrastructure, code fabric, developer-grade precision, observability-first
- Division focus: Digital Infrastructure and Developer Tools
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Python SDK, Node.js library, Python/Typer CLI, GitHub, GitBook/ReadTheDocs.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Developer portal
2. API key management
3. Endpoint catalog
4. Usage analytics
5. Rate limit and billing rules
6. SDK/CLI documentation
7. Webhook/event logs

## Viral and UI design hooks

- Cloud infrastructure dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
developer_tools_suite_items
developer_tools_suite_workflows
developer_tools_suite_status_events
developer_tools_suite_metrics
users
organizations
```

## 90-day build plan

### Days 1-15
- [ ] Scope
- [ ] UX flows
- [ ] Schema
- [ ] Division theme
- [ ] Data boundaries

### Days 16-30
- [ ] Auth
- [ ] App shell
- [ ] Main dashboard
- [ ] Seed data
- [ ] Empty states

### Days 31-60
- [ ] Core workflow
- [ ] AI assistant
- [ ] Reporting/export
- [ ] Analytics cards

### Days 61-75
- [ ] QA
- [ ] Accessibility
- [ ] Permissions
- [ ] Compliance review
- [ ] Feedback pass

### Days 76-90
- [ ] Pilot launch
- [ ] Content/assets
- [ ] Onboarding docs
- [ ] Pricing or internal rollout

## Acceptance criteria

From [[MVP Build QA Checklist]]:

- [ ] **Legibility**: No body text below 10.5-11pt equivalent in PDF or 14px in app UI.
- [ ] **No overlay**: No text on screenshots, art, gradients, or busy backgrounds. Text appears on solid cards/bands only.
- [ ] **Contrast**: White or near-white cards for dark text; dark solid bands for white text. No muted text on saturated color.
- [ ] **Division identity**: Each MVP uses parent shell plus division palette, UI vibe, icon style, and share-card identity.
- [ ] **Compliance**: Blocked/regulated products remain simulation/admin/reporting shells until review clears deployment.
- [ ] **Data**: Every product has owner, schema, audit log, role model, and export/report path.
- [ ] **Launch**: Pilot with seed data, empty states, onboarding copy, and one shareable artifact per product.

## Launch and pricing

- Days 76-90: pilot launch, content/assets, onboarding docs, pricing or internal rollout.
- Launch gate: pilot with seed data, empty states, onboarding copy, and one shareable artifact.
- The guide gives no price for this MVP. Billable services for the division:
  - Cloud infrastructure management
  - API development/integration
  - Natural Script consulting
  - DevOps and CI/CD setup
  - Observability setup
  - Technical architecture consulting
  - Developer portal management

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Binary Loom Division]]
- Director agent: [[Director_Binary_Loom]]
- Product: [[Developer Tools Suite]]
