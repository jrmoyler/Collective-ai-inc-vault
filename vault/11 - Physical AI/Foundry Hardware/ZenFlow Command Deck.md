---
title: ZenFlow Command Deck
cost: ~$220-$520
tags:
- hardware
- foundry
- physical-ai
- zenflow
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 220
division: ZenFlow
cost_high: 520
form_factor: control panel
division_status: operating
---
# ZenFlow Command Deck

**Control Panel** in the ZenFlow set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[ZenFlow Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$220-$520 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Tactile workflow controller for routing prompts, switching agents, and launching common automations.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| macro keypad/rotary encoders | — |
| Whisplay HAT | — |
| ReSpeaker 2-Mics | — |
| haptic click motor | — |
| NVMe | — |

Budget for the full item: **~$220-$520**.

## Specs

- Form factor: control panel
- Placement: Desk or rack-console mount.
- Industrial design: Neural violet deck with electric-blue route lights.

## Software stack and signals

Signals / outputs: ZENITH router, n8n workflows, Redis queues, Knowledge Keeper.

Related systems: [[Knowledge Keeper]], [[ZENITH]], [[n8n Workflow Blueprint]]

## Placement and agents

Placement: Desk or rack-console mount.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_ZenFlow]].

## Governance

> [!warning] Safety gate
> Approval workflows cannot be bypassed.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
