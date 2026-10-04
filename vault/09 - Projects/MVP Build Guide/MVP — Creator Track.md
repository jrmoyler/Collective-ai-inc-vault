---
title: MVP — Creator Track
tags:
- mvp
- hybrid-living
- complexity-low-medium
- arch-learning-path
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: Creator Track
updated: 2026-10-04
division: Hybrid Living
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#D4AF37'
product_type: Course Product / Certification
module_archetype: Learning Path
---
# MVP — Creator Track

MVP build brief for **Creator Track** (Course Product / Certification), Hybrid Living division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Hybrid Living Division]] |
| Product note | [[Creator Track]] |
| Product type | Course Product / Certification |
| Priority | Phase 1/2 |
| Complexity | Low-Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#D4AF37` |
| Division palette | `#0A1020` `#D4AF37` `#00D9FF` `#F4F7FA` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Learning Path ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Advanced AI content creation curriculum covering image, video, audio, automation, and creator business building.

## UI direction

- UI vibe: Premium learning cockpit, cohort energy, human-centered AI mastery
- Division focus: EdTech and AI Education
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Atlas LMS, Nano Banana, Kling, Lyria, GPT Image, project submissions, Skool.

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
creator_track_courses
creator_track_lessons
creator_track_cohorts
creator_track_enrollments
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
  - AI curriculum design and delivery
  - Corporate AI training licensing
  - Civic Core scholarship coordination
  - P.E.T.E.E.R. licensing
  - Focus Flow Skool programming
  - Creator Track mentorship

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Hybrid Living Division]]
- Director agent: [[Director_Hybrid_Living]]
- Product: [[Creator Track]]
- Related: [[Creator Track Certification]], [[Creator_Track_Mentor]]
