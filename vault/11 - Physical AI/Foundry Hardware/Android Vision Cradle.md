---
title: Android Vision Cradle
cost: ~$700-$1,800
tags:
- hardware
- foundry
- physical-ai
- animus-prime
- camera-rig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Camera Rig
cost_low: 700
division: Animus Prime
cost_high: 1800
form_factor: camera rig
division_status: chartered
---
# Android Vision Cradle

**Camera Rig** in the Animus Prime set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Animus Prime Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Camera Rig |
| Form factor | camera rig |
| Budget | ~$700-$1,800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Stationary head/torso cradle for camera, mic, depth sensor, and gaze-behavior testing.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Jetson Orin Nano | — |
| OAK-D/RealSense | — |
| ReSpeaker mic | — |
| speakers | — |
| printed neck/head mount | — |

Budget for the full item: **~$700-$1,800**.

## Specs

- Form factor: camera rig
- Placement: Robotics lab.
- Industrial design: Cyan shell with black service panels.

## Software stack and signals

Signals / outputs: Animus perception, social interaction tests.

## Placement and agents

Placement: Robotics lab.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Animus_Prime]].

## Governance

> [!warning] Safety gate
> No autonomous mobility attached.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
