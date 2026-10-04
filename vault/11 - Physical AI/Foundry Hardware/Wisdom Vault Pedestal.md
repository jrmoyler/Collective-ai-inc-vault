---
title: Wisdom Vault Pedestal
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- eon-core
- showroom-storage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Showroom/Storage
cost_low: 300
division: Eon Core
cost_high: 900
form_factor: showroom/storage
division_status: chartered
---
# Wisdom Vault Pedestal

**Showroom/Storage** in the Eon Core set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Eon Core Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Showroom/Storage |
| Form factor | showroom/storage |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical pedestal for story capture artifacts, legacy drives, and memory-session status.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| encrypted drive dock | — |
| NFC cards | — |
| soft light ring | — |
| small display | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: showroom/storage
- Placement: Reflection room or studio.
- Industrial design: Longevity-aqua light ring with dark pedestal.

## Software stack and signals

Signals / outputs: Eon Wisdom Vault, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Reflection room or studio.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Eon_Core]].

## Governance

> [!warning] Safety gate
> Consent and inheritance controls required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: health data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
