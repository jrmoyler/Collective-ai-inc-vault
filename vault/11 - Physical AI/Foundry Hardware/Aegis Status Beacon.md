---
title: Aegis Status Beacon
cost: ~$120-$260
tags:
- hardware
- foundry
- physical-ai
- parent-company
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 120
division: Collective AI Inc (Parent Company)
cost_high: 260
form_factor: environmental fixture
division_status: parent company
---
# Aegis Status Beacon

**Environmental Fixture** in the parent company set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | Collective AI Inc (Parent Company), see [[Collective AI — Company Charter]] |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$120-$260 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Three-state physical beacon for Aegis-Clear, Aegis-Review, and Aegis-Hold across the whole Foundry.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Raspberry Pi 5 or ESP32 controller | — |
| RGB LED tower | — |
| small speaker | — |
| PoE/USB-C power | — |
| 3D printed ASA wall mount | — |

Budget for the full item: **~$120-$260**.

## Specs

- Form factor: environmental fixture
- Placement: Installed near Aegis Command Station and visible from lab entry.
- Industrial design: Parent gold/teal signal rings on dark navy body.

## Software stack and signals

Signals / outputs: Aegis API, Obsidian alerts, Knowledge Keeper log feed.

Related systems: [[Knowledge Keeper]], [[Aegis Protocol]]

Cross-division handoffs: [[Obsidian Arc Division]]

## Placement and agents

Placement: Installed near Aegis Command Station and visible from lab entry.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Parent-level hardware. Executive routing goes through [[ZENITH]].

## Governance

> [!warning] Safety gate
> Aegis-Hold cannot be cleared from beacon; display only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: parent palette (Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver).

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
