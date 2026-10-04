---
title: Roam Charging Trunk
cost: ~$350-$1,100
tags:
- hardware
- foundry
- physical-ai
- nomad-nexus
- charging-storage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Charging/Storage
cost_low: 350
division: Nomad Nexus
cost_high: 1100
form_factor: charging/storage
division_status: chartered
---
# Roam Charging Trunk

**Charging/Storage** in the Nomad Nexus set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nomad Nexus Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Charging/Storage |
| Form factor | charging/storage |
| Budget | ~$350-$1,100 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Rugged trunk for charging travel devices, field gear, power banks, and mesh comms.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| USB-C PD hub | — |
| battery pack | — |
| Pi inventory scanner | — |
| thermal sensors | — |
| rugged case | — |

Budget for the full item: **~$350-$1,100**.

## Specs

- Form factor: charging/storage
- Placement: Vehicle, office, or field base.
- Industrial design: Horizon-sand labels on black trunk.

## Software stack and signals

Signals / outputs: Nomad device registry, Aether Link.

Cross-division handoffs: [[Aether Link Division]]

## Placement and agents

Placement: Vehicle, office, or field base.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nomad_Nexus]].

## Governance

> [!warning] Safety gate
> Airline/battery transport rules apply.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
