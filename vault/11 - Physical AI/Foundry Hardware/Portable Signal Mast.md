---
title: Portable Signal Mast
cost: ~$250-$800
tags:
- hardware
- foundry
- physical-ai
- aether-link
- field-infrastructure
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Field Infrastructure
cost_low: 250
division: Aether Link
cost_high: 800
form_factor: field infrastructure
division_status: chartered
---
# Portable Signal Mast

**Field Infrastructure** in the Aether Link set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Aether Link Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Field Infrastructure |
| Form factor | field infrastructure |
| Budget | ~$250-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Collapsible mast for LoRa/Wi-Fi relay testing, field demos, and temporary coverage.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Tripod mast | — |
| LILYGO T-Beam | — |
| directional antenna | — |
| battery/solar input | — |
| waterproof enclosure | — |

Budget for the full item: **~$250-$800**.

## Specs

- Form factor: field infrastructure
- Placement: Yard, field, roof, event.
- Industrial design: Mint signal bands and rugged black mount.

## Software stack and signals

Signals / outputs: Aether mesh relay, field status dashboard.

## Placement and agents

Placement: Yard, field, roof, event.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Aether_Link]].

## Governance

> [!warning] Safety gate
> RF/power safety and local rules.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Power: fire-safe charging, thermal monitoring where possible, labeled storage.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
