---
title: Prototype Burn-In Rack
cost: ~$400-$1,200
tags:
- hardware
- foundry
- physical-ai
- binary-loom
- test-rack
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Test Rack
cost_low: 400
division: Binary Loom
cost_high: 1200
form_factor: test rack
division_status: operating
---
# Prototype Burn-In Rack

**Test Rack** in the Binary Loom set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Binary Loom Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Test Rack |
| Form factor | test rack |
| Budget | ~$400-$1,200 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Rack that stress-tests devices for 24-72 hours while logging temperature, network, power, and crashes.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 controller | — |
| USB PD power | — |
| thermal sensors | — |
| fans | — |
| cameras | — |
| rack shelves | — |

Budget for the full item: **~$400-$1,200**.

## Specs

- Form factor: test rack
- Placement: Hardware lab rack.
- Industrial design: Teal rack labels and status LEDs.

## Software stack and signals

Signals / outputs: OpenTelemetry, device logs, Knowledge Keeper.

Related systems: [[Knowledge Keeper]], [[Observability Stack]]

## Placement and agents

Placement: Hardware lab rack.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Binary_Loom]].

## Governance

> [!warning] Safety gate
> Thermal cutoff and fire-safe spacing.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
