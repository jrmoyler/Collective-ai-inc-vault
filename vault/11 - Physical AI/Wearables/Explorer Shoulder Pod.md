---
title: Explorer Shoulder Pod
cost: ~$135-$220
tags:
- wearable
- physical-ai
- nomad-nexus
- shoulder-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Shoulder Clip
cost_low: 135
division: Nomad Nexus
cost_high: 220
data_class: standard internal
form_factor: shoulder clip
catalog_entry: 95
division_status: chartered
---
# Explorer Shoulder Pod

**Shoulder Clip** for [[Nomad Nexus Division]] · budget **~$135-$220** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Rugged shoulder clip for field documentation, site notes, and remote engagement capture.

## Spec
| Field | Value |
|---|---|
| Form factor | shoulder clip |
| Catalog category | Shoulder Clip |
| Entity | Nomad Nexus (Global Mobility and Digital Nomad Infrastructure) |
| Budget | ~$135-$220 |
| Industrial design | Sand-gold shoulder pod with privacy shutter. |
| Data class | standard internal |

## Sensors, signals and outputs
- POV still
- Short note
- Motion
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense camera/mic |
| 2 | LiPo |
| 3 | Haptic |
| 4 | TPU backpack-strap clip |

The catalog prices the whole build at **~$135-$220**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Axiom field workflow, NAS sync.

Linked notes: [[Director_Nomad_Nexus]]

## Safety gate and data handling
- **Safety gate:** Visible capture state required.
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
- Division: [[Nomad Nexus Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
