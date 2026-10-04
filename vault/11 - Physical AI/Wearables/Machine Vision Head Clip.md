---
title: Machine Vision Head Clip
cost: ~$140-$230
tags:
- wearable
- physical-ai
- animus-prime
- head-glasses-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Head/Glasses Clip
cost_low: 140
division: Animus Prime
cost_high: 230
data_class: standard internal
form_factor: head/glasses clip
catalog_entry: 79
division_status: chartered
---
# Machine Vision Head Clip

**Head/Glasses Clip** for [[Animus Prime Division]] · budget **~$140-$230** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Wearable POV clip that captures operator view for robot learning demonstrations.

## Spec
| Field | Value |
|---|---|
| Form factor | head/glasses clip |
| Catalog category | Head/Glasses Clip |
| Entity | Animus Prime (Robotics and Embodied AI) |
| Budget | ~$140-$230 |
| Industrial design | Cyan clip with lens guard. |
| Data class | standard internal |

## Sensors, signals and outputs
- POV frame
- Demo marker
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense camera |
| 2 | LiPo |
| 3 | Haptic |
| 4 | Privacy shutter clip |

The catalog prices the whole build at **~$140-$230**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Robot learning dataset workflow, NAS archive.

Linked notes: [[Director_Animus_Prime]]

## Safety gate and data handling
- **Safety gate:** Dataset consent and review required.
- **Data class:** standard internal
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.
- Robots and actuation benches remain human-supervised and e-stop protected.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Animus Prime Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
