---
title: Route Test Floor Grid
cost: ~$180-$600
tags:
- hardware
- foundry
- physical-ai
- vectorshift
- lab-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Lab Fixture
cost_low: 180
division: VectorShift
cost_high: 600
form_factor: lab fixture
division_status: chartered
---
# Route Test Floor Grid

**Lab Fixture** in the VectorShift set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[VectorShift Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Lab Fixture |
| Form factor | lab fixture |
| Budget | ~$180-$600 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Printed floor grid for rover routing, obstacle placement, docking tests, and computer-vision calibration.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Modular printed tiles | — |
| markers | — |
| AprilTags | — |
| lighting strips | — |
| camera mounts | — |

Budget for the full item: **~$180-$600**.

## Specs

- Form factor: lab fixture
- Placement: Lab floor or roll-out mat.
- Industrial design: Silver route lines on dark blue grid.

## Software stack and signals

Signals / outputs: Vector/Animus test workflows.

Cross-division handoffs: [[Animus Prime Division]]

## Placement and agents

Placement: Lab floor or roll-out mat.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_VectorShift]].

## Governance

> [!warning] Safety gate
> Robots stay within marked zone.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
