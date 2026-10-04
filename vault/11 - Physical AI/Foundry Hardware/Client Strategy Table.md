---
title: Client Strategy Table
cost: ~$350-$850
tags:
- hardware
- foundry
- physical-ai
- the-collective
- smart-furniture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Furniture
cost_low: 350
division: The Collective
cost_high: 850
form_factor: smart furniture
division_status: operating
---
# Client Strategy Table

**Smart Furniture** in the The Collective set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Smart Furniture |
| Form factor | smart furniture |
| Budget | ~$350-$850 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Conference table insert for meeting capture controls, consent state, and AI-assisted workshop flow.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| ReSpeaker 4-Mic Array | — |
| Whisplay display | — |
| physical buttons | — |
| speaker bonnet | — |
| NVMe | — |

Budget for the full item: **~$350-$850**.

## Specs

- Form factor: smart furniture
- Placement: Conference table center insert.
- Industrial design: Matte gold edge rail on dark table surface.

## Software stack and signals

Signals / outputs: Client session workflow, CRM, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Conference table center insert.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_The_Collective]].

## Governance

> [!warning] Safety gate
> Visible consent indicator before recording.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: client data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
