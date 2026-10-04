---
title: NN-P01 Nomad Nexus Global Mobility Terminal — Design Sheet — Prompt
id: NN-P01
kind: hardware
mode: MODE 6 — Design Sheet
part: Part 5 — Division Hardware Assets — All 20 Divisions + Parent
tags:
- prompt
- hardware
- image-prompt
- terminal
- mode-6
- nomad-nexus
type: prompt
owner: JR Moyler (Hataalii)
device: Nomad Nexus Global Mobility Terminal
source: Hardware Agentic Prompt Catalog
updated: 2026-10-04
division: Nomad Nexus
aspect_ratio: '3:2'
device_class: terminal
agentic_toolkit: 'yes'
---
# NN-P01 Nomad Nexus Global Mobility Terminal — Design Sheet — Prompt

**Device:** Nomad Nexus Global Mobility Terminal · **Mode:** MODE 6 — Design Sheet · **Aspect ratio:** `--ar 3:2`

**Division(s):** [[Nomad Nexus Division]]
**Director agent(s):** [[Director_Nomad_Nexus]]
**Catalog location:** Part 5 — Division Hardware Assets — All 20 Divisions + Parent › Nomad Nexus
**Hub:** [[Hardware Agentic Prompt Catalog]]

## Purpose
Generate an annotated full-body design spec sheet of the Nomad Nexus Global Mobility Terminal.

## When to use
Use first, to lock the canonical look, colors and parts of the unit before scenes, pose sheets or video.

## Inputs
- Target model: not stated for this part. The catalog is written for image generation and uses Midjourney-style `--ar` flags.
- No variables. Paste the prompt as written; it ends with its own `--ar` flag.
- Locked colors in the prompt: Nomad Teal `#34D399`. See [[Division Palettes]].

## Prompt
```
full body Nomad Nexus global mobility terminal hardware design sheet, deep charcoal and Nomad Teal #34D399 chassis, visa intelligence display array, co-living network availability module, relocation route planning display, global map sphere on crown, NN compass emblem, annotation callouts: visa intelligence display, co-living module, relocation route display, global map crown, white background, global mobility design spec --ar 3:2
```

## Expected output
One spec-sheet image with the unit and annotation callouts.
- Callouts to check: visa intelligence display, co-living module, relocation route display, global map crown.

## Agentic integration (TOOLKIT)
> NN Relocation Agent + visa tracking API + co-living match API + n8n relocation pipeline workflow

Related notes: [[n8n Workflow Blueprint]]
