---
title: Breathwork Guidance Lamp
cost: ~$120-$320
tags:
- hardware
- foundry
- physical-ai
- vital-helix
- wellness-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Wellness Fixture
cost_low: 120
division: Vital Helix
cost_high: 320
form_factor: wellness fixture
division_status: chartered
---
# Breathwork Guidance Lamp

**Wellness Fixture** in the Vital Helix set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Vital Helix Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Wellness Fixture |
| Form factor | wellness fixture |
| Budget | ~$120-$320 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Desk or bedside lamp that guides breathing cadence with light and optional haptic remote sync.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| RGB diffuser | — |
| speaker | — |
| BLE receiver | — |
| touch controls | — |

Budget for the full item: **~$120-$320**.

## Specs

- Form factor: wellness fixture
- Placement: Desk, clinic room, or recovery area.
- Industrial design: Bio-teal glow with vital-orange session marker.

## Software stack and signals

Signals / outputs: Vital Helix session agent, routine log.

## Placement and agents

Placement: Desk, clinic room, or recovery area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Vital_Helix]].

## Governance

> [!warning] Safety gate
> Wellness support only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
