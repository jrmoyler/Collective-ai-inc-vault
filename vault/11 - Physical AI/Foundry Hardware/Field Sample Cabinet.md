---
title: Field Sample Cabinet
cost: ~$200-$600
tags:
- hardware
- foundry
- physical-ai
- gaia-synthesis
- storage-system
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Storage System
cost_low: 200
division: Gaia Synthesis
cost_high: 600
form_factor: storage system
division_status: chartered
---
# Field Sample Cabinet

**Storage System** in the Gaia Synthesis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Gaia Synthesis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Storage System |
| Form factor | storage system |
| Budget | ~$200-$600 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Labeled cabinet for soil samples, seed packets, sensor probes, and experiment logs.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| NFC/QR labels | — |
| Pi scanner | — |
| environmental sensor | — |
| small display | — |

Budget for the full item: **~$200-$600**.

## Specs

- Form factor: storage system
- Placement: Lab or greenhouse room.
- Industrial design: Green labels with sample ID grid.

## Software stack and signals

Signals / outputs: Gaia sample registry, NAS archive.

## Placement and agents

Placement: Lab or greenhouse room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Gaia_Synthesis]].

## Governance

> [!warning] Safety gate
> Sample chain-of-custody log.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
