---
title: MVP — Axis Market
tags:
- mvp
- terra-axis
- complexity-medium
- arch-marketplace
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Building
source: MVP Build Guide
status: planned
product: Axis Market
updated: 2026-10-04
division: Terra Axis
priority: Year 2 - Building
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#2E7D32'
product_type: Real Estate Marketplace
module_archetype: Marketplace
---
# MVP — Axis Market

MVP build brief for **Axis Market** (Real Estate Marketplace), Terra Axis division. Part of [[MVP Build Guide]].

> [!info] Division status
> Terra Axis is a chartered division, not an operating one. The guide labels it "Year 2 - Building"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Product note | [[Axis Market]] |
| Product type | Real Estate Marketplace |
| Priority | Year 2 - Building |
| Complexity | Medium |
| Stage label in guide | Year 2 - Building |
| Brand color | `#2E7D32` |
| Division palette | `#263238` `#2E7D32` `#C2A878` `#EAF4EC` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Marketplace ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

AI-curated marketplace connecting investors, buyers, and renters with qualified listings and neighborhood intelligence.

## UI direction

- UI vibe: Grounded maps, asset intelligence, built-world operations, resilient infrastructure
- Division focus: Intelligent Real Estate and Physical Infrastructure
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Next.js, Supabase/PostgreSQL, Bridge API/MLS, Claude API, Stripe.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. User/vendor profiles
2. Offer or listing catalog
3. Discovery and filtering
4. Checkout or inquiry flow
5. Messaging/relationship workflow
6. Analytics and share cards
7. Admin moderation tools

## Viral and UI design hooks

- Grounded maps dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
axis_market_assets
axis_market_locations
axis_market_scenarios
axis_market_work_orders
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
- Product: [[Axis Market]]
- Related: [[Axis Market Columbus]]
