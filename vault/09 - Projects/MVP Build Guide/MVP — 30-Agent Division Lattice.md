---
title: MVP — 30-Agent Division Lattice
tags:
- mvp
- zenflow
- complexity-low-medium
- arch-command-shell
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 1 - Active
source: MVP Build Guide
status: planned
product: 30-Agent Division Lattice
updated: 2026-10-04
division: ZenFlow
priority: Phase 1/2
timeline: 90 days (5 phases)
complexity: Low-Medium
governance: Standard Aegis-Clear
brand_color: '#4F46E5'
product_type: Agent Architecture Standard
module_archetype: Command Shell
---
# MVP — 30-Agent Division Lattice

MVP build brief for **30-Agent Division Lattice** (Agent Architecture Standard), ZenFlow division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Product note | None yet |
| Product type | Agent Architecture Standard |
| Priority | Phase 1/2 |
| Complexity | Low-Medium |
| Stage label in guide | Year 1 - Active |
| Brand color | `#4F46E5` |
| Division palette | `#0B1020` `#4F46E5` `#2DD4BF` `#E8F7F5` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Command Shell ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Standard 30-agent cluster model per division: intake, research, strategy, build, review, automation, content, analytics, memory, orchestrator.

## UI direction

- UI vibe: Intelligent lattice, governed orchestration, technical command layer
- Division focus: AI R&D and Central Nervous System
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Zenith OS Agent Foundry, God Prompt format, Claude API, n8n, LangChain.

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

- Agent card profiles
- Lattice map
- Reliability score
- Summon-agent test console

## Governance and compliance flags

- Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Flag group: Standard Aegis-Clear ([[MVP Governance Flags]])

## Suggested core tables

```
30_agent_division_lattic_items
30_agent_division_lattic_workflows
30_agent_division_lattic_status_events
30_agent_division_lattic_metrics
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
- Related: [[ZenFlow Master Blueprint]], [[Agent Tier Registry]]
