---
title: Policy Wall Ledger
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- juris-guard
- smart-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Display
cost_low: 250
division: Juris Guard
cost_high: 700
form_factor: smart display
division_status: operating
---
# Policy Wall Ledger

**Smart Display** in the Juris Guard set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Juris Guard Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Smart Display |
| Form factor | smart display |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall display for policy status, active holds, deadline warnings, and review queues.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| display | — |
| NFC policy cards | — |
| status lights | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: smart display
- Placement: Legal ops wall.
- Industrial design: Indigo grid with document columns.

## Software stack and signals

Signals / outputs: Juris Guard policy tracker, ZenFlow.

Cross-division handoffs: [[ZenFlow Division]]

## Placement and agents

Placement: Legal ops wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Juris_Guard]].

## Governance

> [!warning] Safety gate
> Sensitive matters hidden by default.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: legal data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
