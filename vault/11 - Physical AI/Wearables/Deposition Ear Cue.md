---
title: Deposition Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- juris-guard
- ear-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: Juris Guard
cost_high: 180
data_class: legal
form_factor: ear cue
catalog_entry: 83
division_status: operating
---
# Deposition Ear Cue

**Ear Cue** for [[Juris Guard Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private cue device for legal interview pacing, question timing, and review holds.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Juris Guard (LegalTech and AI Governance) |
| Budget | ~$110-$180 |
| Industrial design | Indigo ear hook with subtle gold legal mark. |
| Data class | legal |

## Sensors, signals and outputs
- Haptic/audio timing
- BLE receive

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio output |
| 4 | LiPo |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Juris Guard workflow, calendar agenda.

Linked notes: [[Director_Juris_Guard]]

## Safety gate and data handling
- **Safety gate:** Human attorney/authorized reviewer remains accountable.
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
