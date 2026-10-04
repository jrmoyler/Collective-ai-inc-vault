---
title: Workshop Insight Wall
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- the-collective
- showroom-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Showroom/Display
cost_low: 250
division: The Collective
cost_high: 700
form_factor: showroom/display
division_status: operating
---
# Workshop Insight Wall

**Showroom/Display** in the The Collective set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Showroom/Display |
| Form factor | showroom/display |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall display for live workshop agenda, captured themes, risks, and follow-up lanes.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| large display | — |
| NFC agenda cards | — |
| BLE marker receiver | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: showroom/display
- Placement: Workshop room wall.
- Industrial design: Gold section headers with restrained card layout.

## Software stack and signals

Signals / outputs: Client Presentation workflow, Notion/CRM.

## Placement and agents

Placement: Workshop room wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_The_Collective]].

## Governance

> [!warning] Safety gate
> Client-sensitive display mode required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: client data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
