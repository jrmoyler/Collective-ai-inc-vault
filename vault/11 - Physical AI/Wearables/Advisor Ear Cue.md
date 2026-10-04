---
title: Advisor Ear Cue
cost: ~$110-$175
tags:
- wearable
- physical-ai
- the-collective
- ear-worn-cue-pod
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear-Worn Cue Pod
cost_low: 110
division: The Collective
cost_high: 175
data_class: client
form_factor: ear-worn cue pod
catalog_entry: 13
division_status: operating
---
# Advisor Ear Cue

**Ear-Worn Cue Pod** for [[The Collective Division]] · budget **~$110-$175** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private consultant cue device for pitch timing, agenda transitions, and objection handling.

## Spec
| Field | Value |
|---|---|
| Form factor | ear-worn cue pod |
| Catalog category | Ear-Worn Cue Pod |
| Entity | The Collective (Expert AI Consulting) |
| Budget | ~$110-$175 |
| Industrial design | Gold accent ear hook, subdued and client-safe. |
| Data class | client |

## Sensors, signals and outputs
- Haptic/audio cue
- Timer state
- BLE receive

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Micro speaker add-on |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU ear hook |

The catalog prices the whole build at **~$110-$175**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Strategy agent, calendar agenda, meeting assistant.

Linked notes: [[Director_The_Collective]]

## Safety gate and data handling
- **Safety gate:** No hidden recording; receives prompts only unless button-held.
- **Data class:** client — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[The Collective Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
