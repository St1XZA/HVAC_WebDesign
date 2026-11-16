# 14 — Visual direction

Companion to the interactive board: [`visual-direction.html`](visual-direction.html) (open directly in a browser).

## One line

**A cold chamber instrumented by engineers** — near-black air, arctic light, cyan measurement, glass you could put your hand through.

## References, not templates

The brief named the GetLayers family — Ridgeline, Aurora, Helix, Horizon, Frost, Pulse, Zenith — as inspiration. Nothing is copied. What was taken is structural discipline:

| Reference quality | How it appears here |
| --- | --- |
| Editorial scale | Display type at 9.6vw with tight tracking and generous negative space |
| Layered depth | Two-scene WebGL, stacked glass panels, pinned horizontal reel |
| Technical detail | Mono labels, coordinates, setpoints, schematic plates, measured outcomes |
| Restrained palette | Ink + arctic + one signal cyan; no rainbow gradients |
| Physical motion | Damped, weighted, interruptible; no decorative float |

Apple contributes restraint, Tesla and Rivian contribute material confidence, Stripe contributes information clarity, Linear contributes product-grade polish, Dyson contributes engineering specificity. None of their layouts or assets are reused.

## Composition

- **Asymmetry with a spine.** Content sits on a 1560px shell, but the hero, about and quote chapters deliberately off-balance their columns.
- **Hairlines, not boxes.** Structure comes from 1px rules, measured ticks and grid lines; cards are exceptions, not the default.
- **Full-bleed atmosphere, contained reading.** The fog and schematic can bleed; paragraphs never exceed 52ch.
- **One giant numeral or metric per chapter** to anchor the eye (setpoint, −28%, 30+).
- **Generous vertical silence** before the quote chapter.

## Palette in practice

```
78%  #04080b / #070d11     grounds
14%  #f2fafc / #a7bac2     type
 6%  #9adff2 / #5cc2dd     emphasis and glass tint
 2%  #46e6ff               live state only
```

Cyan never fills a large area. If a screen reads "blue website", the ratio is wrong.

## Typography

- Sora 200 for display — light enough to feel engineered, not editorial.
- Sora 300 for body — airy at 1.6 line-height.
- JetBrains Mono for all instrumentation; uppercase with 0.14–0.3em tracking.
- Emphasis is colour (`--ice`), never bold or italic.
- Numbers are tabular and often enormous; they are the proof.

## Material

Glass is a viewport into a cold system: 7.5% white at the top-left, 1.2% at the centre, 3% at the bottom-right, 18px blur, 1px cyan-tinted edge, inner top highlight. No heavy drop shadows except on lift.

Frost is physical: it accumulates at edges, blurs the field, cools the light and slows motion. It never covers text enough to hurt reading (max 30% shader mix plus a masked CSS layer).

## Imagery direction

Cold, specific, unglamorous engineering. Frost on a coil, condensation on a pipe, a plant room at blue hour, a technician's gloved hand on a gauge. No stock smiles, no handshakes, no generic city skylines. Until those photographs exist, generated technical plates are used — and they are labelled as plates, not passed off as job photos.

## Motion feel

- Heavy things move slowly and settle (frost, glass layers, fog).
- Small things respond instantly (ticks, arrows, focus rings).
- The page should feel pressurised, not bouncy.
- Nothing loops in the reader's peripheral vision except the ambient field and the client marquee.

## What to avoid

- Neon-on-black "gamer" gradients and glow on every element.
- Glassmorphism as decoration with no hierarchy.
- Fake urgency, invented awards, stock reviews, mystery-meat statistics.
- Text parallax, custom cursors, autoplay video with sound.
- Cards inside cards inside cards; drop shadows doing the work of layout.
- A mobile layout that is just the desktop squeezed.

## Quality bar

Every screen must survive a still screenshot: clear hierarchy, one focal point, legible type, intentional negative space. The motion is a bonus, not a crutch.
