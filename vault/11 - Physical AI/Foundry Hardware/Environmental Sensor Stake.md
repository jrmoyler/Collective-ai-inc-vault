---
title: Environmental Sensor Stake
cost: ~$70-$220 each
tags:
- hardware
- foundry
- physical-ai
- gaia-synthesis
- field-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Field Fixture
cost_low: 70
division: Gaia Synthesis
cost_high: 220
form_factor: field fixture
division_status: chartered
---
# Environmental Sensor Stake

**Field Fixture** in the Gaia Synthesis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Gaia Synthesis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Field Fixture |
| Form factor | field fixture |
| Budget | ~$70-$220 each (per unit) |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Outdoor stake for soil, air, light, humidity, and microclimate logging.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi Pico | — |
| soil/temp/humidity/light sensors | — |
| LoRa | — |
| solar/battery | — |
| waterproof enclosure | — |

Budget for the full item: **~$70-$220 each** (per unit).

## Specs

- Form factor: field fixture
- Placement: Garden, greenhouse, test plot.
- Industrial design: Green/circuit-blue stake cap.

## Software stack and signals

Signals / outputs: Gaia field dashboard, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Garden, greenhouse, test plot.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Gaia_Synthesis]].

## Governance

> [!warning] Safety gate
> Research-grade trends; calibrate before decisions.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
