---
title: Aegis Lockbox
cost: ~$250-$800
tags:
- hardware
- foundry
- physical-ai
- obsidian-arc
- secure-storage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Secure Storage
cost_low: 250
division: Obsidian Arc
cost_high: 800
form_factor: secure storage
division_status: operating
---
# Aegis Lockbox

**Secure Storage** in the Obsidian Arc set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Obsidian Arc Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Secure Storage |
| Form factor | secure storage |
| Budget | ~$250-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Lockbox for sensitive drives, prototypes, client media, and legal artifacts with audit check-in.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Fire-resistant box | — |
| NFC reader | — |
| Pi 5 scanner | — |
| tamper switch | — |
| environmental sensor | — |

Budget for the full item: **~$250-$800**.

## Specs

- Form factor: secure storage
- Placement: Secure hardware room.
- Industrial design: Threat-orange labels on black steel.

## Software stack and signals

Signals / outputs: Obsidian audit, Juris Guard chain log.

Cross-division handoffs: [[Juris Guard Division]]

## Placement and agents

Placement: Secure hardware room.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Obsidian_Arc]].

## Governance

> [!warning] Safety gate
> Manual key override and access log required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
