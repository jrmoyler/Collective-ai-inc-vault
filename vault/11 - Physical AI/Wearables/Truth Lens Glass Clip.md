---
title: Truth Lens Glass Clip
cost: ~$140-$230
tags:
- wearable
- physical-ai
- aether-link
- glasses-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Glasses Clip
cost_low: 140
division: Aether Link
cost_high: 230
data_class: standard internal
form_factor: glasses clip
catalog_entry: 64
division_status: chartered
---
# Truth Lens Glass Clip

**Glasses Clip** for [[Aether Link Division]] · budget **~$140-$230** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Clip-on glasses interface for flagging media claims and misinformation-review moments.

## Spec
| Field | Value |
|---|---|
| Form factor | glasses clip |
| Catalog category | Glasses Clip |
| Entity | Aether Link (Connectivity and Communications) |
| Budget | ~$140-$230 |
| Industrial design | Mint clip with visible capture indicator. |
| Data class | standard internal |

## Sensors, signals and outputs
- Image note
- Claim marker
- Haptic result
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense camera |
| 2 | LiPo |
| 3 | Haptic |
| 4 | Lens privacy slider |

The catalog prices the whole build at **~$140-$230**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Truth Lens workflow, Knowledge Keeper.

Linked notes: [[Director_Aether_Link]], [[Knowledge_Keeper]], [[Truth Lens]]

## Safety gate and data handling
- **Safety gate:** Human review before public claims.
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
- Division: [[Aether Link Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
