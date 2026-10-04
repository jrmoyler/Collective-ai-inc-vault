---
title: Aurum Risk Ring
cost: ~$95-$155
tags:
- wearable
- physical-ai
- quantum-ledger
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Quantum Ledger
cost_high: 155
data_class: financial
form_factor: smart ring
catalog_entry: 41
division_status: operating
---
# Aurum Risk Ring

**Smart Ring** for [[Quantum Ledger Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Trader ring that receives haptic signal state and requires deliberate confirmation for high-risk moments.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Quantum Ledger (FinTech and Web3) |
| Budget | ~$95-$155 |
| Industrial design | Purple-black ring with subtle gold edge. |
| Data class | financial |

## Sensors, signals and outputs
- Buy/sell/risk haptic patterns
- Confirmation tap
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |
| 5 | PETG ring |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Aurum Terminal, risk monitor, Knowledge Keeper.

Linked notes: [[Director_Quantum_Ledger]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Never executes trades alone; confirmation advisory only.
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
