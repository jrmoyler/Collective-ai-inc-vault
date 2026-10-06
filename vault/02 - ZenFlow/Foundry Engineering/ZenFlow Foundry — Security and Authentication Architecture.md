---
title: ZenFlow Foundry — Security and Authentication Architecture
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
# ZenFlow Foundry — Security and Authentication Architecture

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
SECTION 09 ◆ SECURITY ARCHITECTURE
NETWORK POLICY
◆ All inter-service communication via Kubernetes ClusterIP — no NodePort or LoadBalancer for internal services
◆ External traffic enters only via Kong API Gateway — all other ingress blocked
◆ Namespace-level network policies: director namespace cannot directly reach marketplace namespace
◆ ZENITH service is the only service with cross-namespace routing permissions
◆ mTLS between all Kubernetes services via Istio service mesh
◆ TLS 1.3 minimum for all external connections
AUTHENTICATION FLOW
# Authentication flow for all API requests
1. Client sends POST /v1/auth/token with API key
2. auth-service validates key against marketplace.licenses
3. Returns JWT (RS256): { sub: client_id, division_id: x, scope: [...], exp: now+86400 }
4. Client sends JWT in Authorization: Bearer header
5. JWTAuthMiddleware validates signature using JWKS public key
6. Scope checked per endpoint:
- Public: no JWT required
- Standard: valid JWT required
- Admin scope: JWT with scope includes "admin"
- Internal JWT: service-to-service with service account claim
SECRETS ROTATION SCHEDULE
SECRET ROTATION PERIOD PROCEDURE
ANTHROPIC_API_KEY 90 days AWS Secrets Manager rotation with zero-downtime key overlap
DATABASE_PASSWORD 30 days AWS RDS automated rotation via SecretsManager
REDIS_AUTH_TOKEN 90 days Manual rotation with blue-green cache flush
JWT_PRIVATE_KEY 180 days RS256 key rotation with 24h JWKS overlap period
STRIPE_API_KEY On compromise Immediate rotation via Stripe dashboard + Secrets Manager update
DATA CLASSIFICATION
CLASSIFICATION EXAMPLES CONTROLS
Public Marketplace listings, agent capability descriptionsNo encryption required beyond TLS
Internal Routing logs, agent performance metrics, cost data Encrypted at rest (AES-256 via AWS RDS)
Confidential Agent system prompts, business logic, client dataEncrypted at rest + field-level encryption for prompts
Restricted — Health (HIPAA)Vital Helix and Eon Core patient/health data HIPAA-compliant RDS config, separate DB cluster, row-level security
Restricted — Financial Quantum Ledger trading data, Stripe billing dataSeparate DB schema, audit logging on every access, Aegis-Review minimum
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 09 — SECURITY ARCHITECTURE. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:2a56ccc380978d8a60be -->
