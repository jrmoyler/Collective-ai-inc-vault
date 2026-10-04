---
title: MVP — Legal Analytics Dashboard
tags:
- mvp
- juris-guard
- complexity-low-medium
- arch-document-review
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Legal Analytics Dashboard
updated: 2026-10-04
division: Juris Guard
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: LegalTech boundary
brand_color: '#B68C2F'
product_type: Legal Operations Analytics
module_archetype: Document Review
---
# MVP — Legal Analytics Dashboard

MVP build brief for **Legal Analytics Dashboard** (Legal Operations Analytics), Juris Guard division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Juris Guard Division]] |
| Product note | None yet |
| Product type | Legal Operations Analytics |
| Priority | Phase 1/2 |
| Complexity | Low-Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#B68C2F` |
| Division palette | `#0B1020` `#B68C2F` `#C1121F` `#E5E7EB` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Document Review ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Legal ops analytics for turnaround, revision cycles, escalation rates, bottlenecks, and monthly CLO reporting.

## UI direction

- UI vibe: Legal command center, founder-safe review, risk scoring, high-trust governance
- Division focus: LegalTech, AI Governance and Regulatory Intelligence
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

React, FastAPI, PostgreSQL, Claude + reportlab report generation.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Matter or document intake
2. Risk classification
3. Review workflow
4. Version and audit history
5. Report generator
6. Template/knowledge library
7. Escalation queue

## Viral and UI design hooks

- Risk health score
- Clause heatmap
- Founder-safe mode
- Send-to-counsel packet

## Governance and compliance flags

- LegalTech boundary: assistive review only; attorney review for legal advice.
- Flag group: LegalTech boundary ([[MVP Governance Flags]])

## Suggested core tables

```
legal_analytics_dashboar_documents
legal_analytics_dashboar_clauses
legal_analytics_dashboar_risk_flags
legal_analytics_dashboar_review_reports
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
  - AI governance implementation
  - Contract review/negotiation
  - Regulatory intelligence
  - IP protection
  - Privacy compliance
  - Corporate/securities compliance
  - Employment law advisory
  - Litigation risk management
  - Compliance training
  - LegalTech licensing

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Juris Guard Division]]
- Director agent: [[Director_Juris_Guard]]
