---
title: Translation Booth Core
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- aether-link
- audio-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Audio Fixture
cost_low: 300
division: Aether Link
cost_high: 900
form_factor: audio fixture
division_status: chartered
---
# Translation Booth Core

**Audio Fixture** in the Aether Link set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Audio Fixture |
| Form factor | audio fixture |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Small table/booth hardware for live translation sessions and bilingual service support.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5/Jetson | — |
| ReSpeaker mic | — |
| speakers/headphone jack | — |
| display | — |
| buttons | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: audio fixture
- Placement: Service desk or classroom.
- Industrial design: Mint signal-ring display.

## Software stack and signals

Signals / outputs: Babel AI workflow, Knowledge Keeper.

Related systems: [[Knowledge Keeper]], [[Babel AI]]

## Placement and agents

Placement: Service desk or classroom.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Aether_Link]].

## Governance

> [!warning] Safety gate
> Human review for sensitive interpretation.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
