---
title: Cognitive Research Shelf
cost: ~$250-$750
tags:
- hardware
- foundry
- physical-ai
- cognara-mind
- storage-system
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Storage System
cost_low: 250
division: Cognara Mind
cost_high: 750
form_factor: storage system
division_status: chartered
---
# Cognitive Research Shelf

**Storage System** in the Cognara Mind set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Storage System |
| Form factor | storage system |
| Budget | ~$250-$750 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

NFC/QR shelf for tests, cards, study devices, consent packets, and research artifacts.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi scanner | — |
| NFC labels | — |
| environmental sensor | — |
| display | — |
| lockable bins | — |

Budget for the full item: **~$250-$750**.

## Specs

- Form factor: storage system
- Placement: Research room.
- Industrial design: Rose labels and shield motifs.

## Software stack and signals

Signals / outputs: Cognara research registry, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Research room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Cognara_Mind]].

## Governance

> [!warning] Safety gate
> Consent packets stored securely.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: behavioral data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
