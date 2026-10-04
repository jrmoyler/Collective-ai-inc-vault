---
title: MVP — Neuro-Bridge BCI
tags:
- mvp
- aether-link
- complexity-medium
- arch-health-profile
type: mvp
owner: JR Moyler (Hataalii)
stage: Year 3 - Series B
source: MVP Build Guide
status: planned
product: Neuro-Bridge BCI
updated: 2026-10-04
division: Aether Link
priority: Year 3 - Series B
timeline: 90 days (5 phases)
complexity: Medium
governance: Standard Aegis-Clear
brand_color: '#38BDF8'
product_type: Research Platform
module_archetype: Health Profile
---
# MVP — Neuro-Bridge BCI

MVP build brief for **Neuro-Bridge BCI** (Research Platform), Aether Link division. Part of [[MVP Build Guide]].

> [!info] Division status
> Aether Link is a chartered division, not an operating one. The guide labels it "Year 3 - Series B"; treat that as the planned stage.

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Product note | [[Neuro-Bridge R&D]] |
| Product type | Research Platform |
| Priority | Year 3 - Series B |
| Complexity | Medium |
| Stage label in guide | Year 3 - Series B |
| Brand color | `#38BDF8` |
| Division palette | `#0F172A` `#38BDF8` `#8B5CF6` `#F5F8FF` |
| Timeline | 90 days in 5 phases ([[MVP 90-Day Sprint Plan]]) |
| Module archetype | Health Profile ([[MVP Module Archetypes]]) |
| Status | planned |

## MVP objective

Long-horizon brain-computer interface research for direct human-AI neural communication.

## UI direction

- UI vibe: Global network intelligence, multilingual interfaces, verification graph, zero-barrier communication
- Division focus: Connectivity and Communications
- Shell: parent Collective AI shell (void black, gold, cyan) plus the division palette. See [[MVP UI Design Rules]].

## Build platform

OpenBCI, Python signal processing, MNE-Python, research portals, Juris Guard trial tracking.

Shared defaults (Next.js, Supabase, FastAPI, ZenFlow adapter, Stripe, n8n) are in [[MVP Shared Architecture]].

## Core MVP screens and modules

1. User health profile
2. Data consent gate
3. Biomarker/wearable dashboard
4. Protocol or recommendation queue
5. Clinical review status
6. Alerts and care plan timeline
7. Exportable summary

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
neuro_bridge_bci_profiles
neuro_bridge_bci_consents
neuro_bridge_bci_measurements
neuro_bridge_bci_protocols
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
- Product: [[Neuro-Bridge R&D]]
