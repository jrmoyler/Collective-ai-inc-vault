---
title: Wearable Catalog — Build Governance
tags:
- wearable
- physical-ai
- governance
- aegis
type: standard
owner: JR Moyler (Hataalii)
source: Wearable Catalog
updated: 2026-10-04
---
# Wearable Catalog — Build Governance

Closing rules of the [[Wearable Catalog]]. They apply to all 105 wearables.

## Source notes
Built from the Collective AI Physical AI Build Spec and the Physical AI Foundry blueprint, especially the sections on the Foundry hardware source catalog, BLE wearables, edge compute, fabrication tools, power systems, audio/camera modules, and the rule that physical systems remain staged under Aegis-Hold. Brand treatment follows the [[Design System Bible v3]]: dark backgrounds, restrained gold, division accents, Space-Grotesk-like sans-serif hierarchy, and no text over images.

## Rules
| Rule | Operating requirement |
|---|---|
| Identity | Every device receives a device ID, owner, division, firmware version, physical label, and registry entry before deployment. |
| Network | Unknown or experimental devices start on VLAN 80 Quarantine. Production devices move only after Binary Loom QA and Aegis review. |
| Data | Sensitive client, health, legal, civic, financial, and behavioral data stays local/encrypted unless a reviewed workflow permits export. |
| Power | LiPo and battery systems require fire-safe charging, thermal monitoring where possible, and labeled storage. |
| Autonomy | Drones, robots, actuation benches, and safety-critical systems remain human-supervised and e-stop protected. |
| Brand | Parent assets use Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver, and dark card surfaces. Division assets use one division accent. |

> [!danger] Clinical and behavioral devices
> Health data from [[Vital Helix Division]], [[Eon Core Division]] and [[Cognara Mind Division]] wearables never leaves the device or encrypted store without a reviewed workflow. Health claims need clinical review; production needs [[Aegis Protocol]] review.

## Pre-deployment checklist (per device)
- [ ] Device ID, owner, division, firmware version, physical label, registry entry
- [ ] Joined to VLAN 80 Quarantine
- [ ] Binary Loom QA passed ([[Binary Loom Division]])
- [ ] Aegis review passed
- [ ] Data export path reviewed (sensitive classes)
- [ ] Fire-safe LiPo charging and labeled storage

## Related
- [[Wearable Catalog]]
- [[Wearable Catalog — Operating Standard]]
- [[Obsidian Arc Division]]
- [[Color Locks]]
