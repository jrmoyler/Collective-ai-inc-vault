---
title: Options Desk Touch Token
cost: ~$80-$130
tags:
- wearable
- physical-ai
- quantum-ledger
- pocket-token
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pocket Token
cost_low: 80
division: Quantum Ledger
cost_high: 130
data_class: financial
form_factor: pocket token
catalog_entry: 45
division_status: operating
---
# Options Desk Touch Token

**Pocket Token** for [[Quantum Ledger Division]] · budget **~$80-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Tactile desk token carried by trader to mark thesis changes and risk-review events.

## Spec
| Field | Value |
|---|---|
| Form factor | pocket token |
| Catalog category | Pocket Token |
| Entity | Quantum Ledger (FinTech and Web3) |
| Budget | ~$80-$130 |
| Industrial design | Heavy-feel purple puck with engraved strike-line motif. |
| Data class | financial |

## Sensors, signals and outputs
- Tap marker
- Haptic receipt
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | Haptic |
| 3 | LiPo |
| 4 | NFC |
| 5 | 3D printed puck |

The catalog prices the whole build at **~$80-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Trading journal, Notion/Airtable, Knowledge Keeper.

Linked notes: [[Director_Quantum_Ledger]], [[Knowledge_Keeper]], [[Airtable Operations Hub]]

## Safety gate and data handling
- **Safety gate:** Journal marker only; no execution path.
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
