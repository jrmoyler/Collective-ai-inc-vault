---
title: MVP — Change Management Intelligence Suite
tags:
- mvp
- cognara-mind
- complexity-medium
- arch-developer-portal
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Change Management Intelligence Suite
updated: 2026-10-04
division: Cognara Mind
priority: Year 2 - Active
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#F59E0B'
product_type: Consulting Toolkit
module_archetype: Developer Portal
---
# MVP — Change Management Intelligence Suite

MVP build brief for **Change Management Intelligence Suite** (Consulting Toolkit), Cognara Mind division. Part of [[MVP Build Guide]].

> [!info] Division status
> Cognara Mind is a chartered division, not an operating one. The guide labels it "Year 2 - Active"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Product note | [[Change Management Intelligence Suite]] |
| Product type | Consulting Toolkit |
| Priority | Year 2 - Active |
| Complexity | Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#F59E0B` |
| Division palette | `#2B1E3F` `#F59E0B` `#06B6D4` `#FFF7ED` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Developer Portal ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Behavioral toolkit for enterprise AI transformation, resistance assessment, interventions, and adoption architecture.

## UI direction

- UI vibe: Behavioral lab, trust calibration, human-AI psychology, ethical influence
- Division focus: Behavioral Science and Human-AI Psychology
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Notion + PDF, Typeform/Airtable, Claude resistance analysis, Collective templates.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Developer portal
2. API key management
3. Endpoint catalog
4. Usage analytics
5. Rate limit and billing rules
6. SDK/CLI documentation
7. Webhook/event logs

## Viral and UI design hooks

- Behavioral lab dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
change_management_intell_items
change_management_intell_workflows
change_management_intell_status_events
change_management_intell_metrics
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
  - Monthly behavioral intelligence reports
  - Nudge system design
  - AI trust calibration consulting
  - Change management support
  - Behavioral audits
  - Learning science curriculum design
  - Org psychology consulting
  - Consumer psychology research
  - Enterprise behavioral consulting
  - DEI behavioral audits

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Cognara Mind Division]]
- Director agent: [[Director_Cognara_Mind]]
- Product: [[Change Management Intelligence Suite]]
