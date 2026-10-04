---
title: Device Pairing Station
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- aether-link
- dock-control
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Dock/Control
cost_low: 250
division: Aether Link
cost_high: 700
form_factor: dock/control
division_status: chartered
---
# Device Pairing Station

**Dock/Control** in the Aether Link set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Dock/Control |
| Form factor | dock/control |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Station for pairing BLE/LoRa devices, assigning VLAN class, and printing device identity labels.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| BLE/LoRa radios | — |
| label printer | — |
| NFC writer | — |
| display | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: dock/control
- Placement: Network bench.
- Industrial design: Mint status lights with dark enclosure.

## Software stack and signals

Signals / outputs: Device registry, UniFi/VLAN workflow, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Network bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Aether_Link]].

## Governance

> [!warning] Safety gate
> Unknown hardware defaults to quarantine.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
