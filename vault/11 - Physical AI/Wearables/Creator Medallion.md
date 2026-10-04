---
title: Creator Medallion
cost: ~$120-$190
tags:
- wearable
- physical-ai
- nexus-labs
- smart-pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Pendant
cost_low: 120
division: Nexus Labs
cost_high: 190
data_class: standard internal
form_factor: smart pendant
catalog_entry: 21
division_status: operating
---
# Creator Medallion

**Smart Pendant** for [[Nexus Labs Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Creative pendant for capturing inspiration moments without disrupting flow.

## Spec
| Field | Value |
|---|---|
| Form factor | smart pendant |
| Catalog category | Smart Pendant |
| Entity | Nexus Labs (Media, Entertainment, and Creative) |
| Budget | ~$120-$190 |
| Industrial design | Crimson-on-black medallion with record-safe indicator. |
| Data class | standard internal |

## Sensors, signals and outputs
- Voice snippet
- Button marker
- RGB save confirmation
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | PowerBoost 1000 |
| 4 | LiPo |
| 5 | Haptic |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Creator Nexus Vault Agent, Notion, Knowledge Keeper, Slack.

Linked notes: [[Director_Nexus_Labs]], [[Knowledge_Keeper]], [[Creator Nexus]]

## Safety gate and data handling
- **Safety gate:** Button-gated audio; visible record light.
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
- Division: [[Nexus Labs Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
