---
title: HomeHub Wall Controller
cost: ~$250-$650
tags:
- hardware
- foundry
- physical-ai
- terra-axis
- environment-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environment Fixture
cost_low: 250
division: Terra Axis
cost_high: 650
form_factor: environment fixture
division_status: chartered
---
# HomeHub Wall Controller

**Environment Fixture** in the Terra Axis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Environment Fixture |
| Form factor | environment fixture |
| Budget | ~$250-$650 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall-mounted smart habitat control panel for occupancy state, sensors, and maintenance alerts.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| touchscreen/Whisplay | — |
| Pi AI Camera optional | — |
| BLE/LoRa receiver | — |
| NVMe | — |

Budget for the full item: **~$250-$650**.

## Specs

- Form factor: environment fixture
- Placement: Demo home wall or showroom.
- Industrial design: Blue architectural frame on dark wall plate.

## Software stack and signals

Signals / outputs: HomeHub OS, Terra registry, Obsidian alerts.

Related systems: [[HomeHub]]

Cross-division handoffs: [[Obsidian Arc Division]]

## Placement and agents

Placement: Demo home wall or showroom.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Terra_Axis]].

## Governance

> [!warning] Safety gate
> Camera privacy shutter required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
