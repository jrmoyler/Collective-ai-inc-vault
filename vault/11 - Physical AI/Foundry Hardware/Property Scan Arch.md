---
title: Property Scan Arch
cost: ~$300-$700
tags:
- hardware
- foundry
- physical-ai
- terra-axis
- camera-rig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Camera Rig
cost_low: 300
division: Terra Axis
cost_high: 700
form_factor: camera rig
division_status: chartered
---
# Property Scan Arch

**Camera Rig** in the Terra Axis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Terra Axis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Camera Rig |
| Form factor | camera rig |
| Budget | ~$300-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Overhead/portable arch for scanning floor plans, closing packets, blueprints, and property documents.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Arducam 64MP | — |
| LED light bar | — |
| NVMe | — |
| printed document arch | — |

Budget for the full item: **~$300-$700**.

## Specs

- Form factor: camera rig
- Placement: Office desk or inspection prep bench.
- Industrial design: Infrastructure-blue arch with blueprint grid.

## Software stack and signals

Signals / outputs: Terra Vision, OCR, Juris Guard handoff.

Related systems: [[Terra Vision]]

Cross-division handoffs: [[Juris Guard Division]]

## Placement and agents

Placement: Office desk or inspection prep bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Terra_Axis]].

## Governance

> [!warning] Safety gate
> Client document handling rules apply.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
