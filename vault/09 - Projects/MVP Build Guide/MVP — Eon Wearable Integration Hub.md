---
title: MVP — Eon Wearable Integration Hub
tags:
- mvp
- eon-core
- complexity-medium
- arch-health-profile
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 4 - Series C
source: MVP Build Guide
status: planned
product: Eon Wearable Integration Hub
updated: 2026-10-04
division: Eon Core
priority: Year 4 - Series C
timeline: 90 days (5 phases)
complexity: Medium
governance: Clinical (Aegis-Review)
brand_color: '#A78BFA'
product_type: Data Integration Platform
module_archetype: Health Profile
---
# MVP — Eon Wearable Integration Hub

MVP build brief for **Eon Wearable Integration Hub** (Data Integration Platform), Eon Core division. Part of [[MVP Build Guide]].

> [!warning] Clinical product
> Aegis-Review applies: clinical oversight, HIPAA/privacy, no unsupported medical claims. The guide says not to deploy medical recommendations live yet.

> [!info] Division status
> Eon Core is a chartered division, not an operating one. The guide labels it "Year 4 - Series C"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Eon Core Division]] |
| Product note | None yet |
| Product type | Data Integration Platform |
| Priority | Year 4 - Series C |
| Complexity | Medium |
| Stage label in guide | Year 4 - Series C |
| Brand color | `#A78BFA` |
| Division palette | `#1A103D` `#A78BFA` `#F9A8D4` `#F8F7FF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Health Profile ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Unified health connector for wearables, CGM, and genomics into biological age tracking.

## UI direction

- UI vibe: Longevity intelligence, clinical review, premium human optimization, evidence-first design
- Division focus: Longevity Science and Human Optimization
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

FastAPI health connector, HL7 FHIR, OAuth, PostgreSQL normalized health data, Binary Loom.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. User health profile
2. Data consent gate
3. Biomarker/wearable dashboard
4. Protocol or recommendation queue
5. Clinical review status
6. Alerts and care plan timeline
7. Exportable summary

## Viral and UI design hooks

- Biological age timeline
- Evidence tier badges
- Protocol adherence ring
- Clinical review status

## Governance and compliance flags

- Aegis-Review: clinical oversight, HIPAA/privacy, no unsupported medical claims.
- Flag group: Clinical (Aegis-Review) ([[MVP Governance Flags]])

## Suggested core tables

```
eon_wearable_integration_profiles
eon_wearable_integration_consents
eon_wearable_integration_measurements
eon_wearable_integration_protocols
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
  - Biological age tracking
  - Physician-supervised longevity protocols
  - Testing panel coordination
  - Research synthesis
  - Community membership
  - Corporate longevity programs
  - Clinical research partnerships

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Eon Core Division]]
- Director agent: [[Director_Eon_Core]]
