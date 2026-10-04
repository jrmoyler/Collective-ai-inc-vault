---
title: Cable Harness Board
cost: ~$120-$350
tags:
- hardware
- foundry
- physical-ai
- binary-loom
- assembly-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Assembly Fixture
cost_low: 120
division: Binary Loom
cost_high: 350
form_factor: assembly fixture
division_status: operating
---
# Cable Harness Board

**Assembly Fixture** in the Binary Loom set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Assembly Fixture |
| Form factor | assembly fixture |
| Budget | ~$120-$350 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Pegboard-style wiring fixture for repeatable JST/Dupont/XT30/XT60 harness assembly.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Printed peg board | — |
| wire guides | — |
| ferrule tools | — |
| continuity tester | — |
| label printer integration | — |

Budget for the full item: **~$120-$350**.

## Specs

- Form factor: assembly fixture
- Placement: Wire bench.
- Industrial design: Teal wire lanes and dark plate.

## Software stack and signals

Signals / outputs: BOM registry, QA checklist.

## Placement and agents

Placement: Wire bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Binary_Loom]].

## Governance

> [!warning] Safety gate
> Continuity test before install.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
