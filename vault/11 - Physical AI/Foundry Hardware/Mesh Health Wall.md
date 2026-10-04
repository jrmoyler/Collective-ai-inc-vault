---
title: Mesh Health Wall
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- aether-link
- network-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Network Display
cost_low: 300
division: Aether Link
cost_high: 900
form_factor: network display
division_status: chartered
---
# Mesh Health Wall

**Network Display** in the Aether Link set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Network Display |
| Form factor | network display |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall map showing LoRa, Wi-Fi, WAN, field mesh, and offline nodes at a glance.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| display/LED map | — |
| MQTT bridge | — |
| NFC device cards | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: network display
- Placement: Network room wall.
- Industrial design: Signal-mint network rings on dark map.

## Software stack and signals

Signals / outputs: Meshtastic, UniFi, OpenTelemetry, Knowledge Keeper.

Related systems: [[Knowledge Keeper]], [[Observability Stack]]

## Placement and agents

Placement: Network room wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Aether_Link]].

## Governance

> [!warning] Safety gate
> No credentials displayed.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
