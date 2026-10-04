---
title: Wallet QR Scan Stand
cost: ~$180-$420
tags:
- hardware
- foundry
- physical-ai
- quantum-ledger
- camera-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Camera Fixture
cost_low: 180
division: Quantum Ledger
cost_high: 420
form_factor: camera fixture
division_status: operating
---
# Wallet QR Scan Stand

**Camera Fixture** in the Quantum Ledger set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Quantum Ledger Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Camera Fixture |
| Form factor | camera fixture |
| Budget | ~$180-$420 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Secure camera stand for scanning wallet QR codes, transaction references, and documents locally.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Pi Camera 3 or Arducam | — |
| light hood | — |
| physical shutter | — |
| NVMe | — |

Budget for the full item: **~$180-$420**.

## Specs

- Form factor: camera fixture
- Placement: Trading/legal desk.
- Industrial design: Purple scan hood with privacy shutter.

## Software stack and signals

Signals / outputs: Wallet monitor, Chain Ledger, encrypted log.

## Placement and agents

Placement: Trading/legal desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Quantum_Ledger]].

## Governance

> [!warning] Safety gate
> No QR forwarding without confirmation.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: financial data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
