---
title: Market Pulse Light Strip
cost: ~$90-$250
tags:
- hardware
- foundry
- physical-ai
- quantum-ledger
- environmental-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Environmental Fixture
cost_low: 90
division: Quantum Ledger
cost_high: 250
form_factor: environmental fixture
division_status: operating
---
# Market Pulse Light Strip

**Environmental Fixture** in the Quantum Ledger set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Quantum Ledger Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Environmental Fixture |
| Form factor | environmental fixture |
| Budget | ~$90-$250 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Desk light strip translating market states into ambient colors, intensity, and haptic relay signals.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| ESP32/Pi | — |
| LED strip | — |
| BLE transmitter | — |
| small OLED ticker | — |
| USB-C power | — |

Budget for the full item: **~$90-$250**.

## Specs

- Form factor: environmental fixture
- Placement: Trading desk rear edge.
- Industrial design: Purple glow with restrained gold tick marks.

## Software stack and signals

Signals / outputs: Aurum alerts, market data cache.

## Placement and agents

Placement: Trading desk rear edge.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Quantum_Ledger]].

## Governance

> [!warning] Safety gate
> Advisory display only.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: financial data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
