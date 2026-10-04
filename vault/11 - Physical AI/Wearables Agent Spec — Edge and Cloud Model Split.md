---
title: Wearables Agent Spec — Edge and Cloud Model Split
tags:
- physical-ai
- wearables
- edge-compute
- models
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
---
# Wearables Agent Spec — Edge and Cloud Model Split

Which Anthropic model each device in the [[Physical AI Wearables Agent Spec]] lists. Model strings are kept as written; current routing is in [[Agent Tier Registry]].

## claude-haiku-4-5 (19 devices)
- Herald Badge Node (transcription)
- Atlas Perception Tower (edge inference)
- Synaptic Relay Badge
- Knowledge Keeper Vault Node (embedding)
- Workshop Presence Node (edge inference)
- Cohort Engagement Badge (engagement analysis)
- Field Learning Kit (edge inference)
- Vision Director Node (clip metadata)
- Creator Nexus Wearable (tagging)
- Documentary Capture Rig (scene metadata)
- Market Intelligence Field Kit (edge)
- Kinetic IQ Wearable (cue logic)
- Team OS Field Station (observation processing)
- Sentinel Prime Tower (edge inference)
- Forensic Evidence Node (context tagging)
- Sky Vector Dev Drone (mission planning)
- Habit Architecture Wearable (nudge optimization)
- Psychographic Field Kit (edge inference)
- Neuro-Pulse Wristband (cognitive load inference)

## claude-sonnet-4-6 (23 devices)
- Zenith Command Band
- Aegis Command Station
- Zenith Oracle Voice Shell
- CORTEX Director Shell
- Agent Eval Bench
- Herald Consultant Badge (proposal drafting)
- Client Intelligence Terminal
- Strategy Scan Node (structure extraction)
- AI Audit Wearable Kit (report generation)
- Atlas Learning Kiosk
- Instructor Capture Node (concept extraction)
- P.E.T.E.E.R. Assessment Node
- Resonance Studio Node (content generation)
- Collective Times Broadcast Node
- Aurum Trading Terminal (signal analysis)
- Chain Ledger Node
- Institutional Briefing Node (report authoring)
- Apex Motion Cage (profile generation)
- Recovery Intelligence Node (load recommendation)
- Scout Intelligence Terminal (profile generation)
- Prime Shell v0.1 (conversation)
- Cognitive Coaching Shell (coaching dialogue)
- Behavioral Sensing Station (tone + pattern analysis)

## claude-opus-4-6 (2 devices)
- Aegis Command Station
- CORTEX Director Shell

## No Anthropic model listed
- Mesh Sentinel Array
- ZenFlow Meshtastic Gateway
- Alpha Signal Wristband
- Cipher Guardian Rack
- Threat Intel Wearable
- SOC Intelligence Terminal
- Titan Bench Arm
- Dexterous Hand Node
- Mobile Base Rover
- Embodied AI Control Wearable
- Ground Vector Rover
- Logistics Mesh Node
- Aerial Mesh Relay Drone
- Flight Ops Wearable

## Pattern in the spec
- claude-haiku-4-5 is listed for edge inference, transcription, embedding, tagging, cue logic, nudge optimization and mission planning, mostly on wearables, perception masts and field kits.
- claude-sonnet-4-6 is listed for drafting, report authoring, profile generation, coaching dialogue and signal analysis on desk terminals.
- claude-opus-4-6 is listed only on the Aegis Command Station and CORTEX Director Shell, alongside sonnet.

## Offline-capable devices
- Field Learning Kit: AI Tutor and P.E.T.E.E.R. run locally on NVMe, no internet required.
- Market Intelligence Field Kit: Quantum Alpha Signal Agent on local cache with NVMe-cached market data.
- Psychographic Field Kit: coaching sessions on local inference, no internet required.
- Atlas Learning Kiosk: works offline via the local Foundry cloud.
- Mesh devices (Mesh Sentinel Array, Logistics Mesh Node) relay without internet.

## Edge compute hardware
- NVIDIA Jetson Orin Nano Super appears on 19 devices.
- Raspberry Pi 5 appears on 35 devices.

Related: [[Wearables Agent Spec — Device Data Flow]].
