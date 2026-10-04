---
title: Podcast Table Core
cost: ~$250-$650
tags:
- hardware
- foundry
- physical-ai
- nexus-labs
- audio-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Audio Fixture
cost_low: 250
division: Nexus Labs
cost_high: 650
form_factor: audio fixture
division_status: operating
---
# Podcast Table Core

**Audio Fixture** in the Nexus Labs set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nexus Labs Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Audio Fixture |
| Form factor | audio fixture |
| Budget | ~$250-$650 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Center-table audio object for recording control, speaker ID, session markers, and haptic buttons.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| ReSpeaker 4-Mic Array | — |
| speaker bonnet | — |
| tactile buttons | — |
| NVMe | — |
| LED ring | — |

Budget for the full item: **~$250-$650**.

## Specs

- Form factor: audio fixture
- Placement: Podcast table center.
- Industrial design: Crimson record ring on dark wedge body.

## Software stack and signals

Signals / outputs: Nexus recording workflow, NAS media archive.

## Placement and agents

Placement: Podcast table center.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nexus_Labs]].

## Governance

> [!warning] Safety gate
> Visible recording state.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
