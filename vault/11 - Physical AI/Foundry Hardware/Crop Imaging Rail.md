---
title: Crop Imaging Rail
cost: ~$250-$650
tags:
- hardware
- foundry
- physical-ai
- gaia-synthesis
- camera-rig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Camera Rig
cost_low: 250
division: Gaia Synthesis
cost_high: 650
form_factor: camera rig
division_status: chartered
---
# Crop Imaging Rail

**Camera Rig** in the Gaia Synthesis set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Gaia Synthesis Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Camera Rig |
| Form factor | camera rig |
| Budget | ~$250-$650 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Sliding or fixed rail for repeatable plant growth images and anomaly detection.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Pi Camera 3 or AI Camera | — |
| LED grow-safe lighting | — |
| rail mounts | — |
| NVMe | — |

Budget for the full item: **~$250-$650**.

## Specs

- Form factor: camera rig
- Placement: Greenhouse bench.
- Industrial design: Green rail with blue measurement ticks.

## Software stack and signals

Signals / outputs: Gaia image archive, plant tagging agent.

## Placement and agents

Placement: Greenhouse bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Gaia_Synthesis]].

## Governance

> [!warning] Safety gate
> Lighting and privacy safe.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
