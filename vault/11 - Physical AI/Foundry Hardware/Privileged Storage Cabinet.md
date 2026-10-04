---
title: Privileged Storage Cabinet
cost: ~$400-$1,200
tags:
- hardware
- foundry
- physical-ai
- juris-guard
- secure-storage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Secure Storage
cost_low: 400
division: Juris Guard
cost_high: 1200
form_factor: secure storage
division_status: operating
---
# Privileged Storage Cabinet

**Secure Storage** in the Juris Guard set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Juris Guard Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Secure Storage |
| Form factor | secure storage |
| Budget | ~$400-$1,200 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Encrypted-drive and document storage cabinet with custody logging.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Locking cabinet | — |
| NFC reader | — |
| tamper sensor | — |
| Pi scanner | — |
| environmental sensor | — |

Budget for the full item: **~$400-$1,200**.

## Specs

- Form factor: secure storage
- Placement: Secure legal room.
- Industrial design: Indigo labels and gold seal plates.

## Software stack and signals

Signals / outputs: Juris custody log, Obsidian Arc.

Cross-division handoffs: [[Obsidian Arc Division]]

## Placement and agents

Placement: Secure legal room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Juris_Guard]].

## Governance

> [!warning] Safety gate
> Physical access approval required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: legal data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
