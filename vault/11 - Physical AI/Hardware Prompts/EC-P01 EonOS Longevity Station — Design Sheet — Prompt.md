---
title: EC-P01 EonOS Longevity Station — Design Sheet — Prompt
id: EC-P01
kind: hardware
mode: MODE 6 — Design Sheet
part: Part 5 — Division Hardware Assets — All 20 Divisions + Parent
tags:
- prompt
- hardware
- image-prompt
- terminal
- mode-6
- eon-core
type: prompt
owner: JR Moyler (Hataalii)
device: EonOS Longevity Station
source: Hardware Agentic Prompt Catalog
updated: 2026-10-04
division: Eon Core
aspect_ratio: '3:2'
device_class: terminal
agentic_toolkit: 'yes'
---
# EC-P01 EonOS Longevity Station — Design Sheet — Prompt

**Device:** EonOS Longevity Station · **Mode:** MODE 6 — Design Sheet · **Aspect ratio:** `--ar 3:2`

**Division(s):** [[Eon Core Division]]
**Director agent(s):** [[Director_Eon_Core]]
**Catalog location:** Part 5 — Division Hardware Assets — All 20 Divisions + Parent › Eon Core
**Hub:** [[Hardware Agentic Prompt Catalog]]

## Purpose
Generate an annotated full-body design spec sheet of the EonOS Longevity Station.

## When to use
Use first, to lock the canonical look, colors and parts of the unit before scenes, pose sheets or video.

## Inputs
- Target model: not stated for this part. The catalog is written for image generation and uses Midjourney-style `--ar` flags.
- No variables. Paste the prompt as written; it ends with its own `--ar` flag.
- Locked colors in the prompt: Eon Black `#030608`, Vital Emerald `#059669`. See [[Division Palettes]].

## Prompt
```
full body Eon Core EonOS longevity station hardware design sheet, Eon Black #030608 and Vital Emerald #059669 chassis, biological age tracking display array, BioAge Engine processing module, Protocol Builder recommendation display, longevity timeline visualization crown, double helix infinity mark, annotation callouts: bio-age tracking display, BioAge Engine module, protocol display, longevity timeline crown, dark organic background with white annotations --ar 3:2
```

## Expected output
One spec-sheet image with the unit and annotation callouts.
- Callouts to check: bio-age tracking display, BioAge Engine module, protocol display, longevity timeline crown.

## Agentic integration (TOOLKIT)
> EonOS BioAge Agent + epigenetic clock API + Protocol Builder ZenFlow model + n8n biomarker monitoring workflow

Related notes: [[EonOS]] · [[n8n Workflow Blueprint]]
