---
title: BL-02 Natural Script Compiler Node
id: BL-02
cost: ~$500–$700 (beyond Mac mini infrastructure)
tags:
- physical-ai
- build-spec
- hardware
- binary-loom
- jetson
- mac-mini
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 500
division: Binary Loom
cost_high: 700
division_status: operating
---
# BL-02 Natural Script Compiler Node

*The language of machines, built on this bench.*

**Division:** [[Binary Loom Division]] (operating) · **Director:** [[Director_Binary_Loom]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `BL-02` |
| Product | Natural Script Compiler Node |
| Est. budget | ~$500–$700 (beyond Mac mini infrastructure) |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Binary Loom's local language model inference node for Natural Script development and testing. An isolated Jetson + Mac mini pair running code generation agents without cloud dependency.

## Outcome

Local code-gen inference station — Natural Script dev, isolated from production, full debug tooling.

## Hardware (bill of materials)

- [ ] Mac mini M4 Pro 48GB (Engineering A node)
- [ ] NVIDIA Jetson Orin Nano Super (inference)
- [ ] Raspberry Pi 5 (test driver)
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] Logic analyzer Saleae clone (debug)
- [ ] Labeled Cat6A drop to VLAN 30 Engineering

Est. budget: **~$500–$700 (beyond Mac mini infrastructure)**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Natural Script]]
