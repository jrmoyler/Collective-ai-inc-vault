---
title: EC-03 Protocol Scan Node
id: EC-03
cost: ~$430–$600
tags:
- physical-ai
- build-spec
- hardware
- eon-core
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 430
division: Eon Core
cost_high: 600
division_status: chartered
---
# EC-03 Protocol Scan Node

*Research inputs, captured and categorized.*

**Division:** [[Eon Core Division]] (chartered, not operating) · **Director:** [[Director_Eon_Core]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `EC-03` |
| Product | Protocol Scan Node |
| Est. budget | ~$430–$600 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A high-resolution camera + AI inference node for capturing and categorizing longevity protocol documents, supplement labels, and research papers for the Eon Core knowledge base.

## Outcome

Protocol document capture — 64MP scan, AI OCR + categorization, longevity knowledge base ingestion.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB
- [ ] Arducam 64MP Hawkeye Camera
- [ ] Pi AI Camera (IMX500, on-sensor tag)
- [ ] Pi M.2 HAT+ + 1TB NVMe
- [ ] NVIDIA Jetson Orin Nano Super (OCR + categorization)
- [ ] 3D-printed Bambu A1 document scan tray

Est. budget: **~$430–$600**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Longevity Protocol Builder]]
