---
title: ZenFlow Foundry — Release and Rollback Pipeline
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO
  url: https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk
  title: Collective_AI_Agent_Foundry_Config_Spec.pdf
---
# ZenFlow Foundry — Release and Rollback Pipeline

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[ZenFlow Master Blueprint]]
- [[ZenFlow Agent Foundry]]
- [[001 — ZenFlow MOC]]

## Full source section

```text
SECTION 08 ◆ CI/CD PIPELINE
Platform: GitHub Actions + ArgoCD
1. Lint & Static Analysis | Trigger: Every PR and push to main
Tools: ruff (Python linting), mypy (type checking), bandit (security scanning), hadolint (Dockerfile linting)
Gate: All checks must pass — no merges on lint failure
2. Unit Tests | Trigger: Every PR and push to main
Tools: pytest with asyncio support, pytest-cov (minimum 80% coverage gate), httpx for FastAPI endpoint
testing
Gate: Coverage >= 80% and all tests pass
3. Integration Tests | Trigger: Push to main only
Tools: Docker Compose test environment (Postgres + Redis + all services), pytest integration test suite,
Agent mock responses using recorded Claude API fixtures
Gate: All integration tests pass with real PostgreSQL and Redis
4. Docker Build & Push | Trigger: Push to main (after tests pass)
Tools: Docker BuildKit, AWS ECR for image registry, Image signing with AWS Signer
Gate: Build must succeed and image digest recorded
5. Staging Deployment | Trigger: Successful Docker build
Tools: ArgoCD (GitOps), Helm charts per service, Automated smoke tests against staging
Gate: Smoke tests pass in staging environment
6. Production Deployment | Trigger: Manual approval in GitHub Actions (JR or Binary Loom lead)
Tools: ArgoCD progressive delivery (canary: 10% → 30% → 100%), Automated rollback on error rate spike,
Deployment notification to #deployments Slack channel
Gate: Manual approval + canary health check passing
ROLLBACK PROCEDURE
◆ ArgoCD detects error rate > 5% during canary → automatic rollback to previous image
◆ Manual rollback: argocd app set --revision
◆ Database migrations: all migrations are backward-compatible — never drop columns in the same migration that removes them from
code
◆ Agent prompt rollbacks: agents.agent_registry stores all prompt versions — revert by updating system_prompt_version column
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 08 — CI/CD PIPELINE. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:fe39d5cc65eb3e34fcad -->
