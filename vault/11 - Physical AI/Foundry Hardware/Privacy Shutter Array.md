---
title: Privacy Shutter Array
cost: ~$80-$220 per camera
tags:
- hardware
- foundry
- physical-ai
- obsidian-arc
- hardware-safety-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Hardware Safety Fixture
cost_low: 80
division: Obsidian Arc
cost_high: 220
form_factor: hardware safety fixture
division_status: operating
---
# Privacy Shutter Array

**Hardware Safety Fixture** in the Obsidian Arc set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Obsidian Arc Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Hardware Safety Fixture |
| Form factor | hardware safety fixture |
| Budget | ~$80-$220 per camera (per unit) |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical shutter modules for lab cameras proving capture is blocked when privacy mode is active.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Servo shutters | — |
| ESP32/Pi controller | — |
| status LED | — |
| mechanical flag | — |
| printed camera frames | — |

Budget for the full item: **~$80-$220 per camera** (per unit).

## Specs

- Form factor: hardware safety fixture
- Placement: Camera rigs, rooms, scan stations.
- Industrial design: Orange mechanical flag visible from room entry.

## Software stack and signals

Signals / outputs: Obsidian privacy workflow, room consent panels.

## Placement and agents

Placement: Camera rigs, rooms, scan stations.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Obsidian_Arc]].

## Governance

> [!warning] Safety gate
> Mechanical closed state overrides software.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
