---
title: Volunteer Dispatch Board
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- civic-core
- smart-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Display
cost_low: 250
division: Civic Core
cost_high: 700
form_factor: smart display
division_status: chartered
---
# Volunteer Dispatch Board

**Smart Display** in the Civic Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Civic Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Smart Display |
| Form factor | smart display |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall board for assignments, routes, supply needs, and status without commercial language.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| display | — |
| NFC volunteer cards | — |
| status buttons | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: smart display
- Placement: Civic operations room.
- Industrial design: Hope-blue card layout with soft edges.

## Software stack and signals

Signals / outputs: Volunteer workflow, calendar.

## Placement and agents

Placement: Civic operations room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Civic_Core]].

## Governance

> [!warning] Safety gate
> Personal data hidden in public display mode.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: civic data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
