---
title: Robot E-Stop Pedestal
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- animus-prime
- safety-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Safety Hardware
cost_low: 250
division: Animus Prime
cost_high: 700
form_factor: safety hardware
division_status: chartered
---
# Robot E-Stop Pedestal

**Safety Hardware** in the Animus Prime set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Animus Prime Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Safety Hardware |
| Form factor | safety hardware |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Dedicated physical pedestal containing e-stop, mode selector, run light, and reset procedure card.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Industrial e-stop | — |
| keyed selector | — |
| relay box | — |
| Pi monitor | — |
| beacon light | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: safety hardware
- Placement: Beside robot test zone.
- Industrial design: Cyan/orange safety pedestal.

## Software stack and signals

Signals / outputs: Aegis-Hold, Obsidian safety log.

Related systems: [[Aegis Protocol]]

Cross-division handoffs: [[Obsidian Arc Division]]

## Placement and agents

Placement: Beside robot test zone.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Animus_Prime]].

## Governance

> [!warning] Safety gate
> Hardware stop overrides software.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
