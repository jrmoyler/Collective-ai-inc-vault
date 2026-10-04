---
title: AL-02 Babel Translation Node
id: AL-02
cost: ~$570–$760
tags:
- physical-ai
- build-spec
- hardware
- aether-link
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 570
division: Aether Link
cost_high: 760
division_status: chartered
---
# AL-02 Babel Translation Node

*Every language spoken, every message delivered.*

**Division:** [[Aether Link Division]] (chartered, not operating) · **Director:** [[Director_Aether_Link]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `AL-02` |
| Product | Babel Translation Node |
| Est. budget | ~$570–$760 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A Pi 5 + Jetson node running the Babel AI translation engine locally. Far-field mic captures multilingual audio, Jetson transcribes and translates in real time, and the display shows output in the target language.

## Outcome

Local multilingual translation terminal — real-time transcription + translation, offline-capable.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super
- [ ] ReSpeaker 4-Mic Array v2.0
- [ ] Raspberry Pi 5 (display controller)
- [ ] Whisplay HAT
- [ ] Adafruit I2S Speaker Bonnet
- [ ] Pi M.2 HAT+ + 1TB NVMe
- [ ] 3D-printed Bambu P1S translation terminal

Est. budget: **~$570–$760**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Babel AI]]
