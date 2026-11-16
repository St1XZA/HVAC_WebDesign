# 08 — Motion architecture

## Principle

Motion should feel like mass and pressure: slow things are heavy (glass panels, fog), small things are quick and precise (labels, arrows, ticks). No bounce except where a control is physically grabbed. No generic "fade up on every element".

## Layers

| Layer | Technology | Responsibility |
| --- | --- | --- |
| Scroll | Lenis | Weighted momentum, anchor travel, scroll lock |
| Ambient | Three.js rAF | Fog drift, particle suspension, frost spread |
| Entrance | CSS transitions + IntersectionObserver | Section reveals with stagger |
| Micro | CSS transitions | Hover, focus, press, accordion |
| Counting | anime.js | Case-study metrics |
| Pointer | React pointer handlers | Magnetic buttons, tilt cards, service selection |

Lenis and Three.js each own a rAF; the scroll-linked transforms use a single rAF per section rather than a scroll library.

## Lenis configuration

```ts
new Lenis({ duration: 1.15, lerp: 0.085, wheelMultiplier: 0.95, touchMultiplier: 1.4, smoothWheel: true })
```

- Disabled entirely under `prefers-reduced-motion`.
- `scrollToId` offsets by −64px for the fixed nav and travels 1.4s.
- Mobile menu calls `stop()`/`start()` plus `body { overflow: hidden }`.
- CSS includes the required `.lenis` height/scroll-behavior resets.

## Choreography

| Moment | Timing | Easing |
| --- | --- | --- |
| Eyebrow | 80ms delay, 1s | `--ease-out` |
| Title line 1 | 140ms delay, 1.45s translateY(112%) | `--ease-out` |
| Title line 2 | 280ms delay, 1.45s | `--ease-out` |
| Lede | 460ms, 1s fade + 16px rise | `--ease-out` |
| Actions | 600ms | `--ease-out` |
| Micro row | 740ms | `--ease-out` |
| Section reveal | 950ms, threshold 12%, stagger 80–120ms | `--ease-out` |
| Frost in | 2.6s opacity, shader damp ~1.15/s | `--ease-io` |
| Frost out | 2.4s text-shadow, 2.2s border | `--ease-io` |
| Service panel swap | 550ms panel-in | `--ease-out` |
| Magnetic return | 420ms | `--ease-out` |
| Tilt return | 520ms | `--ease-out` |
| Counter | 1.7s | anime `easeOutExpo` |
| Marquee | 48s linear, pause on hover | linear |
| Scroll cue | 2.6s looping, opacity 0→1→0 | `--ease-io` |

## Scroll-linked depth

`useScrollVar` writes `0→1` progress into `--p` on the section element. CSS consumes it:

```css
/* stacked glass panels lag at different rates */
.layer { transform: translate3d(0, calc((1 - var(--p)) * var(--shift)), 0); }

/* process rail fills as the section passes */
.process__line i { transform: scaleX(var(--p)); }

/* work reel progress */
.work__progress-track i { transform: scaleX(var(--p)); }
```

The work reel is the only section with its own rAF: it maps vertical progress to `translate3d` on the track and sets `--p` for the progress bar. On ≤900px it clears transforms and becomes native scroll-snap.

## Idle-freeze choreography

1. Any pointer/key/scroll event resets a 2.8s timer and melts the field.
2. On expiry, `frozen=true` → hero `data-frozen`, shader target 1, CSS overlay fades over 2.6s.
3. The readout changes state, the bar contracts, the status dot slows, the loop label changes.
4. Input returns → overlay fades, shader damps to 0, text glow leaves over 2.4s.

The effect is intentionally longer than a UI transition: the chamber should feel like it is equalising, not toggling.

## Reduced motion

`prefers-reduced-motion: reduce` results in:

- Lenis never instantiated; native scrolling.
- CSS animations/transitions reduced to 0.001ms globally.
- Reveals immediately visible.
- Counters render final values.
- Marquee stopped.
- WebGL renders one static frame and does not animate.
- Scroll-linked transforms still resolve to their neutral positions (`--p` fallback 0, cards visible).
- Frost/freeze state does not animate; content remains legible.

Nothing is lost functionally. The site becomes a still, high-contrast editorial page.

## Performance rules

- Animate only `transform`, `opacity`, `filter` where unavoidable.
- No scroll listeners without rAF coalescing; all listeners passive.
- `will-change` only on the work track, layers and reveals (released by nature of the animation ending).
- The magnetic/tilt handlers are pointer-only and disabled on reduced motion.
- Three.js pauses when the hero leaves the viewport.
- No motion library on the critical path: anime.js is bundled with the app chunk (only counters use it), Three.js is deferred.

## Anti-patterns

- No parallax on text (readability).
- No scroll-jacking beyond the work reel, which is a deliberate horizontal chapter and degrades to native scroll.
- No autoplaying video, no cursor replacement, no hover-only information, no infinite spinners.
- No animation on form fields while typing; errors appear without shake.
