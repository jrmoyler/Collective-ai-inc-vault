---
title: Perimeter Motion Stake
cost: ~$90-$250 each
tags:
- hardware
- foundry
- physical-ai
- obsidian-arc
- outdoor-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Outdoor Fixture
cost_low: 90
division: Obsidian Arc
cost_high: 250
form_factor: outdoor fixture
division_status: operating
---
# Perimeter Motion Stake

**Outdoor Fixture** in the Obsidian Arc set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Obsidian Arc Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Outdoor Fixture |
| Form factor | outdoor fixture |
| Budget | ~$90-$250 each (per unit) |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Outdoor motion and mesh stake for yards, entrances, drone zones, and equipment bays.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| PIR/mmWave sensor | — |
| LILYGO T-Beam | — |
| battery/solar | — |
| waterproof ASA enclosure | — |

Budget for the full item: **~$90-$250 each** (per unit).

## Specs

- Form factor: outdoor fixture
- Placement: Outdoor stake or wall mount.
- Industrial design: Orange heat-signature mark on rugged black case.

## Software stack and signals

Signals / outputs: Obsidian perimeter workflow, Aether mesh.

Cross-division handoffs: [[Aether Link Division]]

## Placement and agents

Placement: Outdoor stake or wall mount.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Obsidian_Arc]].

## Governance

> [!warning] Safety gate
> Privacy zones and signage required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
