---
title: Inspection Gear Locker
cost: ~$400-$1,100
tags:
- hardware
- foundry
- physical-ai
- terra-axis
- storage-charging
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Storage/Charging
cost_low: 400
division: Terra Axis
cost_high: 1100
form_factor: storage/charging
division_status: chartered
---
# Inspection Gear Locker

**Storage/Charging** in the Terra Axis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Storage/Charging |
| Form factor | storage/charging |
| Budget | ~$400-$1,100 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Labeled locker for cameras, drones, hardhat clips, batteries, and survey gear.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| NFC reader | — |
| Pi 5 registry | — |
| USB-C charging | — |
| LiPo-safe compartments | — |
| QR labels | — |

Budget for the full item: **~$400-$1,100**.

## Specs

- Form factor: storage/charging
- Placement: Field gear room.
- Industrial design: Blue bay labels and rugged black cabinet.

## Software stack and signals

Signals / outputs: Equipment checkout, Terra project board.

## Placement and agents

Placement: Field gear room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Terra_Axis]].

## Governance

> [!warning] Safety gate
> Battery and access logs required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
