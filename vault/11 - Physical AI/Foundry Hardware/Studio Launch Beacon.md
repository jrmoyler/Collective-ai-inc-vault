---
title: Studio Launch Beacon
cost: ~$90-$240
tags:
- hardware
- foundry
- physical-ai
- signal-velocity
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 90
division: Signal Velocity
cost_high: 240
form_factor: environmental fixture
division_status: operating
---
# Studio Launch Beacon

**Environmental Fixture** in the Signal Velocity set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$90-$240 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Room beacon showing live, scheduled, editing, render, and crisis-response campaign states.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| RGB light | — |
| e-ink label | — |
| physical override | — |

Budget for the full item: **~$90-$240**.

## Specs

- Form factor: environmental fixture
- Placement: Studio/war-room door.
- Industrial design: Coral light bar with sharp momentum lines.

## Software stack and signals

Signals / outputs: Signal campaign calendar, Nexus studio state.

Cross-division handoffs: [[Nexus Labs Division]]

## Placement and agents

Placement: Studio/war-room door.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Signal_Velocity]].

## Governance

> [!warning] Safety gate
> Manual override always available.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
