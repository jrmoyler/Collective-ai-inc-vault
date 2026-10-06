---
title: ZenFlow Foundry — Container and Cluster Configuration
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
# ZenFlow Foundry — Container and Cluster Configuration

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
SECTION 06 ◆ DOCKER & KUBERNETES CONFIGURATION
Kubernetes: 1.28 · Cluster: AWS EKS — eu-west-1 primary, us-east-1 DR
STANDARD DOCKERFILE (All Services)
# Standard Dockerfile for all ZenFlow services
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .
# Non-root user — security requirement
RUN useradd -m -u 1001 zenflow && chown -R zenflow:zenflow /app
USER zenflow
# Health check — all services expose /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD curl -f http://localhost:${PORT}/health || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${PORT}", "--workers", "4"]
KUBERNETES DEPLOYMENT TEMPLATE (Director Service — Replicated ×20)
# Director Service Deployment (replicated for all 20 divisions)
apiVersion: apps/v1
kind: Deployment
metadata:
name: director-service-{DIVISION_NAME}
namespace: zenflow
labels:
app: director-service
division: "{DIVISION_NAME}"
tier: "2"
spec:
replicas: 1
selector:
matchLabels:
app: director-service
division: "{DIVISION_NAME}"
template:
metadata:
labels:
app: director-service
division: "{DIVISION_NAME}"
spec:
containers:
- name: director
image: collectiveai/director-service:latest
ports:
- containerPort: 8100
env:
- name: DIVISION_ID
value: "{DIVISION_ID}"
- name: ANTHROPIC_API_KEY
valueFrom:
secretKeyRef:
name: anthropic-credentials
key: api-key
- name: DATABASE_URL
valueFrom:
secretKeyRef:
name: db-credentials-{DIVISION_NAME}
key: connection-string
- name: REDIS_URL
valueFrom:
secretKeyRef:
name: redis-credentials
key: cluster-url
resources:
requests:
cpu: "500m"
memory: "512Mi"
limits:
cpu: "2000m"
memory: "2Gi"
livenessProbe:
httpGet:
path: /v1/status
port: 8100
initialDelaySeconds: 15
periodSeconds: 30
readinessProbe:
httpGet:
path: /v1/status
port: 8100
initialDelaySeconds: 5
periodSeconds: 10
HORIZONTAL POD AUTOSCALER (ZENITH Service)
# Horizontal Pod Autoscaler for high-traffic services
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
name: zenith-service-hpa
namespace: zenflow
spec:
scaleTargetRef:
apiVersion: apps/v1
kind: Deployment
name: zenith-service
minReplicas: 2
maxReplicas: 10
metrics:
- type: Resource
resource:
name: cpu
target:
type: Utilization
averageUtilization: 70
- type: Resource
resource:
name: memory
target:
type: Utilization
averageUtilization: 80
KUBERNETES NAMESPACE STRATEGY
NAMESPACE CONTENTS
zenflow ZenFlow core services: zenith-service, agent-foundry, knowledge-keeper, aegis-service
directors All 20 Director services — isolated namespace for division agent containers
marketplace ZenFlow Marketplace service — publicly accessible, separate network policy
infrastructure Binary Loom observability: Prometheus, Grafana, OpenTelemetry collector
monitoring Alert manager, Grafana dashboards, PagerDuty webhook integrations
SECRETS MANAGEMENT
◆ AWS Secrets Manager for all API keys (Anthropic, Stripe, Twilio, external APIs)
◆ Kubernetes Secrets for database connection strings and Redis URLs
◆ External Secrets Operator syncing AWS Secrets Manager to Kubernetes Secrets
◆ Secret rotation: Anthropic API key rotated every 90 days, DB passwords every 30 days
◆ No secrets in environment variables for production — all via mounted secret volumes
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 06 — DOCKER & KUBERNETES CONFIGURATION. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:b64ecba734bc914e36cb -->
