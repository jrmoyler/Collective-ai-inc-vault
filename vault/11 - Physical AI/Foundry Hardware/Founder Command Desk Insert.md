---
title: Founder Command Desk Insert
cost: ~$300-$700
tags:
- hardware
- foundry
- physical-ai
- parent-company
- smart-furniture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Smart Furniture
cost_low: 300
division: Collective AI Inc (Parent Company)
cost_high: 700
form_factor: smart furniture
division_status: parent company
---
# Founder Command Desk Insert

**Smart Furniture** in the parent company set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | Collective AI Inc (Parent Company), see [[Collective AI — Company Charter]] |
| Category | Smart Furniture |
| Form factor | smart furniture |
| Budget | ~$300-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Built-in desk panel with buttons, mic, display, and status lights for executive workflows.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Whisplay HAT | — |
| ReSpeaker mic | — |
| Stream Deck-style buttons | — |
| speaker bonnet | — |
| NVMe | — |
| USB-C hub | — |

Budget for the full item: **~$300-$700**.

## Specs

- Form factor: smart furniture
- Placement: Flush-mounted or removable desk insert.
- Industrial design: Obsidian surface with gold control strip and teal live status.

## Software stack and signals

Signals / outputs: ZENITH, Aegis, calendar, division dashboards.

Related systems: [[ZENITH]], [[Aegis Protocol]]

## Placement and agents

Placement: Flush-mounted or removable desk insert.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Parent-level hardware. Executive routing goes through [[ZENITH]].

## Governance

> [!warning] Safety gate
> Destructive actions require on-screen confirmation.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: parent palette (Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver).

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
