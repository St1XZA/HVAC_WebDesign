# 03 — User journey map

## Planned purchase — homeowner

| Stage | Mindset | Touchpoint | Design response | Friction removed |
| --- | --- | --- | --- | --- |
| Arrive | "Is this a real company?" | Hero | Since 1994, 1,000+ installs, 4.9★, real phone number | No stock-photo trust gap |
| Orient | "Do they do split units?" | Hero lede → Services | 7 disciplines, plain-language scope | No PDF brochure |
| Evaluate | "Will they upsell me?" | About + Process | Fixed pricing before work, guarantee, certifications | Price anxiety |
| Compare | "Are they any good?" | Field records + reviews | Named locations, measured outcomes, verified quotes | Generic testimonial wall avoided |
| Decide | "What happens next?" | Quote wizard | 3 steps, progress, no account | Long intake forms |
| Convert | "Send it" | Staged WhatsApp message | One tap, message visible, call fallback | Broken form / no reply |
| Confirm | "Did it work?" | Confirmation panel | Summary of service, site, urgency, contact | Uncertainty |

## Emergency — restaurateur with a warm cold room

| Stage | Mindset | Touchpoint | Design response |
| --- | --- | --- | --- |
| Panic | "Stock is dying" | Sticky nav | Phone visible at all widths; WhatsApp one tap |
| Qualify | "Do they do refrigeration at night?" | Hero / nav / quote aside | "24/7", "2–4 hour metro", cold rooms named first |
| Act | "Get someone now" | `tel:` or WhatsApp | Zero-form path, no wizard required |
| Reassure | "Will they actually come?" | Review wall + project record | Midnight cold-room recovery with R0 stock lost |

Emergency users never need the narrative. Every screen keeps a direct line within one tap.

## Commercial — facilities manager

| Stage | Mindset | Touchpoint | Design response |
| --- | --- | --- | --- |
| Research | "Can they handle 3 floors?" | Work reel | Sandton 3-floor fit-out, 28% saving, zero disruption |
| Due diligence | "Are they certified and insured?" | About | SAQCC, PIRB, licensed refrigeration engineers, fully insured |
| Technical fit | "Do they understand load and controls?" | Technology | Vapour-compression loop, inverter control, measured verification |
| Risk | "What does maintenance look like?" | Process + FAQ | SLA, written reporting, 4-hour priority response |
| Procure | "Give me a scoped quote" | Wizard step 1–2 | Discipline + property type + urgency + area |
| Handoff | "Route me to an engineer" | Confirmation | Explicit "engineer, not a bot" promise |

## Emotional curve

```
Curiosity ──► Awe ──► Recognition ──► Confidence ──► Urgency ──► Relief
  hero       scroll    services        proof          wizard     staged send
```

The freeze state intentionally slows the page when the visitor stops interacting: it creates a beat of stillness before the first CTA, which reads as confidence rather than eagerness.

## Failure modes designed out

| Failure | Mitigation |
| --- | --- |
| WebGL unsupported / slow | CSS atmosphere behind canvas; dynamic import; pause off-screen |
| Motion sensitivity | Full reduced-motion path, no essential information in motion |
| Form fatigue | 3 steps, chips over typing, only 2 required fields at the end |
| No backend / lead loss | WhatsApp + mailto + phone fallbacks, message preview |
| Mobile squeeze | Purpose-built mobile layouts: compact readout, swipe reel, single-column wizard |
| Distrust of claims | Sourced reviews, labelled illustrative model, no fake countdowns |
