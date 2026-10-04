---
title: Skill Drill Board
cost: ~$220-$550
tags:
- hardware
- foundry
- physical-ai
- hybrid-living
- training-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Training Hardware
cost_low: 220
division: Hybrid Living
cost_high: 550
form_factor: training hardware
division_status: operating
---
# Skill Drill Board

**Training Hardware** in the Hybrid Living set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Hybrid Living Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Training Hardware |
| Form factor | training hardware |
| Budget | ~$220-$550 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical quiz and practice board with buttons, LEDs, and audio prompts for active learning.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| tactile buttons | — |
| speaker bonnet | — |
| Whisplay | — |
| LED feedback | — |
| NFC student mode cards | — |

Budget for the full item: **~$220-$550**.

## Specs

- Form factor: training hardware
- Placement: Desk or classroom station.
- Industrial design: Amber controls with clear accessible labels.

## Software stack and signals

Signals / outputs: Hybrid Living LMS, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Desk or classroom station.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Hybrid_Living]].

## Governance

> [!warning] Safety gate
> Age-appropriate content gating.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
