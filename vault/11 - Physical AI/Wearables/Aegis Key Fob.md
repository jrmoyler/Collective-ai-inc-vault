---
title: Aegis Key Fob
cost: ~$85-$140
tags:
- wearable
- physical-ai
- collective-ai-inc
- secure-pocket-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Secure Pocket Fob
cost_low: 85
division: Collective AI Inc (Parent)
cost_high: 140
data_class: standard internal
form_factor: secure pocket fob
catalog_entry: 3
---
# Aegis Key Fob

**Secure Pocket Fob** for [[Collective AI — Company Charter]] · budget **~$85-$140** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Pocket credential for room access, prototype custody, and emergency workflow triggers.

## Spec
| Field | Value |
|---|---|
| Form factor | secure pocket fob |
| Catalog category | Secure Pocket Fob |
| Entity | Collective AI Inc (Parent Company) |
| Budget | ~$85-$140 |
| Industrial design | Rugged key-fob body with recessed button and amber edge light. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC/BLE access token
- Panic press
- Device check-in
- Haptic receipt

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | Feather nRF52840 Sense |
| 3 | NFC tag insert |
| 4 | DRV2605L |
| 5 | LiPo |
| 6 | Rugged ASA key shell |

The catalog prices the whole build at **~$85-$140**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Obsidian Arc access log, Aegis Command Station, Knowledge Keeper.

Linked notes: [[Knowledge_Keeper]], [[Aegis Protocol]], [[Obsidian Arc Division]]

## Safety gate and data handling
- **Safety gate:** Lost-device revoke path; no personal biometric storage.
- **Data class:** standard internal
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Collective AI — Company Charter]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
