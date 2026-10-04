---
title: Reaction-Time Wall Panel
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- kinetic-edge
- training-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Training Fixture
cost_low: 300
division: Kinetic Edge
cost_high: 900
form_factor: training fixture
division_status: chartered
---
# Reaction-Time Wall Panel

**Training Fixture** in the Kinetic Edge set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Kinetic Edge Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Training Fixture |
| Form factor | training fixture |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall-mounted LED/button panel for reaction drills, agility training, and cognitive-motor testing.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| addressable LEDs | — |
| rugged buttons | — |
| speaker | — |
| BLE receiver | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: training fixture
- Placement: Gym wall or training cage.
- Industrial design: Performance-green light lanes on dark panel.

## Software stack and signals

Signals / outputs: Apex System, athlete profile, Knowledge Keeper.

Related systems: [[Knowledge Keeper]], [[Apex System]]

## Placement and agents

Placement: Gym wall or training cage.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Kinetic_Edge]].

## Governance

> [!warning] Safety gate
> Coach-supervised training.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
