---
title: QL-02 Chain Ledger Node (Build Spec)
id: QL-02
cost: ~$350–$500 (beyond Mac mini infrastructure)
tags:
- physical-ai
- build-spec
- hardware
- quantum-ledger
- mac-mini
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 350
division: Quantum Ledger
cost_high: 500
division_status: operating
---
# QL-02 Chain Ledger Node (Build Spec)

*On-chain, on-premises — Web3 without the cloud.*

**Division:** [[Quantum Ledger Division]] (operating) · **Director:** [[Director_Quantum_Ledger]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `QL-02` |
| Product | Chain Ledger Node |
| Est. budget | ~$350–$500 (beyond Mac mini infrastructure) |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A Mac mini node running a local blockchain light client, Web3 wallet integration, and Quantum Genesis token monitoring. Fully isolated on VLAN 20 with encrypted NAS storage for transaction history.

## Outcome

On-premises Web3 node — local light client, wallet monitoring, Quantum Genesis token tracking.

## Hardware (bill of materials)

- [ ] Mac mini M4 24GB (Quantum Ledger node)
- [ ] Raspberry Pi 5 (UI + wallet display)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] Synology NAS encrypted share
- [ ] Labeled Cat6A drop to VLAN 20

Est. budget: **~$350–$500 (beyond Mac mini infrastructure)**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Quantum Genesis]]
