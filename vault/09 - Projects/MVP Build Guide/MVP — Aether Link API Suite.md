---
title: MVP — Aether Link API Suite
tags:
- mvp
- aether-link
- complexity-medium
- arch-developer-portal
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Aether Link API Suite
updated: 2026-10-04
division: Aether Link
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#38BDF8'
product_type: Developer API Platform
module_archetype: Developer Portal
---
# MVP — Aether Link API Suite

MVP build brief for **Aether Link API Suite** (Developer API Platform), Aether Link division. Part of [[MVP Build Guide]].

> [!info] Division status
> Aether Link is a chartered division, not an operating one. The guide labels it "Year 3 - Series B"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Product note | None yet |
| Product type | Developer API Platform |
| Priority | Year 3 - Series B |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#38BDF8` |
| Division palette | `#0F172A` `#38BDF8` `#8B5CF6` `#F5F8FF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Developer Portal ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Commercial APIs for Babel AI and Truth Lens with onboarding, SLAs, rate limits, and analytics.

## UI direction

- UI vibe: Global network intelligence, multilingual interfaces, verification graph, zero-barrier communication
- Division focus: Connectivity and Communications
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

FastAPI, Kong gateway, Stoplight/custom Next.js portal, usage analytics, Stripe.

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

- Global network intelligence dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
aether_link_api_suite_requests
aether_link_api_suite_sources
aether_link_api_suite_nodes
aether_link_api_suite_usage_events
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
