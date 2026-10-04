---
title: Axiom Gear Wall
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- nomad-nexus
- storage-system
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Storage System
cost_low: 300
division: Nomad Nexus
cost_high: 900
form_factor: storage system
division_status: chartered
---
# Axiom Gear Wall

**Storage System** in the Nomad Nexus set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nomad Nexus Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Storage System |
| Form factor | storage system |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall rack for travel shells, cameras, LoRa devices, passports-safe pouches, and demo assets.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| NFC scanner | — |
| Pi registry | — |
| charging bays | — |
| QR labels | — |
| shelf LEDs | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: storage system
- Placement: Nomad prep area.
- Industrial design: Sand labels and compass icons.

## Software stack and signals

Signals / outputs: Nomad checkout workflow, device registry.

## Placement and agents

Placement: Nomad prep area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nomad_Nexus]].

## Governance

> [!warning] Safety gate
> Sensitive documents stored separately.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
