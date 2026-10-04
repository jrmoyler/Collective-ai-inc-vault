---
title: MVP — Growth Intelligence Platform
tags:
- mvp
- signal-velocity
- complexity-medium
- arch-campaign-and-content
type: mvp
order: 2
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Growth Intelligence Platform
updated: 2026-10-04
division: Signal Velocity
priority: '2'
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#FF3B30'
product_type: Marketing Analytics Platform
module_archetype: Campaign and Content
---
# MVP — Growth Intelligence Platform

MVP build brief for **Growth Intelligence Platform** (Marketing Analytics Platform), Signal Velocity division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Product note | [[Growth Intelligence Platform]] |
| Product type | Marketing Analytics Platform |
| Priority | 2 (build order #2) |
| Complexity | Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#FF3B30` |
| Division palette | `#070707` `#FF3B30` `#D4AF37` `#FFF5F2` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Campaign and Content ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Portfolio growth analytics for CAC, LTV, ROAS, attribution, funnel drop-off, conversion, and revenue forecasting.

## UI direction

- UI vibe: High-speed revenue cockpit, conversion signal, campaign heat, growth loops
- Division focus: Growth Intelligence and Performance Marketing
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Northbeam/Triple Whale, BigQuery/Snowflake, Tableau/Looker, Python/Pandas, dbt.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Campaign/content dashboard
2. Asset or channel library
3. Planning calendar
4. Performance analytics
5. AI generation/review workflow
6. Publishing/export flow
7. Experiment log

## Viral and UI design hooks

- Signal pulse meter
- Funnel leak heatmap
- Campaign winner cards
- AI visibility radar

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
growth_intelligence_plat_campaigns
growth_intelligence_plat_channels
growth_intelligence_plat_content_assets
growth_intelligence_plat_experiments
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
  - Growth strategy/channel allocation
  - Paid media management
  - CRO
  - SEO implementation
  - Email/lifecycle automation
  - Influencer partnerships
  - ABM
  - Revenue forecasting/attribution
  - Brand advertising
  - Enterprise growth retainers

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Signal Velocity Division]]
- Director agent: [[Director_Signal_Velocity]]
- Product: [[Growth Intelligence Platform]]
- Related: [[SignalBoard]]
- Build order: [[MVP Build Order]]
