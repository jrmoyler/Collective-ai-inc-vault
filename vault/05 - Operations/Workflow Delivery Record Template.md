---
title: Workflow Delivery Record Template
tags:
- drive-source
- district-content
type: template
owner: JR Moyler (Hataalii)
updated: 2026-10-06
source_refs:
- id: 1_lEwtlwI1FqW17nZVwIcGQSYc3iUlTPF
  url: https://drive.google.com/file/d/1_lEwtlwI1FqW17nZVwIcGQSYc3iUlTPF/view?usp=drivesdk
  title: Collective_AI_Learning_Build_Curriculumpdf
- id: 1TthEJ514_JKA_Hmqy4ywVDYs65BJvgSo
  url: https://drive.google.com/file/d/1TthEJ514_JKA_Hmqy4ywVDYs65BJvgSo/view?usp=drivesdk
  title: Collective_AI_n8n_Workflow_Blueprint_Library.pdf
source_status: source-grounded
source_checked: 2026-10-06
---
# Workflow Delivery Record Template

## Specification
| Field | Complete before activation |
|---|---|
| Workflow ID, name and version | Stable ID and exported revision |
| Owner and division | Person accountable for failures |
| Trigger | Event, schedule, timezone or manual entry |
| Input data | Required fields, origin and example |
| Step sequence | Node order and branch conditions |
| Tools and endpoints | Named services and auth scopes |
| Human gates | Review/hold condition and reviewer |
| Output | Stored record or external deliverable |
| Logs | Execution start/end, decisions and errors |
| Error handling | Failure branches and escalation |
| Retry policy | Attempts, backoff and duplicate-action treatment |
| Aegis status | Clear, Review or Hold with reasoning |
| Test cases | Expected success, invalid input, denied access and downstream failure |

## Evidence to attach
- [ ] Canvas purpose/trigger/owner note.
- [ ] No credentials pasted into a node or note.
- [ ] Every failure branch reaches the shared error handler.
- [ ] Test execution record and resulting Knowledge Keeper log.
- [ ] Human review cannot be bypassed by a retry.
- [ ] External actions match the user's authorized scope.
- [ ] Current dependency and host versions recorded.

The form fields follow the curriculum's new-workflow template. The conventions come from the n8n library. This template does not activate or send any workflow. See [[n8n Workflow Blueprint]].

## Linked
- [[Binary Loom Division]]


## Source record
- [Collective_AI_Learning_Build_Curriculumpdf](https://drive.google.com/file/d/1_lEwtlwI1FqW17nZVwIcGQSYc3iUlTPF/view?usp=drivesdk) — curriculum p. 22, new workflow template; blueprint p. 2.
- [Collective_AI_n8n_Workflow_Blueprint_Library.pdf](https://drive.google.com/file/d/1TthEJ514_JKA_Hmqy4ywVDYs65BJvgSo/view?usp=drivesdk) — curriculum p. 22, new workflow template; blueprint p. 2.

### Source records
- [Collective_AI_Learning_Build_Curriculumpdf](https://drive.google.com/file/d/1_lEwtlwI1FqW17nZVwIcGQSYc3iUlTPF/view?usp=drivesdk)
- [Collective_AI_n8n_Workflow_Blueprint_Library.pdf](https://drive.google.com/file/d/1TthEJ514_JKA_Hmqy4ywVDYs65BJvgSo/view?usp=drivesdk)

<!-- drive-expansion:b7d751a181d916212cc6 -->
