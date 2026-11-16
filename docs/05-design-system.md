# 05 — Design system

Source of truth: `src/styles/tokens.css`. Every value below is implemented; no orphan styles.

## Concept

A climate-controlled chamber rendered as an instrument panel: near-black air, arctic light, cyan measurement. Glass is structural, not decorative — panels read as insulated viewports onto the system.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#04080b` | Page ground |
| `--ink-soft` | `#070d11` | Alternating band |
| `--panel` | `#091116` | Raised panel base |
| `--arctic` | `#f2fafc` | Primary text, solid buttons |
| `--ice` | `#9adff2` | Emphasis, metrics, labels |
| `--ice-deep` | `#5cc2dd` | Secondary accent |
| `--cyan` | `#46e6ff` | Live state, focus, progress, glow |
| `--silver` | `#a7bac2` | Body on dark |
| `--muted` | `#7e949d` | Secondary copy, labels |
| `--line` | `rgba(168,214,229,.14)` | Structure |
| `--line-soft` | `rgba(168,214,229,.065)` | Dividers |
| `--danger` | `#ff8f7a` | Validation |

Usage ratio: 78% ink grounds, 14% arctic/silver text, 6% ice surfaces, 2% cyan signal. Cyan is never a background wash — it marks state.

Semantic temperature scale (SVG only): `#8fe6fb` cold → `#46e6ff` setpoint → `#ffb489` heat rejection.

## Typography

| Role | Family | Weight | Size | Tracking |
| --- | --- | --- | --- | --- |
| Display | Sora | 200 | clamp(2.9rem, 9.6vw, 8.75rem) | −0.055em |
| Section title | Sora | 300 | clamp(2.15rem, 4.6vw, 4.35rem) | −0.04em |
| Statement | Sora | 200 | clamp(1.45rem, 2.55vw, 2.15rem) | −0.035em |
| Body | Sora | 300 | 0.94–1.28rem | −0.005em |
| Label | JetBrains Mono | 400 | 0.5–0.7rem | 0.14–0.3em, uppercase |
| Metric | Sora | 200 | 2.9–4.8rem | −0.06em, tabular |

Rules: display copy is never bold; emphasis is colour, not weight. Mono labels are always uppercase with a leading dot where they mark live state. Numbers use tabular figures.

## Spacing and grid

- Shell max-width `1560px`; gutter `clamp(1.15rem, 4.2vw, 4.75rem)`.
- Section rhythm `clamp(5.5rem, 12vh, 10.5rem)`.
- Layouts: 2-col split at 900–1000px, 4-col metric band at 1080px, 3-col review wall at 900px.
- Hero uses a 12.5vw hairline grid, masked to a radial ellipse.

## Radii and elevation

| Token | Value | Use |
| --- | --- | --- |
| `--radius-xs` | 10px | Inputs, chips |
| `--radius-sm` | 14px | Readouts |
| `--radius-md` | 20px | Cards, reviews |
| `--radius-lg` | 28px | Boards, panels |
| `--radius-xl` | 36px | Quote shell |
| `--shadow-soft` | `0 24px 60px -30px #000` | Glass base |
| `--shadow-lift` | 40/90 + 1px ring | Hover elevation |

## The glass recipe

```css
background: linear-gradient(152deg,
  rgba(196,240,252,.075),
  rgba(196,240,252,.012) 46%,
  rgba(196,240,252,.03));
border: 1px solid rgba(168,214,229,.14);
backdrop-filter: blur(18px) saturate(118%);
box-shadow: inset 0 1px 0 rgba(255,255,255,.055), 0 24px 60px -30px #000;
```

A screen-blend `::after` adds a top-left highlight and a faint cyan lower-right return. Children are lifted to `z-index: 1` so content never sits under the sheen. Fallback: solid `#0b1419` where `backdrop-filter` is unsupported.

## Components

| Component | Anatomy | States |
| --- | --- | --- |
| Button | pill, 52/42px, label + arrow | default, hover glow, active press, focus ring |
| Ghost button | glass border, blur | hover cyan border, focus |
| Magnetic | outer hit area + inner transform | pointer-driven 0.22 strength |
| Tilt | perspective wrapper | ±4.5°, springs back |
| Glass card | gradient, border, blur, sheen | hover border + lift |
| Chip | mono, pill, hairline | hover cyan, active ice fill |
| Service row | index, title, tagline, arrow | hover wash, selected ice + rotated arrow |
| Chamber readout | status dot, setpoint, rows, bar | nominal / holding |
| Metric | huge gradient number + label + detail | count-up on view |
| Accordion | native details, +/− ring | open rotates, cyan ring |
| Choice | chip with tick | pressed state, focus |
| Input | dark field, hairline | focus cyan ring, invalid coral |
| Wizard step | mono label over hairline | idle, active, done |
| Sonar node | 5px dot + expanding ring | continuous, pulsing |
| Marquee | duplicated track | hover pauses |

## Iconography and graphics

- Stroke icons, 1.2–1.25px, round caps, 16px grid.
- Brand mark: hexagon + six-spoke snowflake, 30px, cyan with 10px glow.
- Technical plates use hairlines, 8px mono labels, dashed flow paths and a measurement rule — never skeuomorphic chrome.
- No emoji in the shipped UI; no stock icon sets.

## Accessibility

- Text contrast: arctic on ink 18.6:1; silver 8.4:1; muted 5.1:1; cyan on ink 11.7:1.
- Focus: 2px cyan outline, 4px offset, visible on all interactive elements.
- Target size: 42px minimum for controls; 52px primary buttons.
- Toggles expose `aria-pressed`; wizard confirmation is `role="status"`; errors are `role="alert"`.
- WebGL is `aria-hidden`; no information exists only in canvas.
- Reduced motion: transitions/animations disabled, Lenis off, counters instant, freeze static.

## Motion tokens

`--ease-out` `cubic-bezier(.16,1,.3,1)`, `--ease-io` `cubic-bezier(.65,0,.35,1)`, `--ease-spring` `cubic-bezier(.34,1.56,.64,1)`. Durations 220/520/900ms; reveals 950ms + 80–740ms stagger. Full spec in `08-motion-architecture.md`.

## Sound and imagery

No sound. Imagery is generated technical art until client photography lands (see `12-assets.md`); any future photograph must be cool-graded, desaturated 10–15%, with cyan bounce light and no smiling-stock-photo energy.
