---
title: Open-House Key Token
cost: ~$75-$125
tags:
- wearable
- physical-ai
- terra-axis
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 75
division: Terra Axis
cost_high: 125
data_class: standard internal
form_factor: key fob
catalog_entry: 29
division_status: chartered
---
# Open-House Key Token

**Key Fob** for [[Terra Axis Division]] · budget **~$75-$125** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Property-showing token for access state, tour start/stop, and visitor-flow markers.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | Terra Axis (Real Estate and Physical Infrastructure) |
| Budget | ~$75-$125 |
| Industrial design | Compact blue token with house-axis icon. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC event
- Haptic cue
- BLE tour marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | LiPo |
| 4 | Haptic |
| 5 | PETG key shell |

The catalog prices the whole build at **~$75-$125**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
CRM, listing analytics, appointment workflow.

Linked notes: [[Director_Terra_Axis]]

## Safety gate and data handling
- **Safety gate:** No personal tracking beyond appointment logs.
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
- Division: [[Terra Axis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
