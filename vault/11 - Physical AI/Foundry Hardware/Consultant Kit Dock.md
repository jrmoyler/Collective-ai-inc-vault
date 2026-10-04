---
title: Consultant Kit Dock
cost: ~$180-$450
tags:
- hardware
- foundry
- physical-ai
- the-collective
- charging-dock
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Charging/Dock
cost_low: 180
division: The Collective
cost_high: 450
form_factor: charging/dock
division_status: operating
---
# Consultant Kit Dock

**Charging/Dock** in the The Collective set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Charging/Dock |
| Form factor | charging/dock |
| Budget | ~$180-$450 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Docking tray for consulting wearables, tokens, microphones, and presentation remotes.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| USB-C PD hub | — |
| NFC reader | — |
| Pi 5 inventory scanner | — |
| printed tray inserts | — |
| thermal monitor | — |

Budget for the full item: **~$180-$450**.

## Specs

- Form factor: charging/dock
- Placement: Consulting prep shelf.
- Industrial design: Gold tray IDs with dark soft-touch bays.

## Software stack and signals

Signals / outputs: Device registry, meeting prep checklist.

## Placement and agents

Placement: Consulting prep shelf.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_The_Collective]].

## Governance

> [!warning] Safety gate
> Only charged devices marked demo-ready.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: client data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
