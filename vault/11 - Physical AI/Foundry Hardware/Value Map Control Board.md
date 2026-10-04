---
title: Value Map Control Board
cost: ~$220-$520
tags:
- hardware
- foundry
- physical-ai
- the-collective
- control-surface
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Surface
cost_low: 220
division: The Collective
cost_high: 520
form_factor: control surface
division_status: operating
---
# Value Map Control Board

**Control Surface** in the The Collective set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Surface |
| Form factor | control surface |
| Budget | ~$220-$520 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Button/slider board used during strategy sessions to rank pain points, urgency, value, and risk.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| rotary encoders | — |
| arcade buttons | — |
| LED indicators | — |
| BLE receiver | — |

Budget for the full item: **~$220-$520**.

## Specs

- Form factor: control surface
- Placement: Workshop table accessory.
- Industrial design: Gold scoring lanes, dark enclosure.

## Software stack and signals

Signals / outputs: Strategy audit workflow, report generator.

## Placement and agents

Placement: Workshop table accessory.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_The_Collective]].

## Governance

> [!warning] Safety gate
> Client data stored to approved workspace only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: client data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
