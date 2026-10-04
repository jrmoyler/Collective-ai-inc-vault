---
title: Behavior Loop Light
cost: ~$100-$280
tags:
- hardware
- foundry
- physical-ai
- cognara-mind
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 100
division: Cognara Mind
cost_high: 280
form_factor: environmental fixture
division_status: chartered
---
# Behavior Loop Light

**Environmental Fixture** in the Cognara Mind set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$100-$280 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Ambient light object for habit-state cues, focus windows, drift alerts, and recovery transitions.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| RGB diffuser | — |
| button | — |
| BLE receiver | — |
| speaker optional | — |

Budget for the full item: **~$100-$280**.

## Specs

- Form factor: environmental fixture
- Placement: Desk or room.
- Industrial design: Rose pulse with soft dark shell.

## Software stack and signals

Signals / outputs: Cognara habit workflow, ZenFlow.

Cross-division handoffs: [[ZenFlow Division]]

## Placement and agents

Placement: Desk or room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Cognara_Mind]].

## Governance

> [!warning] Safety gate
> User-controlled nudges only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: behavioral data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
