---
title: Foundry Hardware Build Governance Rules
tags:
- foundry
- physical-ai
- hardware
- governance
- safety
type: governance
owner: JR Moyler (Hataalii)
source: Foundry Infrastructure Hardware Catalog
updated: 2026-10-04
---
# Foundry Hardware Build Governance Rules

Build governance rules from the closing page of the [[Foundry Infrastructure Hardware Catalog]]. They apply to every device in the catalog.

## Source notes

Built from the Collective AI Physical AI Foundry blueprint and Build Spec: operating architecture, Mac mini local cloud, network segmentation, physical AI shell catalog, fabrication bench, actuation lab, drone lab and purchase phases. Brand treatment follows the [[Design System Bible v3]]: dark backgrounds, restrained gold, division accents, high contrast, clean card-based layouts.

## Rules

| Rule | Operating requirement |
|---|---|
| Identity | Every device receives a device ID, owner, division, firmware version, physical label, and registry entry before deployment. |
| Network | Unknown or experimental devices start on VLAN 80 Quarantine. Production devices move only after Binary Loom QA and Aegis review. |
| Data | Sensitive client, health, legal, civic, financial, and behavioral data stays local/encrypted unless a reviewed workflow permits export. |
| Power | LiPo and battery systems require fire-safe charging, thermal monitoring where possible, and labeled storage. |
| Autonomy | Drones, robots, actuation benches, and safety-critical systems remain human-supervised and e-stop protected. |
| Brand | Parent assets use Deep Navy, Amber Gold, Electric Teal, Bright White, Muted Silver, and dark card surfaces. Division assets use one division accent. |

## Pre-deployment checklist

- [ ] Device ID, owner, division, firmware version, physical label and registry entry recorded
- [ ] Device starts on VLAN 80 Quarantine
- [ ] [[Binary Loom Division]] QA passed
- [ ] Aegis review passed ([[Aegis Protocol]])
- [ ] Sensitive data paths local/encrypted, or export workflow reviewed
- [ ] Battery/LiPo: fire-safe charging, thermal monitoring, labeled storage
- [ ] Autonomous or actuated systems: human supervision and e-stop in place

Related safety hardware: [[Workshop E-Stop Network]], [[Robot E-Stop Pedestal]], [[Drone Battery Safety Bay]], [[Device Pairing Station]], [[Prototype Registry Shelf]], [[Privacy Shutter Array]].

Related: [[Foundry Hardware Operating Standard]], [[Juris Guard Division]], [[Obsidian Arc Division]].
