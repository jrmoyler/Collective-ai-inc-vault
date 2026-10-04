---
title: MVP — Sky Vector Aerial Delivery
tags:
- mvp
- vectorshift
- complexity-high
- arch-fleet-and-mission
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Sky Vector Aerial Delivery
updated: 2026-10-04
division: VectorShift
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: High
governance: Hardware and safety (simulation-first)
brand_color: '#F97316'
product_type: Autonomous Drone Delivery Platform
module_archetype: Fleet and Mission
---
# MVP — Sky Vector Aerial Delivery

MVP build brief for **Sky Vector Aerial Delivery** (Autonomous Drone Delivery Platform), VectorShift division. Part of [[MVP Build Guide]].

> [!warning] Simulation-first
> Field deployment requires safety and regulatory review. Build as a simulator until review clears it.

> [!info] Division status
> VectorShift is a chartered division, not an operating one. The guide labels it "Year 3 - Series B"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[VectorShift Division]] |
| Product note | [[Sky Vector Aerial Delivery]] |
| Product type | Autonomous Drone Delivery Platform |
| Priority | Year 3 - Series B |
| Complexity | High |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#F97316` |
| Division palette | `#1F2937` `#F97316` `#2563EB` `#FFF7ED` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Fleet and Mission ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

FAA-compliant autonomous drone delivery for last-mile and medical cargo with weather-aware planning.

## UI direction

- UI vibe: Dispatch command center, route optimization, fleet telemetry, movement intelligence
- Division focus: Autonomous Logistics and Aerial Mobility
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

ArduPilot/PX4, FAA DroneZone API, DJI SDK, Python + Mapbox, weather API.

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

- Hardware/safety timeline: simulation-first; field deployment requires safety and regulatory review.
- Flag group: Hardware and safety (simulation-first) ([[MVP Governance Flags]])

## Suggested core tables

```
sky_vector_aerial_delive_fleet_assets
sky_vector_aerial_delive_missions
sky_vector_aerial_delive_routes
sky_vector_aerial_delive_telemetry
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
- Product: [[Sky Vector Aerial Delivery]]
- Related: [[Sky Vector]]
