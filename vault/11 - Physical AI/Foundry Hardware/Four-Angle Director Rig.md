---
title: Four-Angle Director Rig
cost: ~$650-$1,000
tags:
- hardware
- foundry
- physical-ai
- nexus-labs
- camera-rig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Camera Rig
cost_low: 650
division: Nexus Labs
cost_high: 1000
form_factor: camera rig
division_status: operating
---
# Four-Angle Director Rig

**Camera Rig** in the Nexus Labs set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nexus Labs Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Camera Rig |
| Form factor | camera rig |
| Budget | ~$650-$1,000 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable multi-camera rig for interviews, courses, vertical clips, and scene tagging.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 controllers | 2 |
| Pi Camera 3 | 2 |
| Arducam 64MP | — |
| Pi AI Camera | — |
| Jetson Orin Nano | — |
| NVMe | — |

Budget for the full item: **~$650-$1,000**.

## Specs

- Form factor: camera rig
- Placement: Tripod/desk multi-mount.
- Industrial design: Crimson clamp labels and black frame.

## Software stack and signals

Signals / outputs: Vision Director workflow, media tagging, NAS archive.

## Placement and agents

Placement: Tripod/desk multi-mount.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nexus_Labs]].

## Governance

> [!warning] Safety gate
> Subject consent and release workflow.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
