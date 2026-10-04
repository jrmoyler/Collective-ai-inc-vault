---
title: MVP — Environmental Intelligence Platform
tags:
- mvp
- gaia-synthesis
- complexity-medium
- arch-site-sensor
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 4 - Series C
source: MVP Build Guide
status: planned
product: Environmental Intelligence Platform
updated: 2026-10-04
division: Gaia Synthesis
priority: Year 4 - Series C
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#22C55E'
product_type: Environmental Monitoring Platform
module_archetype: Site Sensor
---
# MVP — Environmental Intelligence Platform

MVP build brief for **Environmental Intelligence Platform** (Environmental Monitoring Platform), Gaia Synthesis division. Part of [[MVP Build Guide]].

> [!info] Division status
> Gaia Synthesis is a chartered division, not an operating one. The guide labels it "Year 4 - Series C"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Gaia Synthesis Division]] |
| Product note | [[Environmental Intelligence Platform]] |
| Product type | Environmental Monitoring Platform |
| Priority | Year 4 - Series C |
| Complexity | Medium |
| Stage label in guide | Year 4 - Series C |
| Brand color | `#22C55E` |
| Division palette | `#10361F` `#22C55E` `#7C4A24` `#FACC15` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Site Sensor ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Sensor network for ecosystem health, air/water quality, biodiversity, and regulatory reporting.

## UI direction

- UI vibe: Living ecological dashboard, sensor networks, growth systems, earth intelligence
- Division focus: AgriTech, Environmental Engineering and Synthetic Biology
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Environmental IoT/MQTT, InfluxDB, Grafana, QGIS/Mapbox, Claude + Python reports.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Site/zone registry
2. Sensor or data dashboard
3. Health/anomaly score
4. Forecast model
5. Task planner
6. Compliance/report export
7. Operator assistant

## Viral and UI design hooks

- Living map
- Crop mood indicators
- Harvest countdown
- Impact card

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
environmental_intelligen_sites
environmental_intelligen_zones
environmental_intelligen_sensor_readings
environmental_intelligen_alerts
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
  - Urban farm optimization
  - Precision agriculture consulting
  - Environmental monitoring
  - Carbon credit support
  - Bioremediation management
  - Agricultural drone operations
  - Climate resilience strategy
  - Regenerative agriculture consulting

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Gaia Synthesis Division]]
- Director agent: [[Director_Gaia_Synthesis]]
- Product: [[Environmental Intelligence Platform]]
