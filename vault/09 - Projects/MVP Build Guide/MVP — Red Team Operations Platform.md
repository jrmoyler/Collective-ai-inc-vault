---
title: MVP — Red Team Operations Platform
tags:
- mvp
- obsidian-arc
- complexity-medium
- arch-security-triage
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Red Team Operations Platform
updated: 2026-10-04
division: Obsidian Arc
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: Medium
governance: Security data controls
brand_color: '#E11D48'
product_type: Offensive Security Service
module_archetype: Security Triage
---
# MVP — Red Team Operations Platform

MVP build brief for **Red Team Operations Platform** (Offensive Security Service), Obsidian Arc division. Part of [[MVP Build Guide]].

| Field | Value |
|---|---|
| Division | [[Obsidian Arc Division]] |
| Product note | [[Red Team Operations Platform]] |
| Product type | Offensive Security Service |
| Priority | Year 3 - Series B |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#E11D48` |
| Division palette | `#020617` `#E11D48` `#64748B` `#F8FAFC` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Security Triage ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Authorized offensive security management for pen tests, red team exercises, phishing simulations, and reporting.

## UI direction

- UI vibe: Security operations war room, threat posture, controlled escalation, sentinel infrastructure
- Division focus: Unified Cyber and Physical Security
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

Metasploit/Cobalt Strike, Burp Suite, GoPhish, custom reporting portal.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. Asset registry
2. Signal/alert feed
3. Triage queue
4. Risk/severity scoring
5. AI summary assistant
6. Response playbooks
7. Audit log

## Viral and UI design hooks

- Threat radar
- Incident playback
- Contain/watch/escalate controls
- Security posture score

## Governance and compliance flags

- Security data controls: least privilege, log retention, responsible disclosure.
- Flag group: Security data controls ([[MVP Governance Flags]])

## Suggested core tables

```
red_team_operations_plat_assets
red_team_operations_plat_alerts
red_team_operations_plat_incidents
red_team_operations_plat_threat_sources
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
  - 24/7 SOC monitoring
  - Threat intelligence
  - Penetration testing/red team
  - Physical security design
  - Security awareness training
  - Privacy compliance engineering
  - Incident response
  - Security architecture review

## Links

- Hub: [[MVP Build Guide]]
- Division: [[Obsidian Arc Division]]
- Director agent: [[Director_Obsidian_Arc]]
- Product: [[Red Team Operations Platform]]
