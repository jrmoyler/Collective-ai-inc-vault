---
title: Aegis Protocol Spec
tags:
- zenflow
- governance
- aegis
type: spec
owner: JR Moyler (Hataalii)
updated: 2026-10-04
---
# Aegis Protocol Spec

Governance layer for every ZenFlow output.

| Level | Meaning | Route |
|---|---|---|
| Aegis-Clear | No PII, no financial decisions, no health recommendations | Passes directly |
| Aegis-Review | PII, financial data, health content or legal analysis | Division Director reviews first |
| Aegis-Hold | Possible bias, irreversible action, ethics concern or regulated content | Escalates to ZENITH, then a human |

## Standing constraints
- [[Helios Grid]] stays blocked until [[Juris Guard Division]] issues SEC clearance
- Founder and Co-Founder titles belong only to [[JR Moyler]] and [[Devon Scott]]
- Engagements touching minors, medical data or incarcerated populations escalate to [[Ethics_Executive]] before work starts
- All decisions log to [[Knowledge_Keeper]]

> [!note] Changed Oct 1, 2026
> The independent Civic Core fiduciary veto was removed. Agents no longer route Civic Core policy to a non-overridable veto holder.

## Linked
- [[ZenFlow Master Blueprint]]
- [[Agent Tier Registry]]

## Physical device enforcement
The [[Physical AI Wearables Agent Spec]] extends Aegis to hardware: all physical motion is Aegis-cleared before execution, and physical, network and evidence events enter the same queue as software agents. [[Aegis Protocol Guardian]] runs on 21 of 56 devices. Rules by device: [[Wearables Agent Spec — Aegis Physical Safety Gate]].
