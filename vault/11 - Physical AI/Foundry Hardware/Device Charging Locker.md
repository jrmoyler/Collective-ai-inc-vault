---
title: Device Charging Locker
cost: ~$400-$1,200
tags:
- hardware
- foundry
- physical-ai
- parent-company
- charging-infrastructure
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Charging Infrastructure
cost_low: 400
division: Collective AI Inc (Parent Company)
cost_high: 1200
form_factor: charging infrastructure
division_status: parent company
---
# Device Charging Locker

**Charging Infrastructure** in the parent company set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | Collective AI Inc (Parent Company), see [[Collective AI — Company Charter]] |
| Category | Charging Infrastructure |
| Form factor | charging infrastructure |
| Budget | ~$400-$1,200 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Lockable multi-bay charging and sync locker for wearables, field shells, cameras, and sensor pods.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| USB-C PD hub | — |
| LiPo-safe charging trays | — |
| Pi 5 inventory scanner | — |
| thermal sensors | — |
| small UPS | — |
| ASA locker inserts | — |

Budget for the full item: **~$400-$1,200**.

## Specs

- Form factor: charging infrastructure
- Placement: Hardware room or client-demo prep area.
- Industrial design: Parent-branded matte cabinet with gold bay numbers.

## Software stack and signals

Signals / outputs: Device registry, battery status log, checkout workflow.

## Placement and agents

Placement: Hardware room or client-demo prep area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Parent-level hardware. Executive routing goes through [[ZENITH]].

## Governance

> [!warning] Safety gate
> LiPo storage protocol and thermal cutoff required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: parent palette (Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver).

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
