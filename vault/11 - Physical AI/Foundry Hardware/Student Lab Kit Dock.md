---
title: Student Lab Kit Dock
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- hybrid-living
- charging-dock
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Charging/Dock
cost_low: 250
division: Hybrid Living
cost_high: 700
form_factor: charging/dock
division_status: operating
---
# Student Lab Kit Dock

**Charging/Dock** in the Hybrid Living set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Hybrid Living Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Charging/Dock |
| Form factor | charging/dock |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Multi-slot sync dock for student sensors, microcontroller boards, and classroom devices.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| USB-C hub | — |
| Pi 5 scanner | — |
| NFC bay IDs | — |
| printed trays | — |
| battery monitor | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: charging/dock
- Placement: Lab shelf or rolling cart.
- Industrial design: Amber bay numbering with dark shell.

## Software stack and signals

Signals / outputs: Device registry, classroom inventory.

## Placement and agents

Placement: Lab shelf or rolling cart.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Hybrid_Living]].

## Governance

> [!warning] Safety gate
> Battery safety and teacher check-out required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
