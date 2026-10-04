---
title: Compost Telemetry Bin
cost: ~$120-$350
tags:
- hardware
- foundry
- physical-ai
- gaia-synthesis
- environmental-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Hardware
cost_low: 120
division: Gaia Synthesis
cost_high: 350
form_factor: environmental hardware
division_status: chartered
---
# Compost Telemetry Bin

**Environmental Hardware** in the Gaia Synthesis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Gaia Synthesis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Environmental Hardware |
| Form factor | environmental hardware |
| Budget | ~$120-$350 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Instrumented compost bin tracking temperature, moisture proxy, aeration events, and cycle state.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| temp/moisture sensors | — |
| LoRa/BLE | — |
| battery | — |
| rugged enclosure | — |

Budget for the full item: **~$120-$350**.

## Specs

- Form factor: environmental hardware
- Placement: Outdoor/greenhouse compost area.
- Industrial design: Green bin tag with circuit-blue status.

## Software stack and signals

Signals / outputs: Gaia waste loop workflow, dashboard.

## Placement and agents

Placement: Outdoor/greenhouse compost area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Gaia_Synthesis]].

## Governance

> [!warning] Safety gate
> No automated mechanical mixing in v1.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
