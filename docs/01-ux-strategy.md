# 01 — UX strategy

## The problem with the category

HVAC websites sell adjectives. They show stock photographs of smiling technicians, a wall of brand logos, and a quote form that behaves like a lead broker's intake sheet. The buyer's actual question is narrower and more urgent: *can you get here, can you fix it, and will the price change after you arrive?*

The redesign answers those three questions above the fold, then uses the immersive layer to make the company feel like the most technically capable option in the market — not the cheapest.

## Business objective

Increase qualified quote requests and emergency calls while modernising brand perception from "local aircon repair" to "climate engineering partner".

| Goal | Interface mechanism |
| --- | --- |
| Generate leads | Quote wizard, sticky nav CTA, final CTA, phone and WhatsApp everywhere |
| Increase quote requests | Three short steps, no account, no upload, staged WhatsApp handoff |
| Showcase services | Service explorer with scope, capability and outcome per discipline |
| Showcase projects | Horizontal field-record reel with sector, location and measured result |
| Build trust | Real reviews, certifications, since-1994 provenance, documented process |
| Improve conversion | Repeated, varied CTAs; response-time promises; no fake scarcity |

## Audiences

| Audience | Context | Primary job | What earns trust |
| --- | --- | --- | --- |
| Facilities manager | Occupied building, budget holder, SLA pressure | Restore or upgrade a commercial system without disrupting tenants | Response window, documented commissioning, maintenance reporting |
| Restaurant / food producer | Stock at risk, time-critical | Keep the cold chain alive tonight | 24/7 line, 2–4h callout, stock-loss record, refrigeration depth |
| Homeowner | Once-every-few-years purchase, price sensitive | Cool one or two rooms without being oversold | Fixed pricing, brand-agnostic advice, workmanship guarantee |
| Procurement / property group | Multi-site, comparative quotes | Find a contractor who can scale and document | Certifications, project scale, single accountable team |

## Jobs to be done

1. "Get a qualified human to my site fast."
2. "Tell me what is actually wrong before you quote."
3. "Show me you have done this at my scale."
4. "Give me a number I can defend to my boss."
5. "Prove the system will stay running after handover."

## Experience principles

1. **Cold is the brand, not a filter.** Ice, condensation, airflow and precision instrumentation drive layout, copy and motion — not a blue gradient over stock photos.
2. **Instrument, don't decorate.** Every number shown is attributed: ambient, setpoint, response window, measured saving. No invented "99% satisfaction".
3. **One decision per screen.** Each chapter answers one question and ends with one next action.
4. **Motion reveals structure.** Depth, parallax and the freeze state communicate a controlled environment; nothing moves without a reason.
5. **Honest conversion.** No countdowns, no fake scarcity, no lead-broker language. The form stages a message the user controls.
6. **Performance is part of the aesthetic.** A janky "premium" site reads as incompetence. WebGL is capped, deferred and optional.

## Conversion architecture

```
Hero                 → Request a survey / free 15-point check / phone
Clients marquee      → borrowed credibility, no ask
About                → provenance + certification (trust)
Services explorer    → "they do my thing" + scoped CTA
Field records        → proof at scale (commercial) 
Technology           → differentiation (engineering literacy)
Measured outcomes    → quantified proof
Process              → risk removal ("no surprises")
Reviews              → social proof
Coverage             → "they cover me"
FAQ                  → objection handling
Quote wizard         → primary conversion, 3 steps
Final CTA            → last call
```

Emergency path: nav phone / hero WhatsApp / quote aside phone are always one tap away on mobile. Planned path: scroll narrative → service → project → wizard.

## Content strategy

- Lead with the customer's symptom, not the company's history.
- Keep every claim traceable to a published business fact or a labelled illustration.
- Use mono labels for instrumentation; human sentences for reassurance.
- Name real places (Randburg, Sandton, Cape Town) so the page earns local SEO without a keyword wall.

## SEO structure

Single-page narrative with anchor sections plus a planned set of location/service routes (see `02-sitemap.md`). `HVACBusiness` + `WebSite` JSON-LD, service catalogue, opening hours, aggregate rating, geo and `areaServed` are in `index.html`. Target clusters: air conditioning Johannesburg, HVAC South Africa, commercial refrigeration, ventilation systems, cold rooms, cooling solutions.

## Measurement plan

| Event | Definition | Purpose |
| --- | --- | --- |
| `quote_start` | First service chip selected | Measure wizard entry |
| `quote_step` | Step index advanced | Find drop-off step |
| `quote_staged` | Confirmation shown | Intent without send |
| `whatsapp_click` | Any wa.me link | True handoff volume |
| `call_click` | Any tel: link | Emergency demand |
| `service_select` | Explorer row activated | Service demand mix |
| `scroll_depth` | 25/50/75/100% | Narrative completion |

Guardrails: mobile LCP < 2.5s on 4G, INP < 200ms, no layout shift from the chamber readout or font swap, WCAG 2.2 AA for text and controls.
