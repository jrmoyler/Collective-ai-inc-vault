---
title: Alpha Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- quantum-ledger
- ear-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: Quantum Ledger
cost_high: 180
data_class: financial
form_factor: ear cue
catalog_entry: 42
division_status: operating
---
# Alpha Ear Cue

**Ear Cue** for [[Quantum Ledger Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private market-state cue device for threshold alerts without exposing trading dashboard audio.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Quantum Ledger (FinTech and Web3) |
| Budget | ~$110-$180 |
| Industrial design | Quantum-purple ear pod with tiny status slit. |
| Data class | financial |

## Sensors, signals and outputs
- Haptic/audio alert
- Symbol pattern
- BLE receive

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio output |
| 4 | LiPo |
| 5 | TPU ear hook |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Crypto risk monitor, Aurum alert workflow.

Linked notes: [[Director_Quantum_Ledger]]

## Safety gate and data handling
- **Safety gate:** Trading decisions remain human-controlled.
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
