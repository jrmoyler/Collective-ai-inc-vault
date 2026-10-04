---
title: Offer Testing Shelf
cost: ~$220-$600
tags:
- hardware
- foundry
- physical-ai
- signal-velocity
- inventory-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Inventory/Display
cost_low: 220
division: Signal Velocity
cost_high: 600
form_factor: inventory/display
division_status: operating
---
# Offer Testing Shelf

**Inventory/Display** in the Signal Velocity set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Inventory/Display |
| Form factor | inventory/display |
| Budget | ~$220-$600 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical shelf for products, packages, offer cards, QR tests, and campaign artifacts.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| NFC/QR labels | — |
| Pi scanner | — |
| small display | — |
| lighting strip | — |

Budget for the full item: **~$220-$600**.

## Specs

- Form factor: inventory/display
- Placement: Marketing lab shelf.
- Industrial design: Coral labels with conversion badges.

## Software stack and signals

Signals / outputs: Offer testing workflow, analytics tracking.

## Placement and agents

Placement: Marketing lab shelf.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Signal_Velocity]].

## Governance

> [!warning] Safety gate
> Pricing claims reviewed before public use.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
