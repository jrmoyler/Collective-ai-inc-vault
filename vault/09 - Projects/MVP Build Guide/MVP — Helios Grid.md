---
title: MVP — Helios Grid
tags:
- mvp
- terra-axis
- complexity-high
- arch-property-and-asset-map
- blocked
type: mvp
order: 15
owner: JR Moyler (Hataalii)
stage: Year 2 - Building
source: MVP Build Guide
status: planned
product: Helios Grid
updated: 2026-10-04
division: Terra Axis
priority: '15'
timeline: 90 days (5 phases)
complexity: High
governance: Blocked (SEC / Juris Guard)
brand_color: '#2E7D32'
product_type: Energy Infrastructure Platform
module_archetype: Property and Asset Map
---
# MVP — Helios Grid

MVP build brief for **Helios Grid** (Energy Infrastructure Platform), Terra Axis division. Part of [[MVP Build Guide]].

> [!danger] Blocked
> SEC / Juris Guard clearance is required before live deployment or settlement. Helios Grid stays blocked pending an SEC legal opinion. Build only as a simulator or admin shell.

> [!info] Division status
> Terra Axis is a chartered division, not an operating one. The guide labels it "Year 2 - Building"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Product note | [[Helios Grid]] |
| Product type | Energy Infrastructure Platform |
| Priority | 15 (build order #15) |
| Complexity | High |
| Stage label in guide | Year 2 - Building |
| Brand color | `#2E7D32` |
| Division palette | `#263238` `#2E7D32` `#C2A878` `#EAF4EC` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Property and Asset Map ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Blocked smart energy grid and distributed energy trading platform under Juris Guard review for securities compliance.

## UI direction

- UI vibe: Grounded maps, asset intelligence, built-world operations, resilient infrastructure
- Division focus: Intelligent Real Estate and Physical Infrastructure
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Status: BLOCKED; architecture: IoT energy sensors + blockchain settlement via Quantum Genesis after clearance.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Asset/property registry
2. Map dashboard
3. Scenario or ROI analyzer
4. Operations task queue
5. Document/report export
6. Compliance/status gate
7. Portfolio analytics

## Viral and UI design hooks

- Glowing node map
- Resilience simulator
- Compliance-locked badge
- Before/after savings card

## Governance and compliance flags

- BLOCKED: SEC/Juris Guard clearance required before live deployment or settlement.
- Flag group: Blocked (SEC / Juris Guard) ([[MVP Governance Flags]])

## Suggested core tables

```
helios_grid_assets
helios_grid_locations
helios_grid_scenarios
helios_grid_work_orders
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
  - Property acquisition intelligence
  - Smart property management
  - Smart home and IoT deployment
  - Renovation project management
  - Electrical contracting
  - PropTech consulting

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Terra Axis Division]]
- Director agent: [[Director_Terra_Axis]]
- Product: [[Helios Grid]]
- Build order: [[MVP Build Order]]
- Settlement path: [[Quantum Genesis]] after clearance
