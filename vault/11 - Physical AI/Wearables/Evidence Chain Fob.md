---
title: Evidence Chain Fob
cost: ~$75-$130
tags:
- wearable
- physical-ai
- juris-guard
- secure-key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Secure Key Fob
cost_low: 75
division: Juris Guard
cost_high: 130
data_class: legal
form_factor: secure key fob
catalog_entry: 84
division_status: operating
---
# Evidence Chain Fob

**Secure Key Fob** for [[Juris Guard Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Physical chain-of-custody fob for document batches, drives, and evidence envelopes.

## Spec
| Field | Value |
|---|---|
| Form factor | secure key fob |
| Catalog category | Secure Key Fob |
| Entity | Juris Guard (LegalTech and AI Governance) |
| Budget | ~$75-$130 |
| Industrial design | Indigo rugged fob with owl/shield mark. |
| Data class | legal |

## Sensors, signals and outputs
- NFC chain event
- Haptic receipt
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | Haptic motor |
| 4 | LiPo |
| 5 | Tamper-label slot |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Evidence ledger, Juris Guard audit log.

Linked notes: [[Director_Juris_Guard]]

## Safety gate and data handling
- **Safety gate:** No evidence content stored on fob.
- **Data class:** legal — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Juris Guard Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
