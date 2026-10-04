---
title: Agent Eval Light Rail
cost: ~$80-$220
tags:
- hardware
- foundry
- physical-ai
- zenflow
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 80
division: ZenFlow
cost_high: 220
form_factor: environmental fixture
division_status: operating
---
# Agent Eval Light Rail

**Environmental Fixture** in the ZenFlow set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$80-$220 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

LED rail showing eval queue, pass/fail, regression failures, and quarantine status.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi Pico | — |
| addressable LEDs | — |
| Pi 5 gateway | — |
| 3D printed rail clips | — |

Budget for the full item: **~$80-$220**.

## Specs

- Form factor: environmental fixture
- Placement: Above engineering bench or sandbox rack.
- Industrial design: Violet/blue light segments with clear labels.

## Software stack and signals

Signals / outputs: Agent eval bench, CI worker, Aegis-Hold queue.

Related systems: [[Aegis Protocol]]

## Placement and agents

Placement: Above engineering bench or sandbox rack.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_ZenFlow]].

## Governance

> [!warning] Safety gate
> Display-only; eval decisions remain logged in software.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
