---
title: Ledger Cold Key Token
cost: ~$75-$130
tags:
- wearable
- physical-ai
- quantum-ledger
- secure-key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Secure Key Fob
cost_low: 75
division: Quantum Ledger
cost_high: 130
data_class: financial
form_factor: secure key fob
catalog_entry: 43
division_status: operating
---
# Ledger Cold Key Token

**Secure Key Fob** for [[Quantum Ledger Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Physical Web3 custody cue token for wallet check-ins, transaction notes, and cold-storage workflow state.

## Spec
| Field | Value |
|---|---|
| Form factor | secure key fob |
| Catalog category | Secure Key Fob |
| Entity | Quantum Ledger (FinTech and Web3) |
| Budget | ~$75-$130 |
| Industrial design | Purple secure token with tamper-evident label cavity. |
| Data class | financial |

## Sensors, signals and outputs
- NFC event
- Haptic confirm
- Audit marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | Haptic motor |
| 4 | LiPo |
| 5 | ASA shell |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Quantum Ledger wallet monitor, Juris Guard audit log.

Linked notes: [[Director_Quantum_Ledger]], [[Juris Guard Division]]

## Safety gate and data handling
- **Safety gate:** Does not store private keys.
- **Data class:** financial — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Quantum Ledger Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
