---
title: Eon Research Cart
cost: ~$500-$1,400
tags:
- hardware
- foundry
- physical-ai
- eon-core
- mobile-furniture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Mobile Furniture
cost_low: 500
division: Eon Core
cost_high: 1400
form_factor: mobile furniture
division_status: chartered
---
# Eon Research Cart

**Mobile Furniture** in the Eon Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Eon Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Mobile Furniture |
| Form factor | mobile furniture |
| Budget | ~$500-$1,400 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Rolling cart for longevity research sessions, sample logistics, wearable docks, and private sync.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| charging trays | — |
| encrypted SSD dock | — |
| NFC IDs | — |
| UPS battery | — |

Budget for the full item: **~$500-$1,400**.

## Specs

- Form factor: mobile furniture
- Placement: Research room.
- Industrial design: Aqua clinical cart panels.

## Software stack and signals

Signals / outputs: Eon research workflow, Vital Helix.

Cross-division handoffs: [[Vital Helix Division]]

## Placement and agents

Placement: Research room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Eon_Core]].

## Governance

> [!warning] Safety gate
> Clinical oversight for health data.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
