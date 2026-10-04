---
title: Conversion War Board
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- signal-velocity
- control-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control/Display
cost_low: 300
division: Signal Velocity
cost_high: 900
form_factor: control/display
division_status: operating
---
# Conversion War Board

**Control/Display** in the Signal Velocity set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control/Display |
| Form factor | control/display |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Tactile board for funnel stages, ad variants, hooks, spend lanes, and creative approvals.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| display | — |
| NFC creative cards | — |
| macro buttons | — |
| LED funnel lanes | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: control/display
- Placement: Marketing war room.
- Industrial design: Coral funnel lanes over dark grid.

## Software stack and signals

Signals / outputs: Campaign engine, analytics, content calendar.

## Placement and agents

Placement: Marketing war room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Signal_Velocity]].

## Governance

> [!warning] Safety gate
> Budget actions require human approval.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
