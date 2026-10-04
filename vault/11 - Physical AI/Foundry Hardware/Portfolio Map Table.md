---
title: Portfolio Map Table
cost: ~$350-$800
tags:
- hardware
- foundry
- physical-ai
- parent-company
- showroom-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Showroom Hardware
cost_low: 350
division: Collective AI Inc (Parent Company)
cost_high: 800
form_factor: showroom hardware
division_status: parent company
---
# Portfolio Map Table

**Showroom Hardware** in the parent company set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | Collective AI Inc (Parent Company), see [[Collective AI — Company Charter]] |
| Category | Showroom Hardware |
| Form factor | showroom hardware |
| Budget | ~$350-$800 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Tactile tabletop map of 20 divisions and 20 synergy nodes with LED build-status indicators.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| LED matrix/NeoPixels | — |
| NFC tags per division tile | — |
| acrylic top | — |
| Bambu/Prusa printed base | — |

Budget for the full item: **~$350-$800**.

## Specs

- Form factor: showroom hardware
- Placement: Conference/demo room centerpiece.
- Industrial design: Dark table insert with gold division lanes and teal live dots.

## Software stack and signals

Signals / outputs: ZenFlow status feed, product registry, investor demo mode.

Cross-division handoffs: [[ZenFlow Division]]

## Placement and agents

Placement: Conference/demo room centerpiece.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Parent-level hardware. Executive routing goes through [[ZENITH]].

## Governance

> [!warning] Safety gate
> Demo surface only; no control of production systems.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: parent palette (Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver).

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
