---
title: Architect Medallion
cost: ~$120-$190
tags:
- wearable
- physical-ai
- collective-ai-inc
- smart-pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Pendant
cost_low: 120
division: Collective AI Inc (Parent)
cost_high: 190
data_class: standard internal
form_factor: smart pendant
catalog_entry: 2
---
# Architect Medallion

**Smart Pendant** for [[Collective AI — Company Charter]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Executive pendant that captures short voice directives and converts them into Knowledge Keeper tasks.

## Spec
| Field | Value |
|---|---|
| Form factor | smart pendant |
| Catalog category | Smart Pendant |
| Entity | Collective AI Inc (Parent Company) |
| Budget | ~$120-$190 |
| Industrial design | Round medallion with diamond-star relief, black PETG body, gold rim, teal live-pulse window. |
| Data class | standard internal |

## Sensors, signals and outputs
- 15-second voice capture
- RGB status
- Haptic save cue
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | Seeed XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | PowerBoost 1000 |
| 4 | 500-800mAh LiPo |
| 5 | Tactile side switch |
| 6 | Haptic coin motor |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZenFlow /knowledge/write, Whisper or local transcription, ZENITH routing, Notion/Drive archive.

Linked notes: [[Knowledge_Keeper]], [[ZENITH]], [[ZenFlow API]], [[ZenFlow Division]]

## Safety gate and data handling
- **Safety gate:** Private capture only; button-gated recording.
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
