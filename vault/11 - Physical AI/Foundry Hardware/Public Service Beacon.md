---
title: Public Service Beacon
cost: ~$120-$300
tags:
- hardware
- foundry
- physical-ai
- civic-core
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 120
division: Civic Core
cost_high: 300
form_factor: environmental fixture
division_status: chartered
---
# Public Service Beacon

**Environmental Fixture** in the Civic Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Civic Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$120-$300 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable beacon for event help desk, accessible services, water, charging, or first-aid direction.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| LED sign | — |
| battery | — |
| printed stand | — |
| optional LoRa | — |

Budget for the full item: **~$120-$300**.

## Specs

- Form factor: environmental fixture
- Placement: Public event area.
- Industrial design: Blue beacon with clear iconography.

## Software stack and signals

Signals / outputs: Event mode, Civic Core support workflow.

## Placement and agents

Placement: Public event area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Civic_Core]].

## Governance

> [!warning] Safety gate
> Signage only; emergency services still human-led.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: civic data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
