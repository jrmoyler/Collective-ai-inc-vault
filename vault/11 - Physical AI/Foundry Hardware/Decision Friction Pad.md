---
title: Decision Friction Pad
cost: ~$180-$450
tags:
- hardware
- foundry
- physical-ai
- cognara-mind
- control-surface
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Surface
cost_low: 180
division: Cognara Mind
cost_high: 450
form_factor: control surface
division_status: chartered
---
# Decision Friction Pad

**Control Surface** in the Cognara Mind set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Control Surface |
| Form factor | control surface |
| Budget | ~$180-$450 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Tactile pad for pausing impulsive decisions, scoring options, and triggering review workflows.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| haptic buttons | — |
| rotary selector | — |
| LED states | — |
| NFC user key | — |

Budget for the full item: **~$180-$450**.

## Specs

- Form factor: control surface
- Placement: Desk.
- Industrial design: Rose controls with clear friction states.

## Software stack and signals

Signals / outputs: Cognara decision workflow, ZenFlow, Juris/Quantum handoff when needed.

Cross-division handoffs: [[Juris Guard Division]], [[Quantum Ledger Division]], [[ZenFlow Division]]

## Placement and agents

Placement: Desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Cognara_Mind]].

## Governance

> [!warning] Safety gate
> Advisory tool only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: behavioral data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
