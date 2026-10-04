---
title: Learning Mode Door Sign
cost: ~$120-$300
tags:
- hardware
- foundry
- physical-ai
- hybrid-living
- smart-signage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Signage
cost_low: 120
division: Hybrid Living
cost_high: 300
form_factor: smart signage
division_status: operating
---
# Learning Mode Door Sign

**Smart Signage** in the Hybrid Living set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Hybrid Living Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Smart Signage |
| Form factor | smart signage |
| Budget | ~$120-$300 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Door/room sign showing active class mode, recording status, and visitor instructions.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi Zero/Pi 5 | — |
| e-ink or small display | — |
| RGB strip | — |
| wall mount | — |

Budget for the full item: **~$120-$300**.

## Specs

- Form factor: smart signage
- Placement: Classroom doorway.
- Industrial design: Amber header with high-contrast text.

## Software stack and signals

Signals / outputs: Calendar, instructor mode, building access workflow.

## Placement and agents

Placement: Classroom doorway.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Hybrid_Living]].

## Governance

> [!warning] Safety gate
> Privacy mode disables recording prompts.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
