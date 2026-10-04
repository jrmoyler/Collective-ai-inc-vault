---
title: MVP — Visa Intelligence Database
tags:
- mvp
- nomad-nexus
- complexity-medium
- arch-command-shell
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Visa Intelligence Database
updated: 2026-10-04
division: Nomad Nexus
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#14B8A6'
product_type: Data Product
module_archetype: Command Shell
---
# MVP — Visa Intelligence Database

MVP build brief for **Visa Intelligence Database** (Data Product), Nomad Nexus division. Part of [[MVP Build Guide]].

> [!info] Division status
> Nomad Nexus is a chartered division, not an operating one. The guide labels it "Year 3 - Series B"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Nomad Nexus Division]] |
| Product note | [[Visa Intelligence Database]] |
| Product type | Data Product |
| Priority | Year 3 - Series B |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#14B8A6` |
| Division palette | `#0F2F38` `#14B8A6` `#1D4ED8` `#F5D0A9` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Continuously updated database of digital nomad visas, residency, tax treaty implications, and entry requirements.

## UI direction

- UI vibe: Premium travel intelligence, passport visuals, global maps, lifestyle logistics
- Division focus: Global Mobility and Digital Nomad Infrastructure
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

PostgreSQL, n8n scrapers/official feeds, Claude synthesis, n8n alerts.

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

- Passport city cards
- Compatibility score
- Cost-of-life slider
- Travel stack share card

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
visa_intelligence_databa_items
visa_intelligence_databa_workflows
visa_intelligence_databa_status_events
visa_intelligence_databa_metrics
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
  - Nomad platform access
  - Employer remote-work benefits
  - Relocation consulting
  - Co-living booking access
  - Emergency response coordination
  - Nomad retreats/events
  - Nomad tax/business intelligence information

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Nomad Nexus Division]]
- Director agent: [[Director_Nomad_Nexus]]
- Product: [[Visa Intelligence Database]]
