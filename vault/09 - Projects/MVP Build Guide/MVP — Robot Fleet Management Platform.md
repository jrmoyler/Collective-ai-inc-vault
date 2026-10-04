---
title: MVP — Robot Fleet Management Platform
tags:
- mvp
- animus-prime
- complexity-high
- arch-fleet-and-mission
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 5 - Series C
source: MVP Build Guide
status: planned
product: Robot Fleet Management Platform
updated: 2026-10-04
division: Animus Prime
priority: Year 5 - Series C
timeline: 90 days (5 phases)
complexity: High
governance: Hardware and safety (simulation-first)
brand_color: '#9CA3AF'
product_type: Enterprise Software Platform
module_archetype: Fleet and Mission
---
# MVP — Robot Fleet Management Platform

MVP build brief for **Robot Fleet Management Platform** (Enterprise Software Platform), Animus Prime division. Part of [[MVP Build Guide]].

> [!warning] Simulation-first
> Field deployment requires safety and regulatory review. Build as a simulator until review clears it.

> [!info] Division status
> Animus Prime is a chartered division, not an operating one. The guide labels it "Year 5 - Series C"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Animus Prime Division]] |
| Product note | [[Robot Fleet Management]] |
| Product type | Enterprise Software Platform |
| Priority | Year 5 - Series C |
| Complexity | High |
| Stage label in guide | Year 5 - Series C |
| Brand color | `#9CA3AF` |
| Division palette | `#111827` `#9CA3AF` `#F59E0B` `#F8FAFC` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Fleet and Mission ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Enterprise fleet management for robot installations: monitoring, OTA updates, task scheduling, benchmarking, and ROI.

## UI direction

- UI vibe: Industrial robotics, simulation-first, machine operations, safety-certified systems
- Division focus: Robotics - Industrial and Humanoid
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

React, FastAPI, WebSocket, PostgreSQL, secure firmware distribution.

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
robot_fleet_management_p_fleet_assets
robot_fleet_management_p_missions
robot_fleet_management_p_routes
robot_fleet_management_p_telemetry
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
  - Titan robot installation
  - Operator training/certification
  - Field service and maintenance
  - Robot integration consulting
  - Agricultural robot deployment
  - Custom robot configuration
  - Robot fleet management

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Animus Prime Division]]
- Director agent: [[Director_Animus_Prime]]
- Product: [[Robot Fleet Management]]
