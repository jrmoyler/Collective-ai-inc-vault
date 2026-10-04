---
title: Ad Creative Review Pad
cost: ~$180-$420
tags:
- hardware
- foundry
- physical-ai
- signal-velocity
- control-surface
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Surface
cost_low: 180
division: Signal Velocity
cost_high: 420
form_factor: control surface
division_status: operating
---
# Ad Creative Review Pad

**Control Surface** in the Signal Velocity set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Surface |
| Form factor | control surface |
| Budget | ~$180-$420 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Desktop pad for rating hooks, thumbnails, CTAs, and ad variations during review.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| score buttons | — |
| rotary encoder | — |
| haptic | — |
| NFC reviewer ID | — |

Budget for the full item: **~$180-$420**.

## Specs

- Form factor: control surface
- Placement: Marketing desk.
- Industrial design: Coral buttons with play icons.

## Software stack and signals

Signals / outputs: Creative review workflow, Airtable/Notion.

## Placement and agents

Placement: Marketing desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Signal_Velocity]].

## Governance

> [!warning] Safety gate
> No public claims without review.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
