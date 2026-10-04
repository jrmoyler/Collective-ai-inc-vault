---
title: Bio Sensor Calibration Tray
cost: ~$220-$520
tags:
- hardware
- foundry
- physical-ai
- vital-helix
- test-jig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Test Jig
cost_low: 220
division: Vital Helix
cost_high: 520
form_factor: test jig
division_status: chartered
---
# Bio Sensor Calibration Tray

**Test Jig** in the Vital Helix set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Vital Helix Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Test Jig |
| Form factor | test jig |
| Budget | ~$220-$520 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Tray for validating IMU, BLE, haptic, and environmental sensors before health-related sessions.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| BLE receiver | — |
| IMU reference mount | — |
| haptic tester | — |
| thermal sensor | — |
| printed tray | — |

Budget for the full item: **~$220-$520**.

## Specs

- Form factor: test jig
- Placement: Lab bench.
- Industrial design: Teal calibration grid.

## Software stack and signals

Signals / outputs: Vital QA workflow, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Lab bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Vital_Helix]].

## Governance

> [!warning] Safety gate
> Research devices must pass QA before use.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
