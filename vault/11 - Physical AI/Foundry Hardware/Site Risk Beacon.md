---
title: Site Risk Beacon
cost: ~$150-$360
tags:
- hardware
- foundry
- physical-ai
- terra-axis
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 150
division: Terra Axis
cost_high: 360
form_factor: environmental fixture
division_status: chartered
---
# Site Risk Beacon

**Environmental Fixture** in the Terra Axis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$150-$360 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable light/sound beacon used at inspection staging areas for hazards, weather, and no-entry signals.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| RGB tower light | — |
| buzzer | — |
| battery pack | — |
| LoRa receiver | — |
| ASA enclosure | — |

Budget for the full item: **~$150-$360**.

## Specs

- Form factor: environmental fixture
- Placement: Tripod or magnetic base.
- Industrial design: Blue/orange risk band on rugged case.

## Software stack and signals

Signals / outputs: Site safety workflow, Obsidian Arc alerts.

Cross-division handoffs: [[Obsidian Arc Division]]

## Placement and agents

Placement: Tripod or magnetic base.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Terra_Axis]].

## Governance

> [!warning] Safety gate
> Safety signage supplement only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
