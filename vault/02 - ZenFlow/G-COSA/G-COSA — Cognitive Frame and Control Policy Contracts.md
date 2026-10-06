---
title: G-COSA — Cognitive Frame and Control Policy Contracts
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM
  url: https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk
  title: G-COSA Comprehensive Architecture & Blueprint
---
# G-COSA — Cognitive Frame and Control Policy Contracts

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[001 — ZenFlow MOC]]
- [[ZenFlow Master Blueprint]]

## Full source section

```text
7. Core Data Models
GeometricCognitiveFrame
The atomic packet of cognition passed between layers and sent over the ZenFlow Gateway.
class GeometricCognitiveFrame:
   frame_id: str
   timestamp: int
   origin_node_id: str # Identifies which of the 25 Mac Minis generated this frame
   
   # State & Geometry
   raw_state_embedding: list[float]
   regime_chart_id: str
   ricci_scalar: float
   fisher_drift: float
   
   # Reasoning & Emotion
   hglar_tree_id: str
   ambiguity_score: float
   hrm_state_id: str
   erc_state_id: str
   operator_stress: float
   urgency_spike: float
   recommended_interaction_mode: str
   
   # Coordination & Governance
   arcr_coupling_map_id: str
   autonomy_level: int
   human_review_required: bool
   audit_hash: str

ARC-R Coupling State
class ARCRCouplingState:
   agent_ids: list[str]
   division_ids: list[str]
   coupling_mode: str # "coupled", "quarantined", "quiet_mode"
   geometric_compatibility: float
   emotional_friction: float
   operator_stress: float

Symbiotic Control Policy
class SymbioticControlPolicy:
   autonomy_level: int 
   # 0=Observe, 1=Recommend, 2=Execute Reversible, 3=Execute Bounded, 4=Full Autonomy
   reversible_action_limit: float
   explanation_required: bool
   stress_sensitive_mode: bool
   require_confirmation_under_stress: bool
```

## Source
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk) — Section 7 — Core Data Models. Read in full from Drive on 2026-10-06.

### Source records
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk)

<!-- drive-expansion:f4a924dcc8649b2fa68c -->
