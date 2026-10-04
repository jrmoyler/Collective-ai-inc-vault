---
title: Recovery Check-In Mat
cost: ~$250-$800
tags:
- hardware
- foundry
- physical-ai
- vital-helix
- performance-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Performance Fixture
cost_low: 250
division: Vital Helix
cost_high: 800
form_factor: performance fixture
division_status: chartered
---
# Recovery Check-In Mat

**Performance Fixture** in the Vital Helix set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Vital Helix Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Performance Fixture |
| Form factor | performance fixture |
| Budget | ~$250-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Floor mat for balance, stance, and readiness check-ins before training or wellness sessions.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pressure switch grid or IMU pods | — |
| Pi 5 gateway | — |
| BLE | — |
| LED edge indicator | — |

Budget for the full item: **~$250-$800**.

## Specs

- Form factor: performance fixture
- Placement: Gym or clinic floor.
- Industrial design: Teal mat outline with orange ready state.

## Software stack and signals

Signals / outputs: Vital/Kinetic readiness workflow.

Cross-division handoffs: [[Kinetic Edge Division]]

## Placement and agents

Placement: Gym or clinic floor.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Vital_Helix]].

## Governance

> [!warning] Safety gate
> Not a diagnostic force plate.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
