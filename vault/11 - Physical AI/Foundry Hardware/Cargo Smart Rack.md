---
title: Cargo Smart Rack
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- vectorshift
- inventory-system
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Inventory System
cost_low: 300
division: VectorShift
cost_high: 900
form_factor: inventory system
division_status: chartered
---
# Cargo Smart Rack

**Inventory System** in the VectorShift set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[VectorShift Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Inventory System |
| Form factor | inventory system |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

NFC/QR cargo rack binding packages to route, vehicle, drone, or rover.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 scanner | — |
| NFC tags | — |
| QR labels | — |
| shelf sensors optional | — |
| charging bays | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: inventory system
- Placement: Loading area.
- Industrial design: Silver bay IDs with route arrows.

## Software stack and signals

Signals / outputs: Dispatch inventory, proof-of-handoff.

## Placement and agents

Placement: Loading area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_VectorShift]].

## Governance

> [!warning] Safety gate
> Chain-of-custody logging.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
