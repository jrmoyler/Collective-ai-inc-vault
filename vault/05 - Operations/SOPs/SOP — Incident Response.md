---
title: SOP — Incident Response
tags:
- sop
- ops
type: sop
owner: JR Moyler (Hataalii)
status: active
updated: 2026-10-04
researched: 2026-10-04
---
# SOP — Incident Response

**Owner:** [[Director_Obsidian_Arc]] (SENTINEL) · **Escalation:** [[ZENITH]] → JR · **Framework:** NIST SP 800-61 Rev. 3 (April 2025), built on CSF 2.0

## Before an incident (Govern, Identify, Protect)
- [ ] Contact sheet: JR, Devon, Ahmad, outside counsel, cyber insurer, hosting providers
- [ ] Asset list: domains, Vercel projects, Supabase databases, Airtable bases, n8n, API keys
- [ ] MFA on every admin account. Keys in a secrets manager
- [ ] Written security program mapped to a recognized framework. Ohio's Data Protection Act gives an affirmative defense in breach lawsuits to companies that keep one
- [ ] Backups tested quarterly

## Severity levels
| Level | Example | Response time |
|---|---|---|
| SEV1 | Client or personal data exposed, production down, agent took an unapproved financial or physical action | Within 1 hour, JR informed |
| SEV2 | Credential leak without confirmed misuse, Aegis-Hold breach, one client affected | Same day |
| SEV3 | Bug or policy slip with no data exposure | Next business day |

## During an incident (Detect, Respond)
1. **Detect and log.** Open an incident note with time, reporter and what was seen
2. **Triage.** Set severity and name an incident lead
3. **Contain.** Revoke keys, disable the agent or workflow (kill switch), isolate affected systems
4. **Preserve evidence.** Keep logs and screenshots before changing anything else
5. **Eradicate.** Remove the cause and patch
6. **Recover.** Restore from clean backups, watch for repeat activity

## Notification (Ohio)
- [ ] If computerized personal information of Ohio residents was exposed (name plus SSN, driver's license or state ID number, or account or card number with its access code, unencrypted), notify affected residents as fast as possible and **no later than 45 days** after discovery
- [ ] If more than 1,000 Ohio residents are affected, also notify the nationwide consumer reporting agencies without unreasonable delay
- [ ] If Collective AI holds the data for a client, notify that client so they can notify their customers
- [ ] Check other states' laws for any non-Ohio residents affected

## After (Recover, Improve)
- [ ] Post-incident review within 5 business days: timeline, root cause, what worked, fixes
- [ ] Update this SOP, [[SOP — Agent Deployment Checklist]] and the security program
- [ ] Track mean time to detect and mean time to contain

## Sources
- [NIST SP 800-61 Rev. 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf)
- [Ohio Rev. Code 1349.19](https://codes.ohio.gov/ohio-revised-code/section-1349.19)

## Linked
- [[005 — Operations MOC]]
