---
title: CRM Pipeline and Next-Action Protocol
tags:
- drive-source
- district-content
type: playbook
owner: JR Moyler (Hataalii)
updated: 2026-10-06
source_refs:
- id: 1KmmhRprAIx292-6TxoEj-HxRUzXivH9LniP2X5fsqDg
  url: https://docs.google.com/document/d/1KmmhRprAIx292-6TxoEj-HxRUzXivH9LniP2X5fsqDg/edit?usp=drivesdk
  title: 'Collective AI: The CRM & Lead Tracking Playbook'
source_status: source-grounded
source_checked: 2026-10-06
---
# CRM Pipeline and Next-Action Protocol

The source puts process ahead of software: Trello, Asana, Notion or a spreadsheet can implement the same Kanban stages. This does not claim a live board exists in any named tool.

| Stage | Entry condition | Required next record |
|---|---|---|
| Prospects / To Contact | Qualified prospect identified | Source, contact and first-action date |
| Contacted / Awaiting Reply | Authorized first contact sent | Dated interaction and follow-up date |
| In Conversation / Nurturing | Actual reply received | Need, next action and owner |
| Meeting Scheduled / Proposal Sent | Confirmed meeting or delivered proposal | Meeting date or proposal/version |
| On Hold / Future Follow-up | Explicit later timing | Reason and agreed revisit date |
| Closed - Won | Signed agreement | Handoff and payment condition |
| Closed - Lost | Actual decline | Reason for later analysis |

## Card schema
Company / contact / role / email / real profile URL / lead source / relevant service / estimated value and currency / next action date / owner / dated interaction log.

The source's LinkedIn example incorrectly points to a dictionary URL. Store the prospect's actual verified profile or leave it unknown; never import that placeholder as a contact.

## Cadence
The source suggests an initial follow-up after 3–4 business days, then a fresh next-action date after every interaction. Weekly review checks overdue cards, active cards without next dates, dormant conversations and loss reasons. These are proposed operating intervals, not completed contacts.

Move stages only when their real event occurs. Estimated deal value is not booked revenue or collected cash. Record active tasks in the live task system and hand won work to [[SOP — Client Onboarding]].

## Linked
- [[The Collective Division]]


## Source record
- [Collective AI: The CRM & Lead Tracking Playbook](https://docs.google.com/document/d/1KmmhRprAIx292-6TxoEj-HxRUzXivH9LniP2X5fsqDg/edit?usp=drivesdk) — pipeline, card anatomy and workflow.

### Source records
- [Collective AI: The CRM & Lead Tracking Playbook](https://docs.google.com/document/d/1KmmhRprAIx292-6TxoEj-HxRUzXivH9LniP2X5fsqDg/edit?usp=drivesdk)

<!-- drive-expansion:93dc79146c7e9e9619db -->
