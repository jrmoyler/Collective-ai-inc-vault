---
title: Knowledge Keeper Archive Pedestal
cost: ~$180-$450
tags:
- hardware
- foundry
- physical-ai
- zenflow
- storage-display-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Storage/Display Fixture
cost_low: 180
division: ZenFlow
cost_high: 450
form_factor: storage/display fixture
division_status: operating
---
# Knowledge Keeper Archive Pedestal

**Storage/Display Fixture** in the ZenFlow set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Storage/Display Fixture |
| Form factor | storage/display fixture |
| Budget | ~$180-$450 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical pedestal for hot-swappable export drives and log review artifacts.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Drive dock | — |
| Pi 5 | — |
| small e-ink/OLED label | — |
| NFC asset tag reader | — |
| lockable printed tray | — |

Budget for the full item: **~$180-$450**.

## Specs

- Form factor: storage/display fixture
- Placement: Secure shelf or archive cabinet.
- Industrial design: Violet archive accents and teal checksum indicator.

## Software stack and signals

Signals / outputs: NAS archive, Knowledge Keeper, privacy scrub workflow.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Secure shelf or archive cabinet.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_ZenFlow]].

## Governance

> [!warning] Safety gate
> Encrypted drives only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
