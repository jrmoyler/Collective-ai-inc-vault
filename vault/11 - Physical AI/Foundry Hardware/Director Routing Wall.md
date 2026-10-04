---
title: Director Routing Wall
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- zenflow
- showroom-display
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Showroom Display
cost_low: 300
division: ZenFlow
cost_high: 900
form_factor: showroom display
division_status: operating
---
# Director Routing Wall

**Showroom Display** in the ZenFlow set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Showroom Display |
| Form factor | showroom display |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall board showing 20 director agents, queue load, and active cross-division routes.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| large display or LED tile grid | — |
| NFC division tiles | — |
| wall enclosure | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: showroom display
- Placement: Operations room wall.
- Industrial design: Dark grid with violet division paths.

## Software stack and signals

Signals / outputs: ZenFlow router, OpenTelemetry, Knowledge Keeper.

Related systems: [[Knowledge Keeper]], [[Observability Stack]]

## Placement and agents

Placement: Operations room wall.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_ZenFlow]].

## Governance

> [!warning] Safety gate
> No sensitive prompt text displayed by default.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
