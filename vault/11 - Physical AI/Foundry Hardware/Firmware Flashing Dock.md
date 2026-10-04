---
title: Firmware Flashing Dock
cost: ~$250-$650
tags:
- hardware
- foundry
- physical-ai
- binary-loom
- dock-test-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Dock/Test Fixture
cost_low: 250
division: Binary Loom
cost_high: 650
form_factor: dock/test fixture
division_status: operating
---
# Firmware Flashing Dock

**Dock/Test Fixture** in the Binary Loom set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Dock/Test Fixture |
| Form factor | dock/test fixture |
| Budget | ~$250-$650 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Multi-bay dock for flashing ESP32, Arduino, Feather, and Pi-based devices.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| USB hub | — |
| pogo pin fixtures | — |
| Pi 5 controller | — |
| relay power control | — |
| status LEDs | — |

Budget for the full item: **~$250-$650**.

## Specs

- Form factor: dock/test fixture
- Placement: Build bench.
- Industrial design: Teal dock bays with serial windows.

## Software stack and signals

Signals / outputs: GitHub releases, device registry, CI worker.

## Placement and agents

Placement: Build bench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Binary_Loom]].

## Governance

> [!warning] Safety gate
> Voltage profiles locked per board type.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
