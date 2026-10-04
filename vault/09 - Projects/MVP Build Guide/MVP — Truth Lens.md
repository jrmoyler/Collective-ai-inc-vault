---
title: MVP — Truth Lens
tags:
- mvp
- aether-link
- complexity-medium
- arch-campaign-and-content
type: mvp
order: 9
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Truth Lens
updated: 2026-10-04
division: Aether Link
priority: '9'
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#38BDF8'
product_type: Content Verification Platform
module_archetype: Campaign and Content
---
# MVP — Truth Lens

MVP build brief for **Truth Lens** (Content Verification Platform), Aether Link division. Part of [[MVP Build Guide]].

> [!info] Division status
> Aether Link is a chartered division, not an operating one. The guide labels it "Year 3 - Series B"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Product note | [[Truth Lens]] |
| Product type | Content Verification Platform |
| Priority | 9 (build order #9) |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#38BDF8` |
| Division palette | `#0F172A` `#38BDF8` `#8B5CF6` `#F5F8FF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Campaign and Content ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

AI-powered verification and misinformation detection with credibility scoring and claim corroboration.

## UI direction

- UI vibe: Global network intelligence, multilingual interfaces, verification graph, zero-barrier communication
- Division focus: Connectivity and Communications
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Claude API, source classifier, Snopes/PolitiFact APIs, FastAPI, Redis cache.

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

- Timed drop mechanic
- Revenue/share cards
- AI remix studio
- Public media kit

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
truth_lens_campaigns
truth_lens_channels
truth_lens_content_assets
truth_lens_experiments
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
  - Mesh deployment
  - Babel AI translation API
  - Truth Lens verification
  - Content moderation
  - Sky Net remote connectivity
  - Language access for Civic Core
  - Connectivity gap assessment

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Aether Link Division]]
- Director agent: [[Director_Aether_Link]]
- Product: [[Truth Lens]]
- Build order: [[MVP Build Order]]
