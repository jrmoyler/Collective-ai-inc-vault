---
title: Camera Calibration Gate
cost: ~$180-$500
tags:
- hardware
- foundry
- physical-ai
- kinetic-edge
- camera-rig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Camera Rig
cost_low: 180
division: Kinetic Edge
cost_high: 500
form_factor: camera rig
division_status: chartered
---
# Camera Calibration Gate

**Camera Rig** in the Kinetic Edge set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Kinetic Edge Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Camera Rig |
| Form factor | camera rig |
| Budget | ~$180-$500 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable gate with calibration markers for global-shutter cameras and multi-IMU alignment.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Printed gate frame | — |
| ArUco/checkerboard panels | — |
| Pi camera mounts | — |
| measuring scale | — |

Budget for the full item: **~$180-$500**.

## Specs

- Form factor: camera rig
- Placement: Gym lane or motion cage.
- Industrial design: Green/white measurement markers on dark frame.

## Software stack and signals

Signals / outputs: Apex calibration workflow, Binary Loom QA.

Related systems: [[Apex System]]

Cross-division handoffs: [[Binary Loom Division]]

## Placement and agents

Placement: Gym lane or motion cage.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Kinetic_Edge]].

## Governance

> [!warning] Safety gate
> Calibration before athlete testing.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
