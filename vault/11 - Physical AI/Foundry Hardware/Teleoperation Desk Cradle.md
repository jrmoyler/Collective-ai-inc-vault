---
title: Teleoperation Desk Cradle
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- animus-prime
- control-surface
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Surface
cost_low: 300
division: Animus Prime
cost_high: 900
form_factor: control surface
division_status: chartered
---
# Teleoperation Desk Cradle

**Control Surface** in the Animus Prime set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Animus Prime Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Control Surface |
| Form factor | control surface |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Desktop cradle for joystick, gesture glove receiver, camera views, and robot mode controls.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| joystick | — |
| BLE receiver | — |
| display | — |
| macro buttons | — |
| haptic motor | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: control surface
- Placement: Operator desk.
- Industrial design: Cyan command cradle with guarded controls.

## Software stack and signals

Signals / outputs: ROS2 bridge, Animus console.

## Placement and agents

Placement: Operator desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Animus_Prime]].

## Governance

> [!warning] Safety gate
> Sandbox-only until Aegis clears.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
