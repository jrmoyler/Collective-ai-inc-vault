---
title: Longevity Routine Lamp
cost: ~$120-$320
tags:
- hardware
- foundry
- physical-ai
- eon-core
- wellness-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Wellness Fixture
cost_low: 120
division: Eon Core
cost_high: 320
form_factor: wellness fixture
division_status: chartered
---
# Longevity Routine Lamp

**Wellness Fixture** in the Eon Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Eon Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Wellness Fixture |
| Form factor | wellness fixture |
| Budget | ~$120-$320 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Ambient lamp guiding evening routines, reflection prompts, recovery wind-down, and morning state.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| RGB diffuser | — |
| speaker | — |
| button | — |
| BLE receiver | — |

Budget for the full item: **~$120-$320**.

## Specs

- Form factor: wellness fixture
- Placement: Bedroom, clinic, or reflection room.
- Industrial design: Aqua slow-pulse glow.

## Software stack and signals

Signals / outputs: Eon routine agent, Vital Helix.

Cross-division handoffs: [[Vital Helix Division]]

## Placement and agents

Placement: Bedroom, clinic, or reflection room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Eon_Core]].

## Governance

> [!warning] Safety gate
> Wellness guidance only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
