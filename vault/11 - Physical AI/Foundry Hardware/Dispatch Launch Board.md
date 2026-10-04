---
title: Dispatch Launch Board
cost: ~$300-$850
tags:
- hardware
- foundry
- physical-ai
- vectorshift
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 300
division: VectorShift
cost_high: 850
form_factor: control panel
division_status: chartered
---
# Dispatch Launch Board

**Control Panel** in the VectorShift set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[VectorShift Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$300-$850 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Operations board for dispatch staging, route readiness, drone/rover status, and handoff approvals.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| display | — |
| macro buttons | — |
| NFC cargo cards | — |
| status LEDs | — |

Budget for the full item: **~$300-$850**.

## Specs

- Form factor: control panel
- Placement: Logistics room.
- Industrial design: Velocity-silver route arcs on deep-blue body.

## Software stack and signals

Signals / outputs: Vector dispatch workflow, Aether mesh, Obsidian safety.

Cross-division handoffs: [[Obsidian Arc Division]], [[Aether Link Division]]

## Placement and agents

Placement: Logistics room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_VectorShift]].

## Governance

> [!warning] Safety gate
> No autonomous launch from board.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
