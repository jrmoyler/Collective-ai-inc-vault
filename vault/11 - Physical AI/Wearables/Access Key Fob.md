---
title: Access Key Fob
cost: ~$75-$130
tags:
- wearable
- physical-ai
- obsidian-arc
- secure-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Secure Fob
cost_low: 75
division: Obsidian Arc
cost_high: 130
data_class: standard internal
form_factor: secure fob
catalog_entry: 53
division_status: operating
---
# Access Key Fob

**Secure Fob** for [[Obsidian Arc Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Rugged credential fob for room access, equipment checkout, and prototype custody.

## Spec
| Field | Value |
|---|---|
| Form factor | secure fob |
| Catalog category | Secure Fob |
| Entity | Obsidian Arc (Unified Cyber and Physical Security) |
| Budget | ~$75-$130 |
| Industrial design | Hard-edged orange-on-black key. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC/BLE credential
- Haptic status
- Lost fob revoke

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | ASA shell |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Access controller, inventory registry, audit log.

Linked notes: [[Director_Obsidian_Arc]]

## Safety gate and data handling
- **Safety gate:** Revocation list required.
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
- Division: [[Obsidian Arc Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
