---
title: Pop-Up Office Desk Insert
cost: ~$300-$800
tags:
- hardware
- foundry
- physical-ai
- nomad-nexus
- smart-furniture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Furniture
cost_low: 300
division: Nomad Nexus
cost_high: 800
form_factor: smart furniture
division_status: chartered
---
# Pop-Up Office Desk Insert

**Smart Furniture** in the Nomad Nexus set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nomad Nexus Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Smart Furniture |
| Form factor | smart furniture |
| Budget | ~$300-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable desk insert for nomad work sessions with power, mic, display, and workflow buttons.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Whisplay | — |
| ReSpeaker mic | — |
| USB-C hub | — |
| battery | — |
| foldable printed shell | — |

Budget for the full item: **~$300-$800**.

## Specs

- Form factor: smart furniture
- Placement: Co-working space, hotel, field desk.
- Industrial design: Sand-gold edge with dark portable shell.

## Software stack and signals

Signals / outputs: Nomad session workflow, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Co-working space, hotel, field desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nomad_Nexus]].

## Governance

> [!warning] Safety gate
> Client data stays on approved storage.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
