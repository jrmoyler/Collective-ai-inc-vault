---
title: Wearables Agent Spec — Haptic Code Map
tags:
- physical-ai
- wearables
- haptics
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
---
# Wearables Agent Spec — Haptic Code Map

Haptic patterns stated for wearables in the [[Physical AI Wearables Agent Spec]]. All use the Adafruit DRV2605L Haptic Controller.

| Wearable | Pattern → meaning |
|---|---|
| Zenith Command Band | green pulse → aegis_clear; amber double-tap → aegis_review; red triple → aegis_hold |
| Synaptic Relay Badge | haptic notifications for agent deployment success, Aegis flags for engineering review, JWT rotation alerts; one tap → status check returned as a haptic pattern |
| Herald Badge Node / Herald Consultant Badge | haptic confirmation of receipt / proposal draft landed in Notion |
| Cohort Engagement Badge | gentle single pulse → re-engage |
| Creator Nexus Wearable | haptic pulse → idea saved |
| Alpha Signal Wristband | distinct sequences for buy signal, sell signal, stop hit, Polymarket prediction flip, P&L threshold breach (double-pulse → Polymarket flip in the example); single-press market brief → 3 pulses: position count, P&L direction, risk level |
| Kinetic IQ Wearable | single → pace up; double → form correction; triple → stop and reset |
| Threat Intel Wearable | three patterns → cyber threat, physical threat, system health |
| Embodied AI Control Wearable | resistance sensations at joint limits (force feedback) |
| Flight Ops Wearable | single → GPS lock; double → motors armed; triple → Aegis hold; also waypoint reached, battery warning, geofence breach; single press → voice status from the Zenith Oracle Shell |
| Habit Architecture Wearable | timed nudges; post-nudge motion captured as response signal |
| Neuro-Pulse Wristband | single → you're in flow; double → optimal break timing; cues for focus start, distraction, cognitive load peak, recovery |

Related: [[Wearables Agent Spec — Device Data Flow]], [[Wearables Agent Spec — Aegis Physical Safety Gate]].
