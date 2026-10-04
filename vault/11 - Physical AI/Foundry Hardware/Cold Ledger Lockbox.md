---
title: Cold Ledger Lockbox
cost: ~$200-$700
tags:
- hardware
- foundry
- physical-ai
- quantum-ledger
- secure-storage
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Secure Storage
cost_low: 200
division: Quantum Ledger
cost_high: 700
form_factor: secure storage
division_status: operating
---
# Cold Ledger Lockbox

**Secure Storage** in the Quantum Ledger set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Quantum Ledger Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Secure Storage |
| Form factor | secure storage |
| Budget | ~$200-$700 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical lockbox for hardware wallets, recovery envelopes, and signed transaction artifacts.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Steel/fire-resistant box | — |
| NFC inventory | — |
| Pi scanner | — |
| tamper labels | — |
| environmental sensor | — |

Budget for the full item: **~$200-$700**.

## Specs

- Form factor: secure storage
- Placement: Secure cabinet/safe area.
- Industrial design: Purple/gold custody labels.

## Software stack and signals

Signals / outputs: Quantum custody log, Juris Guard.

Cross-division handoffs: [[Juris Guard Division]]

## Placement and agents

Placement: Secure cabinet/safe area.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Quantum_Ledger]].

## Governance

> [!warning] Safety gate
> No private keys digitized by lockbox.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: financial data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
