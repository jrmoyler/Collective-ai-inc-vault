---
title: Servo Calibration Frame
cost: ~$250-$800
tags:
- hardware
- foundry
- physical-ai
- animus-prime
- test-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Test Fixture
cost_low: 250
division: Animus Prime
cost_high: 800
form_factor: test fixture
division_status: chartered
---
# Servo Calibration Frame

**Test Fixture** in the Animus Prime set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Animus Prime Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Test Fixture |
| Form factor | test fixture |
| Budget | ~$250-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Frame for calibrating servos, joints, ranges, offsets, and load behavior.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| servo controller | — |
| bench PSU | — |
| encoder/angle gauge | — |
| printed frame | — |
| e-stop | — |

Budget for the full item: **~$250-$800**.

## Specs

- Form factor: test fixture
- Placement: Actuation bench.
- Industrial design: Cyan measurement marks on dark frame.

## Software stack and signals

Signals / outputs: Animus QA, Binary Loom logs.

Cross-division handoffs: [[Binary Loom Division]]

## Placement and agents

Placement: Actuation bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Animus_Prime]].

## Governance

> [!warning] Safety gate
> Current-limited power only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
