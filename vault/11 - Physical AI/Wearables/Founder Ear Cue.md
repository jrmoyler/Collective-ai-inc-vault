---
title: Founder Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- collective-ai-inc
- ear-worn-cue-pod
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear-Worn Cue Pod
cost_low: 110
division: Collective AI Inc (Parent)
cost_high: 180
data_class: standard internal
form_factor: ear-worn cue pod
catalog_entry: 4
---
# Founder Ear Cue

**Ear-Worn Cue Pod** for [[Collective AI — Company Charter]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Single-ear private cue device for silent briefings, meeting pacing, and agent-response alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | ear-worn cue pod |
| Catalog category | Ear-Worn Cue Pod |
| Entity | Collective AI Inc (Parent Company) |
| Budget | ~$110-$180 |
| Industrial design | Low-profile ear hook in soft TPU with gold status dot. |
| Data class | standard internal |

## Sensors, signals and outputs
- Haptic cue
- Short audio prompt
- BLE pairing
- Presence state

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Micro speaker or bone-conduction add-on |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | Soft TPU ear hook |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZENITH briefings, calendar/session alerts, local Mac mini audio gateway.

Linked notes: [[ZENITH]]

## Safety gate and data handling
- **Safety gate:** No continuous listening; receives cues from paired shell.
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
