---
title: MVP UI Design Rules
tags:
- mvp
- mvp-build-guide
- design
- ui
type: mvp-standard
owner: JR Moyler (Hataalii)
source: MVP Build Guide
updated: 2026-10-04
---
# MVP UI Design Rules

Rules that prevent text overlay, contrast, and formatting issues in the PDF and in the MVP screens.

| Rule | Implementation standard |
|---|---|
| No text overlay | Do not place text on photos, mockups, screenshots, gradients, or busy art. Use solid color cards or caption boxes. |
| Contrast | Body text must sit on white or near-white cards, or on dark solid bands with white text. Avoid mid-tone text over color. |
| Typography | Use Inter/Public Sans-style sans serif. Body 10.5-11pt equivalent in PDF; UI body 14-16px minimum. |
| Layout | 12-column grid, clear margins, cards, dividers, consistent spacing; never shrink text to make content fit. |
| Division branding | Parent shell: void black, gold, cyan. Division pages: add division palette, icons, states, and dashboard rhythm. |
| Exports | Reports and share cards must be generated as clean cards with solid backgrounds and safe margins. |

## Shared app shell

- Left command rail
- Top status bar
- Right AI assistant panel
- Central bento grid
- Role-based dashboards
- Audit log footer
- Export-ready report/card actions

## Design contract

No text over images, no clipped tables, no low-contrast copy, no illegible microtype. All visual emphasis uses solid bands, cards, and swatches.

Related: [[MVP Division Index and Palettes]], [[MVP Build QA Checklist]], [[Design System Bible v3]], [[Division Palettes]], [[Color Locks]]

## Links

- Hub: [[MVP Build Guide]]
