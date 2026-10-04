---
title: Launch Countdown Object
cost: ~$150-$450
tags:
- hardware
- foundry
- physical-ai
- signal-velocity
- showroom-hardware
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Showroom Hardware
cost_low: 150
division: Signal Velocity
cost_high: 450
form_factor: showroom hardware
division_status: operating
---
# Launch Countdown Object

**Showroom Hardware** in the Signal Velocity set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Signal Velocity Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Showroom Hardware |
| Form factor | showroom hardware |
| Budget | ~$150-$450 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical countdown and launch-state object for campaign sprints, drops, and live activations.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5/ESP32 | — |
| LED digits | — |
| speaker | — |
| buttons | — |
| BLE receiver | — |

Budget for the full item: **~$150-$450**.

## Specs

- Form factor: showroom hardware
- Placement: War room or studio.
- Industrial design: Conversion-coral timer with dark base.

## Software stack and signals

Signals / outputs: Signal Velocity campaign calendar, Slack, analytics.

## Placement and agents

Placement: War room or studio.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Signal_Velocity]].

## Governance

> [!warning] Safety gate
> No auto-publish from timer.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
