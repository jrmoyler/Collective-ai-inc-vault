---
title: Mutual Aid Supply Shelf
cost: ~$250-$750
tags:
- hardware
- foundry
- physical-ai
- civic-core
- inventory-system
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Inventory System
cost_low: 250
division: Civic Core
cost_high: 750
form_factor: inventory system
division_status: chartered
---
# Mutual Aid Supply Shelf

**Inventory System** in the Civic Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Civic Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Inventory System |
| Form factor | inventory system |
| Budget | ~$250-$750 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

NFC/QR-tracked shelf for food, supplies, documents, kits, and event materials.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 scanner | — |
| NFC tags | — |
| QR labels | — |
| shelf sensors optional | — |
| display | — |

Budget for the full item: **~$250-$750**.

## Specs

- Form factor: inventory system
- Placement: Supply room.
- Industrial design: Blue labels and clear readable status.

## Software stack and signals

Signals / outputs: Civic inventory, event planning.

## Placement and agents

Placement: Supply room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Civic_Core]].

## Governance

> [!warning] Safety gate
> Do not expose recipient identities publicly.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: civic data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
