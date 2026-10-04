---
title: Cognitive Load Console
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- cognara-mind
- testing-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Testing Fixture
cost_low: 250
division: Cognara Mind
cost_high: 700
form_factor: testing fixture
division_status: chartered
---
# Cognitive Load Console

**Testing Fixture** in the Cognara Mind set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Testing Fixture |
| Form factor | testing fixture |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Button/audio/display console for reaction time, attention switching, and fatigue markers.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| buttons | — |
| speaker | — |
| display | — |
| haptic pad | — |
| BLE receiver | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: testing fixture
- Placement: Desk or research room.
- Industrial design: Cognara rose interface on dark panel.

## Software stack and signals

Signals / outputs: Cognara assessment workflow, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Desk or research room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Cognara_Mind]].

## Governance

> [!warning] Safety gate
> Non-diagnostic research/productivity tool.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: behavioral data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
