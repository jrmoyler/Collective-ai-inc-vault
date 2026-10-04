---
title: Comms Failover Crate
cost: ~$500-$1,500
tags:
- hardware
- foundry
- physical-ai
- aether-link
- resilience-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Resilience Hardware
cost_low: 500
division: Aether Link
cost_high: 1500
form_factor: resilience hardware
division_status: chartered
---
# Comms Failover Crate

**Resilience Hardware** in the Aether Link set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Resilience Hardware |
| Form factor | resilience hardware |
| Budget | ~$500-$1,500 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Grab-and-go crate for LTE/5G failover, LoRa relay, spare batteries, and local status display.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| LTE/5G gateway | — |
| Pi 5 | — |
| T-Beam nodes | — |
| battery pack | — |
| router | — |
| rugged crate | — |

Budget for the full item: **~$500-$1,500**.

## Specs

- Form factor: resilience hardware
- Placement: Ops closet or field vehicle.
- Industrial design: Mint-labeled rugged crate.

## Software stack and signals

Signals / outputs: Aether emergency comms, Obsidian support.

Cross-division handoffs: [[Obsidian Arc Division]]

## Placement and agents

Placement: Ops closet or field vehicle.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Aether_Link]].

## Governance

> [!warning] Safety gate
> Emergency-use access policy.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
