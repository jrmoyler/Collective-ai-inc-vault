---
title: Clip Mining Control Pad
cost: ~$180-$420
tags:
- hardware
- foundry
- physical-ai
- nexus-labs
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 180
division: Nexus Labs
cost_high: 420
form_factor: control panel
division_status: operating
---
# Clip Mining Control Pad

**Control Panel** in the Nexus Labs set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Nexus Labs Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$180-$420 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Editing control pad for marking hooks, quotes, b-roll, captions, and repurpose candidates.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| macro buttons | — |
| rotary encoder | — |
| haptic | — |
| small display | — |

Budget for the full item: **~$180-$420**.

## Specs

- Form factor: control panel
- Placement: Editor desk.
- Industrial design: Crimson button grid with play-symbol motifs.

## Software stack and signals

Signals / outputs: Clip miner agent, CapCut/Drive/NAS workflows.

## Placement and agents

Placement: Editor desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Nexus_Labs]].

## Governance

> [!warning] Safety gate
> No auto-post without approval.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
