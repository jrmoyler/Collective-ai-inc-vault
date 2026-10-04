---
title: Bio Archive Cabinet
cost: ~$400-$1,200
tags:
- hardware
- foundry
- physical-ai
- eon-core
- secure-storage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Secure Storage
cost_low: 400
division: Eon Core
cost_high: 1200
form_factor: secure storage
division_status: chartered
---
# Bio Archive Cabinet

**Secure Storage** in the Eon Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Eon Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Secure Storage |
| Form factor | secure storage |
| Budget | ~$400-$1,200 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Encrypted local storage cabinet for longevity data exports, research packets, and family archives.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Locking cabinet | — |
| NFC reader | — |
| Pi scanner | — |
| environmental sensor | — |
| drive slots | — |

Budget for the full item: **~$400-$1,200**.

## Specs

- Form factor: secure storage
- Placement: Secure archive room.
- Industrial design: Aqua labels with hourglass motif.

## Software stack and signals

Signals / outputs: Eon Core archive, Juris Guard.

Cross-division handoffs: [[Juris Guard Division]]

## Placement and agents

Placement: Secure archive room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Eon_Core]].

## Governance

> [!warning] Safety gate
> Sensitive data encrypted and access-controlled.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
