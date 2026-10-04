---
title: MVP — AI Readiness Audit
tags:
- mvp
- the-collective
- complexity-low-medium
- arch-command-shell
type: mvp
order: 3
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: AI Readiness Audit
updated: 2026-10-04
division: The Collective
priority: '3'
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#D4AF37'
product_type: Consulting Deliverable
module_archetype: Command Shell
---
# MVP — AI Readiness Audit

MVP build brief for **AI Readiness Audit** (Consulting Deliverable), The Collective division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Product note | [[AI Readiness Audit]] |
| Product type | Consulting Deliverable |
| Priority | 3 (build order #3) |
| Complexity | Low-Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#D4AF37` |
| Division palette | `#111827` `#D4AF37` `#E5E7EB` `#F9FAFB` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Assessment of enterprise AI readiness across data, workforce, process maturity, and governance posture.

## UI direction

- UI vibe: Executive advisory, boardroom strategy, trust and implementation rigor
- Division focus: Expert AI Consulting
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Claude API for report generation, custom assessment framework, PDF/DOCX delivery.

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

- Executive advisory dashboard
- Shareable status card
- AI recommendation panel
- Export-ready brief

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
ai_readiness_audit_items
ai_readiness_audit_workflows
ai_readiness_audit_status_events
ai_readiness_audit_metrics
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
  - AI Strategy Consulting
  - AI Implementation Support
  - AI Governance Consulting
  - Data Science Consulting
  - Workforce AI Training
  - AI Vendor Assessment
  - ZenFlow Enterprise Onboarding

## Links

- Hub: [[MVP Build Guide]]
- Division: [[The Collective Division]]
- Director agent: [[Director_The_Collective]]
- Product: [[AI Readiness Audit]]
- Build order: [[MVP Build Order]]
