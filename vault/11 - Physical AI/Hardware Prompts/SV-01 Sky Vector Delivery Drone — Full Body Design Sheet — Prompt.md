---
title: SV-01 Sky Vector Delivery Drone — Full Body Design Sheet — Prompt
id: SV-01
kind: hardware
mode: MODE 6 — Full Body Design Sheet
part: Part 1 — Drone Fleet
tags:
- prompt
- hardware
- image-prompt
- drone
- mode-6
- vectorshift
type: prompt
owner: JR Moyler (Hataalii)
device: Sky Vector Delivery Drone
source: Hardware Agentic Prompt Catalog
updated: 2026-10-04
division: VectorShift
aspect_ratio: '3:2'
device_class: drone
target_tools: Nano Banana 2, GPT Image 2, Midjourney, Grok Imagine
agentic_toolkit: 'yes'
---
# SV-01 Sky Vector Delivery Drone — Full Body Design Sheet — Prompt

**Device:** Sky Vector Delivery Drone · **Mode:** MODE 6 — Full Body Design Sheet · **Aspect ratio:** `--ar 3:2`

**Division(s):** [[VectorShift Division]]
**Director agent(s):** [[Director_VectorShift]]
**Catalog location:** Part 1 — Drone Fleet › VectorShift — Sky Vector (*Everything Moves.*)
**Hub:** [[Hardware Agentic Prompt Catalog]]

## Purpose
Generate an annotated full-body design spec sheet of the Sky Vector Delivery Drone.

## When to use
Use first, to lock the canonical look, colors and parts of the unit before scenes, pose sheets or video.

## Inputs
- Target model: Nano Banana 2, GPT Image 2, Midjourney, Grok Imagine (stated for Part 1).
- No variables. Paste the prompt as written; it ends with its own `--ar` flag.
- Locked colors in the prompt: Void Navy `#0A1628`, Velocity Silver `#CBD5E1`. See [[Division Palettes]].

## Prompt
```
full body Sky Vector autonomous delivery drone design sheet, hexagonal carbon fiber frame, four variable-pitch rotors, underbelly payload bay with magnetic lock, VS circuit eagle mark on dorsal hull, Void Navy #0A1628 body with Velocity Silver #CBD5E1 chrome trim, Arc Cobalt sensor array crown, annotation callouts: rotor assembly, payload bay latch, LiDAR sensor cluster, mesh transceiver fin, clean white background, industrial product design spec sheet --ar 3:2
```

## Expected output
One spec-sheet image with the unit and annotation callouts.
- Callouts to check: rotor assembly, payload bay latch, LiDAR sensor cluster, mesh transceiver fin.

## Agentic integration (TOOLKIT)
> Sky Vector Route Agent (ZenFlow Tier 3) + Vector Hub n8n webhook on delivery complete

Related notes: [[Sky Vector]] · [[Workflows — VectorShift]]

> [!info] Agent tiers
> The catalog places this agent at ZenFlow Tier 3. Current tier routing lives in [[Agent Tier Registry]].
