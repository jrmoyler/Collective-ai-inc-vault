---
title: MVP — Digital Equity Initiative (DEI)
tags:
- mvp
- civic-core
- complexity-low-medium
- arch-command-shell
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Portfolio-funded
source: MVP Build Guide
status: planned
product: Digital Equity Initiative (DEI)
updated: 2026-10-04
division: Civic Core
priority: Year 3 - Portfolio-funded
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Non-profit (Civic Core)
brand_color: '#2F80ED'
product_type: Program
module_archetype: Command Shell
---
# MVP — Digital Equity Initiative (DEI)

MVP build brief for **Digital Equity Initiative (DEI)** (Program), Civic Core division. Part of [[MVP Build Guide]].

> [!note] Superseded
> The guide lists a Stanley Constant veto on Civic Core. That veto was removed on Oct 1, 2026. See [[Civic Core Fiduciary Veto]].

> [!info] Division status
> Civic Core is a chartered division, not an operating one. The guide labels it "Year 3 - Portfolio-funded"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Civic Core Division]] |
| Product note | [[Digital Equity Initiative]] |
| Product type | Program |
| Priority | Year 3 - Portfolio-funded |
| Complexity | Low-Medium |
| Stage label in guide | Year 3 - Portfolio-funded |
| Brand color | `#2F80ED` |
| Division palette | `#102A43` `#2F80ED` `#F2C94C` `#F7FBFF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Flagship program delivering digital literacy and AI education to underserved communities with device and broadband support.

## UI direction

- UI vibe: Civic trust, accessible community design, public benefit, equity-first reporting
- Division focus: Non-Profit 501(c)(3) - Digital Equity
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Hybrid Living Atlas, custom inventory, Notion curriculum, Airtable impact tracking.

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

- Civic trust dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Non-profit: no commercial revenue; [[Stanley Constant]] veto (removed Oct 1, 2026; see [[Civic Core Fiduciary Veto]]); grant/donor compliance.
- Flag group: Non-profit (Civic Core) ([[MVP Governance Flags]])

## Suggested core tables

```
digital_equity_initiativ_items
digital_equity_initiativ_workflows
digital_equity_initiativ_status_events
digital_equity_initiativ_metrics
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
  - Digital literacy and AI education
  - AI tools for community creators
  - Nonprofit AI implementation
  - Device and internet access
  - Youth STEM/AI education
  - Workforce AI training
  - Scholarship access

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Civic Core Division]]
- Director agent: [[Director_Civic_Core]]
- Product: [[Digital Equity Initiative]]
- [[Stanley Constant]], [[Civic Core Fiduciary Veto]]
