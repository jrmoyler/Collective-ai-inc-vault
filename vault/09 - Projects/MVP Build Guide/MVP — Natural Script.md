---
title: MVP — Natural Script
tags:
- mvp
- binary-loom
- complexity-low-medium
- arch-command-shell
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Natural Script
updated: 2026-10-04
division: Binary Loom
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#22D3EE'
product_type: Programming Language / Framework
module_archetype: Command Shell
---
# MVP — Natural Script

MVP build brief for **Natural Script** (Programming Language / Framework), Binary Loom division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Product note | [[Natural Script]] |
| Product type | Programming Language / Framework |
| Priority | Year 3 - Series B |
| Complexity | Low-Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#22D3EE` |
| Division palette | `#0B1220` `#22D3EE` `#A3E635` `#F0FDFA` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Human-AI collaboration programming language that compiles natural-language task definitions into executable agent workflows.

## UI direction

- UI vibe: Cloud infrastructure, code fabric, developer-grade precision, observability-first
- Division focus: Digital Infrastructure and Developer Tools
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Python compiler/interpreter, VS Code extension, GitHub, GitBook docs.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Command dashboard
2. Item registry
3. Workflow board
4. AI assistant panel
5. Analytics cards
6. Exportable report
7. Admin settings

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
natural_script_items
natural_script_workflows
natural_script_status_events
natural_script_metrics
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
- Product: [[Natural Script]]
