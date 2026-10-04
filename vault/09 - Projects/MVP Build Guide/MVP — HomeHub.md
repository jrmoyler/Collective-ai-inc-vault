---
title: MVP — HomeHub
tags:
- mvp
- terra-axis
- complexity-medium
- arch-property-and-asset-map
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Building
source: MVP Build Guide
status: planned
product: HomeHub
updated: 2026-10-04
division: Terra Axis
priority: Year 2 - Building
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#2E7D32'
product_type: Smart Property Management Platform
module_archetype: Property and Asset Map
---
# MVP — HomeHub

MVP build brief for **HomeHub** (Smart Property Management Platform), Terra Axis division. Part of [[MVP Build Guide]].

> [!info] Division status
> Terra Axis is a chartered division, not an operating one. The guide labels it "Year 2 - Building"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Product note | [[HomeHub]] |
| Product type | Smart Property Management Platform |
| Priority | Year 2 - Building |
| Complexity | Medium |
| Stage label in guide | Year 2 - Building |
| Brand color | `#2E7D32` |
| Division palette | `#263238` `#2E7D32` `#C2A878` `#EAF4EC` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Property and Asset Map ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

AI-assisted property management for tenant screening, maintenance, leases, rent, and smart-home device coordination.

## UI direction

- UI vibe: Grounded maps, asset intelligence, built-world operations, resilient infrastructure
- Division focus: Intelligent Real Estate and Physical Infrastructure
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

React Native, Next.js, Supabase, Plaid, Twilio, Home Assistant API.

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

- Buy/pass card
- ROI slider
- Neighborhood pulse map
- Maintenance risk badge

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
homehub_assets
homehub_locations
homehub_scenarios
homehub_work_orders
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
- Product: [[HomeHub]]
