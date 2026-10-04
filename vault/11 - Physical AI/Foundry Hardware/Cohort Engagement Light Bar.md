---
title: Cohort Engagement Light Bar
cost: ~$90-$260
tags:
- hardware
- foundry
- physical-ai
- hybrid-living
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 90
division: Hybrid Living
cost_high: 260
form_factor: environmental fixture
division_status: operating
---
# Cohort Engagement Light Bar

**Environmental Fixture** in the Hybrid Living set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Hybrid Living Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$90-$260 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Classroom light bar showing cohort states such as focus, question pending, break, and exercise mode.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| addressable LEDs | — |
| physical mode buttons | — |
| wall clips | — |
| optional mic-level sensor | — |

Budget for the full item: **~$90-$260**.

## Specs

- Form factor: environmental fixture
- Placement: Classroom front wall.
- Industrial design: Learning amber glow over dark body.

## Software stack and signals

Signals / outputs: Instructor dashboard, cohort analytics.

## Placement and agents

Placement: Classroom front wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Hybrid_Living]].

## Governance

> [!warning] Safety gate
> Cohort-level signals; no public individual scoring.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
