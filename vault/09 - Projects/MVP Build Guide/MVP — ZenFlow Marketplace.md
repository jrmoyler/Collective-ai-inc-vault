---
title: MVP — ZenFlow Marketplace
tags:
- mvp
- zenflow
- complexity-medium
- arch-marketplace
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: ZenFlow Marketplace
updated: 2026-10-04
division: ZenFlow
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#4F46E5'
product_type: SaaS Marketplace
module_archetype: Marketplace
---
# MVP — ZenFlow Marketplace

MVP build brief for **ZenFlow Marketplace** (SaaS Marketplace), ZenFlow division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Product note | [[ZenFlow Marketplace]] |
| Product type | SaaS Marketplace |
| Priority | Phase 1/2 |
| Complexity | Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#4F46E5` |
| Division palette | `#0B1020` `#4F46E5` `#2DD4BF` `#E8F7F5` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Marketplace ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

External-facing marketplace where customers buy pre-built ZenFlow agent configurations and enterprise agent packages.

## UI direction

- UI vibe: Intelligent lattice, governed orchestration, technical command layer
- Division focus: AI R&D and Central Nervous System
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Next.js/React, FastAPI, Stripe, Zenith OS provisioning, Vercel + Docker.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. User/vendor profiles
2. Offer or listing catalog
3. Discovery and filtering
4. Checkout or inquiry flow
5. Messaging/relationship workflow
6. Analytics and share cards
7. Admin moderation tools

## Viral and UI design hooks

- Agent card profiles
- Lattice map
- Reliability score
- Summon-agent test console

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
zenflow_marketplace_profiles
zenflow_marketplace_listings
zenflow_marketplace_offers
zenflow_marketplace_orders
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
  - ZenFlow Enterprise Licensing
  - Custom Agent Architecture
  - Aegis Protocol Certification
  - Agent Training & Fine-Tuning
  - ZenFlow Implementation Consulting

## Links

- Hub: [[MVP Build Guide]]
- Division: [[ZenFlow Division]]
- Director agent: [[Director_ZenFlow]]
- Product: [[ZenFlow Marketplace]]
