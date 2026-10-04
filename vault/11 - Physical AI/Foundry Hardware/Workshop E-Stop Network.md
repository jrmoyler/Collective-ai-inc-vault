---
title: Workshop E-Stop Network
cost: ~$300-$1,200
tags:
- hardware
- foundry
- physical-ai
- obsidian-arc
- safety-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Safety Hardware
cost_low: 300
division: Obsidian Arc
cost_high: 1200
form_factor: safety hardware
division_status: operating
---
# Workshop E-Stop Network

**Safety Hardware** in the Obsidian Arc set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Obsidian Arc Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Safety Hardware |
| Form factor | safety hardware |
| Budget | ~$300-$1,200 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Distributed emergency stop buttons for robots, drones, printers, and motion test benches.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Industrial e-stop switches | — |
| relay modules | — |
| Pi/ESP32 monitor | — |
| indicator lights | — |
| fused wiring | — |

Budget for the full item: **~$300-$1,200**.

## Specs

- Form factor: safety hardware
- Placement: Every robotics/fabrication zone.
- Industrial design: Orange emergency hardware with black labels.

## Software stack and signals

Signals / outputs: Aegis-Hold safety log, Binary Loom bench control.

Related systems: [[Aegis Protocol]]

Cross-division handoffs: [[Binary Loom Division]]

## Placement and agents

Placement: Every robotics/fabrication zone.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Obsidian_Arc]].

## Governance

> [!warning] Safety gate
> Hardwired stop path independent of software.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
