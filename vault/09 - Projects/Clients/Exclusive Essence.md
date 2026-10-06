---
title: Exclusive Essence
tags:
- client
- live
type: client
owner: JR Moyler (Hataalii)
status: live
updated: 2026-10-04
---
# Exclusive Essence

**Client:** [[Quincy Davis]]

Storefront at exclusiveessence.store with Shopify Storefront API, lead capture, GA4 and layaway. SMS marketing and grand opening campaign. UGC ads in Higgsfield (15s, 9:16) with the EE-model.

- Ad CTAs point to exclusiveessence.store, never link in bio

> [!warning] FTC check
> UGC ads built on the AI brand model need a clear AI-generated endorser disclosure. See [[SOP — Content Publishing]].

## FTC disclosure check (CV-011, 2026-10-04)

**Ad set reviewed:** The Drive folder "Exclusive Essence Assets" holds 7 video files. The finished cuts are 10 seconds, 16:9 landscape, not the 15s 9:16 spec in this note. Frames checked at 1s, 5s and 9s carry no disclosure text. The EE-model speaks direct to camera in testimonial style with nothing indicating she is AI-generated.

**Finding:** two separate exposures.
1. Undisclosed AI endorser. The EE-model is an "endorser" under the FTC Endorsement Guides (16 CFR Part 255, June 2023 revision), which expressly cover "virtual influencers," meaning computer-generated fictional characters. Disclosure must be clear and conspicuous: difficult to miss and easily understood by ordinary consumers. When the pitch is delivered both visually and audibly, the disclosure must be delivered both ways (section 255.0(f)).
2. Fake-testimonial risk. The FTC rule on consumer reviews and testimonials (16 CFR Part 465, effective October 2024) prohibits testimonials from people who do not exist or that are AI-generated. A disclosure label does not cure a fake testimonial. If the script has the model recounting personal experience as a customer, the ad violates the rule with or without a label. Civil penalties run $53,088 per violation (16 CFR section 1.98).

**Required fix:** reframe the creative before adding the label. Script the EE-model as a brand presenter, not a customer. She announces the store, the drop, the offer. She never claims personal use or personal results.

**Disclosure spec (written for the 15s 9:16 cut):**
- On-screen text, persistent for the full 15 seconds, large, high contrast, clear of platform chrome: "AI-generated presenter. Paid ad for Exclusive Essence."
- Spoken audio inside the first 3 seconds: "This video features an AI-generated presenter. This is a paid ad for Exclusive Essence."
- Caption: "Paid ad. The presenter in this video is AI-generated, not a real customer. Shop exclusiveessence.store"
- Platform labels: switch on the TikTok AI-generated label and the Meta AI info label at ad creation. Platform labels do not replace the in-creative disclosure.

**Sources:** FTC Endorsement Guides, 16 CFR Part 255 (June 2023), sections 255.0(b), 255.0(f), 255.1; FTC Trade Regulation Rule on Consumer Reviews and Testimonials, 16 CFR Part 465 (effective October 21, 2024); civil penalty 16 CFR section 1.98 ($53,088 per violation, January 2025); FTC .com Disclosures (clear-and-conspicuous standard for video); TikTok ad policy on AI-generated content; Meta AI info label. Full research: workspace/vault/ftc-ai-endorser-research-2026-10-04.md. Research only, not legal advice. Final legal review belongs to Dr. Joseph Johnson.

**Open:** review with Quincy Davis before the next ad runs (needs Jr approval to send). Also confirm the intended role of gemini_generated_video_fff1a04b.mp4 in the assets folder. It depicts a childlike AI-generated figure. If it is part of the ad set, that needs separate review.

## Linked

- [[010 — Clients MOC]]

## Deployment

- Vercel project: `exclusive-essence-shop`
- URL: [exclusiveessence.store](https://exclusiveessence.store)
- Repo: [jrmoyler/exclusive-Essence-](https://github.com/jrmoyler/exclusive-Essence-)
- Framework preset: none detected
- Vercel project created: 2026-07-15
- Last production deploy: 2026-09-11 (READY)

Storefront at exclusiveessence.store. A second project, `exclusive-essence-2`, has no linked repository.

Listed in [[Vercel Projects]].
