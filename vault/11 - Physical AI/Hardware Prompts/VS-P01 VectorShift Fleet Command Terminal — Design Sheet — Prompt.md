---
title: VS-P01 VectorShift Fleet Command Terminal — Design Sheet — Prompt
id: VS-P01
kind: hardware
mode: MODE 6 — Design Sheet
part: Part 5 — Division Hardware Assets — All 20 Divisions + Parent
tags:
- prompt
- hardware
- image-prompt
- terminal
- mode-6
- vectorshift
type: prompt
owner: JR Moyler (Hataalii)
device: VectorShift Fleet Command Terminal
source: Hardware Agentic Prompt Catalog
updated: 2026-10-04
division: VectorShift
aspect_ratio: '3:2'
device_class: terminal
agentic_toolkit: 'yes'
---
# VS-P01 VectorShift Fleet Command Terminal — Design Sheet — Prompt

**Device:** VectorShift Fleet Command Terminal · **Mode:** MODE 6 — Design Sheet · **Aspect ratio:** `--ar 3:2`

**Division(s):** [[VectorShift Division]]
**Director agent(s):** [[Director_VectorShift]]
**Catalog location:** Part 5 — Division Hardware Assets — All 20 Divisions + Parent › VectorShift
**Hub:** [[Hardware Agentic Prompt Catalog]]

## Purpose
Generate an annotated full-body design spec sheet of the VectorShift Fleet Command Terminal.

## When to use
Use first, to lock the canonical look, colors and parts of the unit before scenes, pose sheets or video.

## Inputs
- Target model: not stated for this part. The catalog is written for image generation and uses Midjourney-style `--ar` flags.
- No variables. Paste the prompt as written; it ends with its own `--ar` flag.

## Prompt
```
full body VectorShift fleet command terminal hardware design sheet, Void Navy and Velocity Silver chassis, real-time fleet routing display array, drone swarm coordination module, V2V mesh status display, ground and air route optimization visualization, VS eagle circuit emblem, annotation callouts: fleet routing display, drone coordination module, V2V mesh display, route optimizer, white background, logistics command design spec --ar 3:2
```

> [!note] Spelling
> The source writes "Vector Shift". This note uses the vault spelling "VectorShift".

## Expected output
One spec-sheet image with the unit and annotation callouts.
- Callouts to check: fleet routing display, drone coordination module, V2V mesh display, route optimizer.

## Agentic integration (TOOLKIT)
> VectorShift Fleet Commander Agent + route optimization ZenFlow model + V2V mesh API + n8n fleet coordination workflow

Related notes: [[Workflows — VectorShift]]
