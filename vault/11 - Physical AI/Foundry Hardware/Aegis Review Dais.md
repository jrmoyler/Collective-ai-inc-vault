---
title: Aegis Review Dais
cost: ~$220-$550
tags:
- hardware
- foundry
- physical-ai
- juris-guard
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 220
division: Juris Guard
cost_high: 550
form_factor: control panel
division_status: operating
---
# Aegis Review Dais

**Control Panel** in the Juris Guard set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Juris Guard Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$220-$550 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Formal review console for accept/reject/escalate decisions on regulated outputs.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| keyed buttons | — |
| NFC reviewer login | — |
| small display | — |
| haptic feedback | — |

Budget for the full item: **~$220-$550**.

## Specs

- Form factor: control panel
- Placement: Governance desk.
- Industrial design: Indigo console with gavel-button motif.

## Software stack and signals

Signals / outputs: Aegis Review, Juris Guard, ZENITH.

Related systems: [[ZENITH]], [[Aegis Protocol]]

## Placement and agents

Placement: Governance desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Juris_Guard]].

## Governance

> [!warning] Safety gate
> All decisions logged and immutable.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: legal data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
