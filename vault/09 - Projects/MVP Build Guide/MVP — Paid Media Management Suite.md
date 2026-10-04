---
title: MVP — Paid Media Management Suite
tags:
- mvp
- signal-velocity
- complexity-medium
- arch-developer-portal
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Paid Media Management Suite
updated: 2026-10-04
division: Signal Velocity
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#FF3B30'
product_type: Advertising Operations Platform
module_archetype: Developer Portal
---
# MVP — Paid Media Management Suite

MVP build brief for **Paid Media Management Suite** (Advertising Operations Platform), Signal Velocity division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Product note | [[Paid Media Management Suite]] |
| Product type | Advertising Operations Platform |
| Priority | Phase 1/2 |
| Complexity | Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#FF3B30` |
| Division palette | `#070707` `#FF3B30` `#D4AF37` `#FFF5F2` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Developer Portal ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Managed paid media across Meta, Google, LinkedIn, TikTok, X, and programmatic with testing and reporting.

## UI direction

- UI vibe: High-speed revenue cockpit, conversion signal, campaign heat, growth loops
- Division focus: Growth Intelligence and Performance Marketing
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Meta Ads API, Google Ads API, LinkedIn, TikTok, Trade Desk, Northbeam.

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

- Timed drop mechanic
- Revenue/share cards
- AI remix studio
- Public media kit

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
paid_media_management_su_campaigns
paid_media_management_su_channels
paid_media_management_su_content_assets
paid_media_management_su_experiments
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
- Product: [[Paid Media Management Suite]]
