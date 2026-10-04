---
title: Community Intake Kiosk Cart
cost: ~$500-$1,400
tags:
- hardware
- foundry
- physical-ai
- civic-core
- mobile-furniture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Mobile Furniture
cost_low: 500
division: Civic Core
cost_high: 1400
form_factor: mobile furniture
division_status: chartered
---
# Community Intake Kiosk Cart

**Mobile Furniture** in the Civic Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Civic Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Mobile Furniture |
| Form factor | mobile furniture |
| Budget | ~$500-$1,400 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Rolling, accessible intake cart for events, services, forms, and volunteer check-ins.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| touchscreen/Whisplay | — |
| NFC reader | — |
| printer option | — |
| battery UPS | — |
| rugged cart | — |

Budget for the full item: **~$500-$1,400**.

## Specs

- Form factor: mobile furniture
- Placement: Community events and pop-ups.
- Industrial design: Hope-blue panels with friendly signage.

## Software stack and signals

Signals / outputs: Civic intake workflow, volunteer registry.

## Placement and agents

Placement: Community events and pop-ups.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Civic_Core]].

## Governance

> [!warning] Safety gate
> Non-commercial; privacy-first intake.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: civic data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
