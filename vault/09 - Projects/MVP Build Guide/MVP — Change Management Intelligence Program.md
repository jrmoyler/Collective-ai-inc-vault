---
title: MVP — Change Management Intelligence Program
tags:
- mvp
- the-collective
- complexity-medium
- arch-behavioral-research
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: Change Management Intelligence Program
updated: 2026-10-04
division: The Collective
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#D4AF37'
product_type: Service Program
module_archetype: Behavioral Research
---
# MVP — Change Management Intelligence Program

MVP build brief for **Change Management Intelligence Program** (Service Program), The Collective division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Product note | None yet |
| Product type | Service Program |
| Priority | Phase 1/2 |
| Complexity | Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#D4AF37` |
| Division palette | `#111827` `#D4AF37` `#E5E7EB` `#F9FAFB` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Behavioral Research ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Behavioral-science change management for AI transformation: resistance mapping, adoption architecture, and cultural strategy.

## UI direction

- UI vibe: Executive advisory, boardroom strategy, trust and implementation rigor
- Division focus: Expert AI Consulting
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Cognara Mind frameworks, workshops, executive coaching, PowerPoint/Notion, CRM tracking.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Research/intake form
2. Behavioral scorecard
3. Experiment or audit library
4. Insight synthesis panel
5. Recommendation workflow
6. Report export
7. Consent/privacy controls

## Viral and UI design hooks

- Executive advisory dashboard
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
  - AI Strategy Consulting
  - AI Implementation Support
  - AI Governance Consulting
  - Data Science Consulting
  - Workforce AI Training
  - AI Vendor Assessment
  - ZenFlow Enterprise Onboarding

## Links

- Hub: [[MVP Build Guide]]
- Division: [[The Collective Division]]
- Director agent: [[Director_The_Collective]]
