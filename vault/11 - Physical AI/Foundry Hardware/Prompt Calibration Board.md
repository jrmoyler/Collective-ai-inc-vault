---
title: Prompt Calibration Board
cost: ~$220-$500
tags:
- hardware
- foundry
- physical-ai
- zenflow
- test-jig
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Test Jig
cost_low: 220
division: ZenFlow
cost_high: 500
form_factor: test jig
division_status: operating
---
# Prompt Calibration Board

**Test Jig** in the ZenFlow set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Test Jig |
| Form factor | test jig |
| Budget | ~$220-$500 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Fixture for testing mics, buttons, haptics, and prompt-capture latency on new shells.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Whisplay | — |
| speaker | — |
| calibration mic | — |
| haptic pad | — |
| USB test harness | — |

Budget for the full item: **~$220-$500**.

## Specs

- Form factor: test jig
- Placement: Electronics bench.
- Industrial design: Violet board with numbered test stations.

## Software stack and signals

Signals / outputs: ZenFlow shell QA workflow, Binary Loom test logs.

Cross-division handoffs: [[Binary Loom Division]]

## Placement and agents

Placement: Electronics bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_ZenFlow]].

## Governance

> [!warning] Safety gate
> No production credentials on test jig.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
