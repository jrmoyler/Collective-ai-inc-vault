---
title: MVP — Learning Science Integration System
tags:
- mvp
- cognara-mind
- complexity-low-medium
- arch-learning-path
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Learning Science Integration System
updated: 2026-10-04
division: Cognara Mind
priority: Year 2 - Active
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#F59E0B'
product_type: EdTech Framework
module_archetype: Learning Path
---
# MVP — Learning Science Integration System

MVP build brief for **Learning Science Integration System** (EdTech Framework), Cognara Mind division. Part of [[MVP Build Guide]].

> [!info] Division status
> Cognara Mind is a chartered division, not an operating one. The guide labels it "Year 2 - Active"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Product note | None yet |
| Product type | EdTech Framework |
| Priority | Year 2 - Active |
| Complexity | Low-Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#F59E0B` |
| Division palette | `#2B1E3F` `#F59E0B` `#06B6D4` `#FFF7ED` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Learning Path ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Integration of spaced repetition, retrieval practice, and interleaving into Hybrid Living curriculum.

## UI direction

- UI vibe: Behavioral lab, trust calibration, human-AI psychology, ethical influence
- Division focus: Behavioral Science and Human-AI Psychology
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Notion framework, Atlas LMS algorithm, assessment templates, retention dashboard.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Role-based onboarding
2. Learning path dashboard
3. Content/module library
4. Practice or project workspace
5. Progress and assessment tracking
6. Admin/cohort analytics
7. Certificate or completion output

## Viral and UI design hooks

- Skill constellation map
- Build streaks
- Shareable certificate card
- Project showcase wall

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
learning_science_integra_courses
learning_science_integra_lessons
learning_science_integra_cohorts
learning_science_integra_enrollments
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
