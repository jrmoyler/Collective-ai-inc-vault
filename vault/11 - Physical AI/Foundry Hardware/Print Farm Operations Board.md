---
title: Print Farm Operations Board
cost: ~$250-$700
tags:
- hardware
- foundry
- physical-ai
- binary-loom
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 250
division: Binary Loom
cost_high: 700
form_factor: control panel
division_status: operating
---
# Print Farm Operations Board

**Control Panel** in the Binary Loom set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$250-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical board for printer queues, filament status, failed jobs, and enclosure readiness.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| display | — |
| macro buttons | — |
| NFC filament tags | — |
| camera feed tiles | — |

Budget for the full item: **~$250-$700**.

## Specs

- Form factor: control panel
- Placement: Fabrication bench.
- Industrial design: Teal terminal-style board.

## Software stack and signals

Signals / outputs: Bambu/Prusa queues, NAS CAD archive.

## Placement and agents

Placement: Fabrication bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Binary_Loom]].

## Governance

> [!warning] Safety gate
> Heated printers follow fire-safety policy.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
