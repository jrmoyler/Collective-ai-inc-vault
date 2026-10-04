---
title: Reflection Recording Stand
cost: ~$250-$650
tags:
- hardware
- foundry
- physical-ai
- eon-core
- audio-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Audio Fixture
cost_low: 250
division: Eon Core
cost_high: 650
form_factor: audio fixture
division_status: chartered
---
# Reflection Recording Stand

**Audio Fixture** in the Eon Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Eon Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Audio Fixture |
| Form factor | audio fixture |
| Budget | ~$250-$650 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Visible story-capture stand for interviews, legacy notes, and guided life-review sessions.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| ReSpeaker mic | — |
| Whisplay consent display | — |
| speaker | — |
| NVMe | — |

Budget for the full item: **~$250-$650**.

## Specs

- Form factor: audio fixture
- Placement: Reflection room.
- Industrial design: Aqua stand with soft halo.

## Software stack and signals

Signals / outputs: Wisdom Vault, transcription workflow.

## Placement and agents

Placement: Reflection room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Eon_Core]].

## Governance

> [!warning] Safety gate
> Consent before capture.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
