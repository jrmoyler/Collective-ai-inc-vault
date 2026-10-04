---
title: Voice Dataset Booth
cost: ~$350-$900
tags:
- hardware
- foundry
- physical-ai
- nexus-labs
- studio-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Studio Fixture
cost_low: 350
division: Nexus Labs
cost_high: 900
form_factor: studio fixture
division_status: operating
---
# Voice Dataset Booth

**Studio Fixture** in the Nexus Labs set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nexus Labs Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Studio Fixture |
| Form factor | studio fixture |
| Budget | ~$350-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Small acoustic capture booth for voice AI training, narration, and brand audio datasets.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ReSpeaker mic | — |
| Pi/Jetson processor | — |
| acoustic foam shell | — |
| Whisplay | — |
| speaker | — |
| NVMe | — |

Budget for the full item: **~$350-$900**.

## Specs

- Form factor: studio fixture
- Placement: Desk booth or standing booth insert.
- Industrial design: Crimson acoustic panels with dark trim.

## Software stack and signals

Signals / outputs: Voice dataset pipeline, transcript and metadata archive.

## Placement and agents

Placement: Desk booth or standing booth insert.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nexus_Labs]].

## Governance

> [!warning] Safety gate
> Explicit performer release required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
