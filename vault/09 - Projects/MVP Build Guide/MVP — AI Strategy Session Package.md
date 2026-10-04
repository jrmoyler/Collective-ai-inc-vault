---
title: MVP — AI Strategy Session Package
tags:
- mvp
- the-collective
- complexity-low-medium
- arch-command-shell
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: AI Strategy Session Package
updated: 2026-10-04
division: The Collective
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#D4AF37'
product_type: Consulting Deliverable
module_archetype: Command Shell
---
# MVP — AI Strategy Session Package

MVP build brief for **AI Strategy Session Package** (Consulting Deliverable), The Collective division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Product note | [[AI Strategy Session Package]] |
| Product type | Consulting Deliverable |
| Priority | Phase 1/2 |
| Complexity | Low-Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#D4AF37` |
| Division palette | `#111827` `#D4AF37` `#E5E7EB` `#F9FAFB` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Structured 1-3 day strategy engagement covering opportunity mapping, use-case prioritization, build-vs-buy, and a 90-day roadmap.

## UI direction

- UI vibe: Executive advisory, boardroom strategy, trust and implementation rigor
- Division focus: Expert AI Consulting
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Facilitated workshop, Claude-assisted analysis, strategy deck, Notion/client PM roadmap.

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

- Executive advisory dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
ai_strategy_session_pack_items
ai_strategy_session_pack_workflows
ai_strategy_session_pack_status_events
ai_strategy_session_pack_metrics
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
- Product: [[AI Strategy Session Package]]
