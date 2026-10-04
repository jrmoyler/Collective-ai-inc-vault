---
title: Coach Drill Console
cost: ~$220-$550
tags:
- hardware
- foundry
- physical-ai
- kinetic-edge
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 220
division: Kinetic Edge
cost_high: 550
form_factor: control panel
division_status: chartered
---
# Coach Drill Console

**Control Panel** in the Kinetic Edge set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Kinetic Edge Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$220-$550 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical console for coaches to start drills, tag reps, and send haptic signals to athletes.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| macro buttons | — |
| rotary timer | — |
| Whisplay | — |
| BLE transmitter | — |

Budget for the full item: **~$220-$550**.

## Specs

- Form factor: control panel
- Placement: Coach station.
- Industrial design: Green rugged console with large tactile buttons.

## Software stack and signals

Signals / outputs: Apex Motion Cage, athlete wearables.

Related systems: [[Apex System]]

## Placement and agents

Placement: Coach station.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Kinetic_Edge]].

## Governance

> [!warning] Safety gate
> Human coach approves load changes.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
