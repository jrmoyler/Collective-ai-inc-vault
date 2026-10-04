---
title: Privilege Lanyard
cost: ~$95-$155
tags:
- wearable
- physical-ai
- juris-guard
- lanyard
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Lanyard
cost_low: 95
division: Juris Guard
cost_high: 155
data_class: legal
form_factor: lanyard
catalog_entry: 82
division_status: operating
---
# Privilege Lanyard

**Lanyard** for [[Juris Guard Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Visible legal-session lanyard indicating privileged review state and capture permissions.

## Spec
| Field | Value |
|---|---|
| Form factor | lanyard |
| Catalog category | Lanyard |
| Entity | Juris Guard (LegalTech and AI Governance) |
| Budget | ~$95-$155 |
| Industrial design | Indigo lanyard module with clear status window. |
| Data class | legal |

## Sensors, signals and outputs
- Consent status
- Session mode
- Haptic timer
- NFC

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | LiPo |
| 4 | RGB |
| 5 | Haptic |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Juris Guard intake, Knowledge Keeper.

Linked notes: [[Director_Juris_Guard]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Privilege mode locks uploads to encrypted storage.
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
