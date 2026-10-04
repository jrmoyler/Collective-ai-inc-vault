---
title: MVP — The Vibe Code Show
tags:
- mvp
- nexus-labs
- complexity-low-medium
- arch-campaign-and-content
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: The Vibe Code Show
updated: 2026-10-04
division: Nexus Labs
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#7C3AED'
product_type: Content Series
module_archetype: Campaign and Content
---
# MVP — The Vibe Code Show

MVP build brief for **The Vibe Code Show** (Content Series), Nexus Labs division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Nexus Labs Division]] |
| Product note | [[The Vibe Code Show]] |
| Product type | Content Series |
| Priority | Phase 1/2 |
| Complexity | Low-Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#7C3AED` |
| Division palette | `#0F172A` `#7C3AED` `#EC4899` `#F8F5FF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Campaign and Content ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

JR flagship content program covering AI building, venture studio strategy, and Collective AI ecosystem updates.

## UI direction

- UI vibe: Experimental creator-tech lab, media engine, cultural signal amplifier
- Division focus: Media, Entertainment and Creative
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

StreamYard/Riverside, DaVinci/CapCut, YouTube API, X, Instagram, Opus Clip.

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
the_vibe_code_show_campaigns
the_vibe_code_show_channels
the_vibe_code_show_content_assets
the_vibe_code_show_experiments
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
  - Content production for all divisions
  - Brand storytelling
  - Creator Nexus access
  - Collective Times sponsored content
  - Nexus Studios production
  - Social management
  - Podcast production

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Nexus Labs Division]]
- Director agent: [[Director_Nexus_Labs]]
- Product: [[The Vibe Code Show]]
