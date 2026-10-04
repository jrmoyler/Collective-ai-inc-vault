---
title: Instructor Teleprompter Rail
cost: ~$180-$450
tags:
- hardware
- foundry
- physical-ai
- hybrid-living
- capture-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Capture Fixture
cost_low: 180
division: Hybrid Living
cost_high: 450
form_factor: capture fixture
division_status: operating
---
# Instructor Teleprompter Rail

**Capture Fixture** in the Hybrid Living set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Hybrid Living Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Capture Fixture |
| Form factor | capture fixture |
| Budget | ~$180-$450 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Camera/display rail for clean lesson capture, pacing, and auto-generated study guides.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Pi Camera 3 Wide | — |
| small display | — |
| ReSpeaker mic | — |
| printed rail mount | — |

Budget for the full item: **~$180-$450**.

## Specs

- Form factor: capture fixture
- Placement: Tripod or desk rail.
- Industrial design: Dark rail with amber progress marks.

## Software stack and signals

Signals / outputs: Instructor capture workflow, transcript generator.

## Placement and agents

Placement: Tripod or desk rail.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Hybrid_Living]].

## Governance

> [!warning] Safety gate
> Visible recording indicator required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
