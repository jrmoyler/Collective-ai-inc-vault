---
title: MVP — Quantum Business
tags:
- mvp
- quantum-ledger
- complexity-medium
- arch-portfolio-intelligence
type: mvp
order: 7
owner: JR Moyler (Hataalii)
stage: Year 2 - Active
source: MVP Build Guide
status: planned
product: Quantum Business
updated: 2026-10-04
division: Quantum Ledger
priority: '7'
timeline: 90 days (5 phases)
complexity: Medium
governance: Financial compliance
brand_color: '#6D5DFB'
product_type: SMB Financial Intelligence Platform
module_archetype: Portfolio Intelligence
---
# MVP — Quantum Business

MVP build brief for **Quantum Business** (SMB Financial Intelligence Platform), Quantum Ledger division. Part of [[MVP Build Guide]].

> [!warning] Financial product
> Disclaimers, suitability limits, and custody/execution controls apply. The guide says not to deploy securities/investment execution without review.

| Field | Value |
|---|---|
| Division | [[Quantum Ledger Division]] |
| Product note | [[Quantum Business]] |
| Product type | SMB Financial Intelligence Platform |
| Priority | 7 (build order #7) |
| Complexity | Medium |
| Stage label in guide | Year 2 - Active |
| Brand color | `#6D5DFB` |
| Division palette | `#111318` `#6D5DFB` `#39FF88` `#EEF3FF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Portfolio Intelligence ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

AI business finance management: cash flow forecasting, categorization, AP/AR, tax prep, and business credit optimization.

## UI direction

- UI vibe: Fintech terminal, treasury cockpit, on-chain/off-chain intelligence
- Division focus: FinTech and Web3
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Next.js/React, Plaid, QuickBooks/Xero, Claude API, Stripe.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Account/portfolio dashboard
2. Data connector shell
3. Risk and opportunity scoring
4. Forecast or scenario panel
5. AI analyst brief
6. Exportable report
7. Audit/compliance log

## Viral and UI design hooks

- Runway clock
- Risk radar
- AI CFO/analyst brief
- Decision card export

## Governance and compliance flags

- Financial compliance: disclaimers, suitability limits, custody/execution controls if enabled.
- Flag group: Financial compliance ([[MVP Governance Flags]])

## Suggested core tables

```
quantum_business_accounts
quantum_business_transactions
quantum_business_positions
quantum_business_forecasts
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
  - Consumer portfolio management and AI advisory
  - SMB financial intelligence
  - Institutional trading intelligence
  - Web3 development
  - DeFi risk assessment
  - Crypto portfolio management
  - Financial literacy education
  - Treasury management

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Quantum Ledger Division]]
- Director agent: [[Director_Quantum_Ledger]]
- Product: [[Quantum Business]]
- Build order: [[MVP Build Order]]
