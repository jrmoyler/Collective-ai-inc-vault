---
title: G-COSA — MELD and ERC Affective-Social Sensing Design Contract
tags:
- source-specification
- historical-plan
type: reference-spec
owner: JR Moyler (Hataalii)
status: source-planned
updated: 2026-10-06
source_refs:
- id: 1Ypk8cIYlzkfxesAJFNXwDfFls9y2-22O
  url: https://drive.google.com/file/d/1Ypk8cIYlzkfxesAJFNXwDfFls9y2-22O/view?usp=drivesdk
  title: gcosa_agentic_design_spec.pdf
---
# G-COSA — MELD and ERC Affective-Social Sensing Design Contract

> [!info] Research architecture, not deployed behavior
> Source v1.0 defines mathematical models and software contracts. Claims about available simulators or curvature priors require verification; advanced geometry/affective sensing is a research plan. Corrected hardware allocation remains in [[G-COSA — Physical Compute Matrix]]. Current oversight follows [[Agent Tier Registry]].

## Source contract
```text
2.8 MELD/ERC Affective-Social Sensing
MELD-style Emotion Recognition in Conversation (ERC) provides the system with real-time awareness
of human emotional and conversational state. It operates over text, audio, and behavioral signals when
available.
ERC outputs are mapped to operational affect signals:
Emotion Signal Operational Affect System Response
Frustration / confusion operator_stress Compress explanation, reduce options
Hesitancy / correction trust_drop Expose evidence, show reasoning path
Rapid interruption urgency_spike Prioritize safe reversible actions
High correction rate coordination_friction Create separate HGLAR branches
Low response latency decision_fatigue Require confirmation, slow pace
ERC State Data Model
class ERCState:
 conversation_id: str
 timestamp: int
 participants: list[str]
 active_speaker_id: str
 primary_emotion: str
 emotion_distribution: dict[str, float]
 emotional_intensity: float
 emotional_velocity: float
 operational_affect: dict[str, float]
 # operator_stress, decision_fatigue,
 # trust_drop, urgency_spike,
 # coordination_friction
 confidence: float
 human_review_bias: float
```

## Linked
- [[ZenFlow Division]]
- [[001 — ZenFlow MOC]]

## Source
- [gcosa_agentic_design_spec.pdf](https://drive.google.com/file/d/1Ypk8cIYlzkfxesAJFNXwDfFls9y2-22O/view?usp=drivesdk) — Section 2.8 MELD/ERC Affective-Social Sensing. Reviewed 2026-10-06.

### Source records
- [gcosa_agentic_design_spec.pdf](https://drive.google.com/file/d/1Ypk8cIYlzkfxesAJFNXwDfFls9y2-22O/view?usp=drivesdk)

<!-- drive-expansion:d5422c6307803d4e2246 -->
