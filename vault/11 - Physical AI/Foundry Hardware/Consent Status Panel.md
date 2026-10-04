---
title: Consent Status Panel
cost: ~$120-$300
tags:
- hardware
- foundry
- physical-ai
- vital-helix
- smart-signage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Signage
cost_low: 120
division: Vital Helix
cost_high: 300
form_factor: smart signage
division_status: chartered
---
# Consent Status Panel

**Smart Signage** in the Vital Helix set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Vital Helix Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Smart Signage |
| Form factor | smart signage |
| Budget | ~$120-$300 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Room panel showing consent state, capture state, and privacy mode for wellness sessions.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi/e-ink display | — |
| RGB strip | — |
| NFC staff card reader | — |
| wall mount | — |

Budget for the full item: **~$120-$300**.

## Specs

- Form factor: smart signage
- Placement: Clinic door/wall.
- Industrial design: Teal panel with plain-language status.

## Software stack and signals

Signals / outputs: Vital intake workflow, Juris Guard policy.

Cross-division handoffs: [[Juris Guard Division]]

## Placement and agents

Placement: Clinic door/wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Vital_Helix]].

## Governance

> [!warning] Safety gate
> No capture unless consent active.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
