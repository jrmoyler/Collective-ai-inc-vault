---
title: Greenhouse Control Panel
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- gaia-synthesis
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 300
division: Gaia Synthesis
cost_high: 900
form_factor: control panel
division_status: chartered
---
# Greenhouse Control Panel

**Control Panel** in the Gaia Synthesis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Gaia Synthesis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Panel for irrigation mode, climate status, grow-light schedules, and anomaly markers.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| relays | — |
| touchscreen/Whisplay | — |
| sensor inputs | — |
| emergency cutoff | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: control panel
- Placement: Greenhouse wall.
- Industrial design: Green panel with circuit-blue control lines.

## Software stack and signals

Signals / outputs: Gaia greenhouse workflow, safety log.

## Placement and agents

Placement: Greenhouse wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Gaia_Synthesis]].

## Governance

> [!warning] Safety gate
> No chemical dosing automation without review.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
