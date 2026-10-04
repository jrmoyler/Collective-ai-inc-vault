---
title: Prototype Registry Shelf
cost: ~$250-$650
tags:
- hardware
- foundry
- physical-ai
- parent-company
- inventory-system
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Inventory System
cost_low: 250
division: Collective AI Inc (Parent Company)
cost_high: 650
form_factor: inventory system
division_status: parent company
---
# Prototype Registry Shelf

**Inventory System** in the parent company set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | Collective AI Inc (Parent Company), see [[Collective AI — Company Charter]] |
| Category | Inventory System |
| Form factor | inventory system |
| Budget | ~$250-$650 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

QR/NFC-tagged shelf system for every prototype version, CAD file, firmware, owner, and safety gate.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| NFC stickers/tags | — |
| QR labels | — |
| Pi 5 scanner | — |
| Pi Camera 3 | — |
| small status display | — |
| NAS-backed database | — |

Budget for the full item: **~$250-$650**.

## Specs

- Form factor: inventory system
- Placement: Wall shelf or rolling rack.
- Industrial design: Dark metal/shelf labels with amber prototype plates.

## Software stack and signals

Signals / outputs: Device registry, Knowledge Keeper, GitHub releases, NAS CAD archive.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Wall shelf or rolling rack.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Parent-level hardware. Executive routing goes through [[ZENITH]].

## Governance

> [!warning] Safety gate
> Unknown devices default to VLAN 80 quarantine.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: parent palette (Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver).

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
