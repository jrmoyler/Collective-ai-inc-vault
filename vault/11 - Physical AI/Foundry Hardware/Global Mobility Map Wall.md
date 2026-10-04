---
title: Global Mobility Map Wall
cost: ~$300-$900
tags:
- hardware
- foundry
- physical-ai
- nomad-nexus
- display-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Display Hardware
cost_low: 300
division: Nomad Nexus
cost_high: 900
form_factor: display hardware
division_status: chartered
---
# Global Mobility Map Wall

**Display Hardware** in the Nomad Nexus set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nomad Nexus Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Display Hardware |
| Form factor | display hardware |
| Budget | ~$300-$900 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Wall map showing travel zones, client sites, available hubs, visa status, and field-kit readiness.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| large display/LED map | — |
| NFC destination cards | — |

Budget for the full item: **~$300-$900**.

## Specs

- Form factor: display hardware
- Placement: Ops room or showroom.
- Industrial design: Sand globe grid and route lines.

## Software stack and signals

Signals / outputs: Nomad Nexus platform, Terra/Aether feeds.

Related systems: [[Nomad Nexus Platform]]

Cross-division handoffs: [[Aether Link Division]], [[Terra Axis Division]]

## Placement and agents

Placement: Ops room or showroom.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nomad_Nexus]].

## Governance

> [!warning] Safety gate
> No personal travel data public by default.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
