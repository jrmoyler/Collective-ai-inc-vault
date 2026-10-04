---
title: Universal Sensor Test Jig
cost: ~$300-$750
tags:
- hardware
- foundry
- physical-ai
- binary-loom
- test-jig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Test Jig
cost_low: 300
division: Binary Loom
cost_high: 750
form_factor: test jig
division_status: operating
---
# Universal Sensor Test Jig

**Test Jig** in the Binary Loom set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Test Jig |
| Form factor | test jig |
| Budget | ~$300-$750 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Standardized hardware fixture for testing BLE, IMU, mic, camera, haptic, and battery behavior.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| BLE receiver | — |
| USB hub | — |
| current sensor | — |
| haptic test pad | — |
| calibration mounts | — |
| NVMe | — |

Budget for the full item: **~$300-$750**.

## Specs

- Form factor: test jig
- Placement: Electronics bench.
- Industrial design: Electric-teal grid plate with labeled stations.

## Software stack and signals

Signals / outputs: Binary Loom QA, firmware registry, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Electronics bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Binary_Loom]].

## Governance

> [!warning] Safety gate
> Test credentials isolated from production.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
