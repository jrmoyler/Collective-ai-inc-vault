---
title: Blueprint Review Table
cost: ~$350-$900
tags:
- hardware
- foundry
- physical-ai
- terra-axis
- smart-furniture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Furniture
cost_low: 350
division: Terra Axis
cost_high: 900
form_factor: smart furniture
division_status: chartered
---
# Blueprint Review Table

**Smart Furniture** in the Terra Axis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Smart Furniture |
| Form factor | smart furniture |
| Budget | ~$350-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Tabletop display/control surface for property analytics, ROI sliders, risk badges, and site notes.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| touchscreen or display | — |
| rotary encoders | — |
| NFC property cards | — |

Budget for the full item: **~$350-$900**.

## Specs

- Form factor: smart furniture
- Placement: Strategy room.
- Industrial design: Blue grid surface with dark cards.

## Software stack and signals

Signals / outputs: Terra Vision dashboard, Mapbox, Airtable.

Related systems: [[Terra Vision]]

## Placement and agents

Placement: Strategy room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Terra_Axis]].

## Governance

> [!warning] Safety gate
> Financial outputs are estimates, not advice.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
