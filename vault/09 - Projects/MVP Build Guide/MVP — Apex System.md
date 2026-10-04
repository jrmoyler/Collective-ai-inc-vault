---
title: MVP — Apex System
tags:
- mvp
- kinetic-edge
- complexity-medium
- arch-command-shell
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Apex System
updated: 2026-10-04
division: Kinetic Edge
priority: Year 2 - Active
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#00A3FF'
product_type: Elite Athlete Performance Platform
module_archetype: Command Shell
---
# MVP — Apex System

MVP build brief for **Apex System** (Elite Athlete Performance Platform), Kinetic Edge division. Part of [[MVP Build Guide]].

> [!info] Division status
> Kinetic Edge is a chartered division, not an operating one. The guide labels it "Year 2 - Active"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Kinetic Edge Division]] |
| Product note | [[Apex System]] |
| Product type | Elite Athlete Performance Platform |
| Priority | Year 2 - Active |
| Complexity | Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#00A3FF` |
| Division palette | `#0B0F14` `#00A3FF` `#B6FF00` `#F5FFF0` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Professional athlete optimization through biomechanics, load management, injury prediction, recovery, and tactical AI coaching.

## UI direction

- UI vibe: Athlete performance lab, dynamic motion, biometric coaching, competitive edge
- Division focus: Sports Technology and Human Performance
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

React Native + Next.js, ZenFlow/Claude, Catapult/STATSports/Polar, MediaPipe/custom CV, Supabase.

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

- Athlete card
- Readiness ring
- Challenge streaks
- Progress highlight card

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
apex_system_items
apex_system_workflows
apex_system_status_events
apex_system_metrics
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
  - Elite athlete monitoring and coaching
  - Team analytics
  - Consumer training plan generation
  - Sports performance consulting
  - Sports science research synthesis
  - MiroFish prediction analytics

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Kinetic Edge Division]]
- Director agent: [[Director_Kinetic_Edge]]
- Product: [[Apex System]]
