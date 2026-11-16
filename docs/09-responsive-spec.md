# 09 — Responsive specification

## Breakpoints

| Name | Range | Layout intent |
| --- | --- | --- |
| Mobile | 320–639px | Purpose-built single column; compact instrumentation |
| Large mobile | 640–767px | 2-col chips/fields, same narrative |
| Tablet | 768–999px | Hero chamber visible, 2-col about/cases |
| Desktop | 1000–1279px | Full two-column chapters, pinned work reel |
| Wide | 1280px+ | Side rails, larger stage, max shell 1560px |

Fluid type and spacing use `clamp()` rather than breakpoint jumps, so there is no "in-between" dead zone.

## Global

- Shell: full width minus `clamp(1.15rem, 4.2vw, 4.75rem)` per side; max 1560px.
- Nav height 78px; mobile menu locks body scroll and covers the viewport below the nav.
- No horizontal overflow at 320px; all wide content (SVG plates, marquee, reel) is clipped or scrolls intentionally.
- Tap targets ≥ 42px; primary buttons 48px on mobile.
- Safe areas respected through `viewport-fit=cover` and normal flow (no fixed bottom bars).

## Section behaviour

### Hero

| | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| Layout | single column | copy + full-width chamber | copy + 316px chamber |
| Chamber | hidden; compact readout line replaces it | visible below copy | right column |
| Title | 2.9–4rem | 5–6rem | up to 8.75rem |
| Stats | 2×2 grid | 4 columns | 4 columns |
| Frost | CSS + shader | both | both |
| Cue / rails | hidden | hidden | cue at 1000px, rails at 1280px |

### Clients

Single-row marquee at all widths; 48s loop; paused on hover; static under reduced motion.

### About

- Mobile: single column, title → statement → body → certs → layers → plate.
- Tablet: single column with layers offset by 0–92px.
- Desktop: 0.92/1.08 split, sticky-free; layers keep staggered indents and scroll lag.

### Services

- Mobile: list of seven rows; tagline hidden below 720px; panel below the list, not sticky.
- Tablet: same, panel full width.
- Desktop: 1.18/0.82 split, panel sticky under the nav at 1000px.

### Work

- ≤900px: `.work__pin` height auto, stage static, track becomes `overflow-x:auto` with snap; cards 84vw, min-height 470px; progress hidden.
- >900px: pinned chapter (100svh + 190vh), vertical scroll drives horizontal travel; card width `min(74vw, 620px)`, height `min(60vh, 540px)`.
- The reel recomputes travel on resize and after fonts settle.

### Technology

- Mobile/tablet: schematic board then controls; schematic scales with viewBox, labels remain legible at 360px via SVG scaling.
- Desktop: 1.22/0.78 split.
- Gauge ring uses a fixed 96px SVG so it never reflows.

### Cases

1 column <640px, 2 columns 640–1079px, 4 columns 1080px+. Divider logic changes per breakpoint so no double borders appear.

### Process

Vertical stack with no rail under 860px. At 860px+, four columns with a scroll-filled hairline at y=17px.

### Reviews / Coverage / FAQ

Reviews 1→3 columns at 900px. Coverage stacks until 980px, then copy/field split. FAQ stacks until 980px, then sticky aside + accordion.

### Quote wizard

- Mobile: header, 3-step rail, panel, aside cards; chips auto-fit at 148px; fields single column; nav wraps with hint above actions.
- ≥640px: fields 2-up with wide fields spanning.
- ≥1040px: wizard + 272px aside.
- Success panel keeps the same width and replaces the form without layout jump.

### Footer

1 column → 4 columns at 780px. Wordmark is clipped, stroke-only, decorative (`aria-hidden`), and never causes horizontal scroll.

## Typography scaling

| Token | 390px | 768px | 1440px |
| --- | --- | --- | --- |
| Display | 46px | 74px | 123px |
| H2 | 34px | 42px | 60px |
| Lede | 16px | 18px | 19px |
| Mono label | 8–9px | 9px | 10–11px |

## Image and media behaviour

No raster imagery ships in the layout; all graphics are SVG/CSS, so there is no art-direction swap per breakpoint. When photography is added, use `<picture>` with 4:5 mobile and 16:10 desktop crops (see `12-assets.md`).

## Performance targets by device

| Device | Budget |
| --- | --- |
| Desktop | 60fps hero, DPR ≤1.75, Three.js chunk <150kB gzip |
| Tablet | 60fps target, reduce particles if frame time >22ms |
| Mobile | 30fps acceptable for ambient field; consider disabling shader below 700px if measurements demand it |

The current build does not branch particle count by device; that is a roadmap item pending real-device profiling.
