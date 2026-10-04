---
title: Mobile Docking Cradle
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- vectorshift
- robot-drone-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Robot/Drone Fixture
cost_low: 250
division: VectorShift
cost_high: 700
form_factor: robot/drone fixture
division_status: chartered
---
# Mobile Docking Cradle

**Robot/Drone Fixture** in the VectorShift set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[VectorShift Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Robot/Drone Fixture |
| Form factor | robot/drone fixture |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical cradle for small rovers/drones to align, charge, and sync logs after tests.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Printed cradle | — |
| pogo/USB-C charge | — |
| Pi 5 sync controller | — |
| NFC vehicle ID | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: robot/drone fixture
- Placement: Robot/drone bench.
- Industrial design: Silver cradle with route-status LEDs.

## Software stack and signals

Signals / outputs: Vector vehicle registry, NAS sync.

## Placement and agents

Placement: Robot/drone bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_VectorShift]].

## Governance

> [!warning] Safety gate
> Charge current limited per vehicle.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
