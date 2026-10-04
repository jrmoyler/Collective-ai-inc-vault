---
title: Jump Readiness Mat
cost: ~$250-$800
tags:
- hardware
- foundry
- physical-ai
- kinetic-edge
- performance-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Performance Fixture
cost_low: 250
division: Kinetic Edge
cost_high: 800
form_factor: performance fixture
division_status: chartered
---
# Jump Readiness Mat

**Performance Fixture** in the Kinetic Edge set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Kinetic Edge Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Performance Fixture |
| Form factor | performance fixture |
| Budget | ~$250-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable mat that records jump stance markers, contact timing proxy, and readiness check-ins.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pressure switches or IMU pods | — |
| Pi 5 gateway | — |
| LED edges | — |
| BLE | — |

Budget for the full item: **~$250-$800**.

## Specs

- Form factor: performance fixture
- Placement: Training floor.
- Industrial design: Green edge lights and washable surface.

## Software stack and signals

Signals / outputs: Kinetic IQ, Recovery Intelligence workflow.

Related systems: [[Kinetic IQ]]

## Placement and agents

Placement: Training floor.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Kinetic_Edge]].

## Governance

> [!warning] Safety gate
> Not a medical force plate.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
