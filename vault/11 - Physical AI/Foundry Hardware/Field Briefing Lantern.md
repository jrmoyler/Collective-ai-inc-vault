---
title: Field Briefing Lantern
cost: ~$120-$350
tags:
- hardware
- foundry
- physical-ai
- nomad-nexus
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 120
division: Nomad Nexus
cost_high: 350
form_factor: environmental fixture
division_status: chartered
---
# Field Briefing Lantern

**Environmental Fixture** in the Nomad Nexus set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nomad Nexus Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$120-$350 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Portable lantern/display that gives camp, site, or demo status without becoming a terminal.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| LED diffuser | — |
| small e-ink status strip | — |
| battery | — |
| LoRa receive | — |

Budget for the full item: **~$120-$350**.

## Specs

- Form factor: environmental fixture
- Placement: Field table or campsite.
- Industrial design: Warm sand light with black enclosure.

## Software stack and signals

Signals / outputs: Aether mesh, Nomad field workflow.

Cross-division handoffs: [[Aether Link Division]]

## Placement and agents

Placement: Field table or campsite.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nomad_Nexus]].

## Governance

> [!warning] Safety gate
> Information display only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
