---
title: MVP — Route Intelligence Platform
tags:
- mvp
- vectorshift
- complexity-medium
- arch-fleet-and-mission
type: mvp
order: 10
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Route Intelligence Platform
updated: 2026-10-04
division: VectorShift
priority: '10'
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#F97316'
product_type: Logistics Optimization Platform
module_archetype: Fleet and Mission
---
# MVP — Route Intelligence Platform

MVP build brief for **Route Intelligence Platform** (Logistics Optimization Platform), VectorShift division. Part of [[MVP Build Guide]].

> [!info] Division status
> VectorShift is a chartered division, not an operating one. The guide labels it "Year 3 - Series B"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[VectorShift Division]] |
| Product note | [[Route Intelligence Platform]] |
| Product type | Logistics Optimization Platform |
| Priority | 10 (build order #10) |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#F97316` |
| Division palette | `#1F2937` `#F97316` `#2563EB` `#FFF7ED` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Fleet and Mission ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

AI route optimization with traffic, weather-aware rerouting, payload optimization, and density maximization.

## UI direction

- UI vibe: Dispatch command center, route optimization, fleet telemetry, movement intelligence
- Division focus: Autonomous Logistics and Aerial Mobility
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Google Maps/HERE, Python OR-Tools, TomTom, OpenWeatherMap, FastAPI.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Fleet/asset registry
2. Map or mission board
3. Task/route planner
4. Telemetry/status cards
5. Maintenance or safety queue
6. Simulation mode
7. Ops analytics

## Viral and UI design hooks

- Route replay
- Savings delta
- Mission cards
- Fleet readiness badge

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
route_intelligence_platf_fleet_assets
route_intelligence_platf_missions
route_intelligence_platf_routes
route_intelligence_platf_telemetry
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
  - Last-mile autonomous delivery
  - Aerial drone delivery
  - Enterprise logistics API integration
  - Route optimization consulting
  - Fleet management services
  - City pilot program management

## Links

- Hub: [[MVP Build Guide]]
- Division: [[VectorShift Division]]
- Director agent: [[Director_VectorShift]]
- Product: [[Route Intelligence Platform]]
- Build order: [[MVP Build Order]]
