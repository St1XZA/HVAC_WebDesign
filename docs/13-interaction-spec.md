# 13 — Interaction specification

## Global

| Interaction | Trigger | Behaviour | Timing | Fallback |
| --- | --- | --- | --- | --- |
| Smooth scroll | wheel / touch | Lenis interpolates; native on reduced motion | lerp .085, duration 1.15 | Native scroll |
| Anchor link | click nav/footer/CTA | 1.4s travel with −64px offset, nav closes first | 1.4s | Instant jump |
| Scroll progress | scroll | 1px cyan bar scales at top | rAF-coalesced | N/A |
| Nav condense | scrollY > 24 | Blur + border + darker ground | 500ms | Always readable |
| Skip link | Tab | Appears at top-left, jumps to `#main` | 220ms | N/A |
| Selection | drag text | Cyan ground, ink text | instant | N/A |

## Hero

| Interaction | Trigger | Behaviour | Timing |
| --- | --- | --- | --- |
| Entrance | load | Eyebrow, two title lines, lede, actions, micro rise in sequence | 80–740ms delays, 1–1.45s |
| Pointer reaction | pointer move | Fog pointer bloom tracks a smoothed position; particles repel within 0.95 units | continuous |
| Idle freeze | 2.8s no input | Frost spreads from edges, field slows 60%, glow cools, status → HOLDING, loop → IDLE, bar contracts | 2.4–2.6s |
| Melt | any pointer/key/scroll | Frost recedes, field resumes, status → NOMINAL | 2.2–2.4s |
| Chamber drift | every 2.6s | Ambient reading random-walks 30.7–32.2 °C, Δ recomputes | 2.6s interval |
| CTA primary | click | Scrolls to quote wizard | 1.4s |
| CTA secondary | click | Opens WhatsApp in a new tab | instant |
| Stats | static | Four labelled figures, tabular numerals | N/A |

Pointer handling never blocks scrolling or text selection. The canvas is `aria-hidden` and behind content.

## Navigation and menu

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Nav link hover | pointer | Label brightens, 1px cyan underline scales from left |
| Mobile menu | button | Full-screen overlay, numbered links, scroll locked, `aria-expanded` |
| Menu close | link / Escape / toggle | Overlay fades, scroll unlocks, focus returns to the toggle |
| Phone link | tap/click | `tel:+27789635441` |
| Quote CTA | click | Closes menu, scrolls to wizard |

## Buttons and links

| Element | Hover | Active | Focus |
| --- | --- | --- | --- |
| Primary `.btn` | 22% cyan wash, cyan ring + glow, arrow moves 3px up-right | 1px press | 2px cyan outline, 4px offset |
| Ghost `.btn` | Border → 50% cyan, 6% cyan fill | 1px press | Same |
| Magnetic wrapper | Inner translates 22% of pointer offset | — | Outer remains focusable |
| Text link | Underline expands from 35% to 100%, arrow slides 4px | — | Same |

Magnetic and tilt effects are disabled under reduced motion. Keyboard focus never moves the element.

## Services explorer

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Select row | click / pointerenter / focus | Row becomes `aria-pressed`, arrow rotates 45° and fills cyan; panel swaps content with 550ms panel-in |
| Panel swap | selection change | Airflow art, title, tagline, description, chips, spec rows and metric update |
| Panel CTA | click | Scrolls to the quote wizard |
| Hover row | pointer | Cyan wash fades in from the left, title shifts 5px |

Touch devices use tap only; no hover-dependent information.

## Work reel

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Pinned scroll | vertical scroll >900px | Track translates horizontally, progress bar fills |
| Card hover | pointer | Card lifts 5px, border cyan, art scales 1.055 and saturates |
| Mobile swipe | touch | Native horizontal scroll with snap, no pinning |
| Resize | viewport change | Travel recalculates; mobile clears transform |

Cards are static content, not links, until project pages exist. No hover-only data.

## Technology

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Preset | click | Gauge, load, ambient, setpoint, saving and note animate to the preset |
| Gauge | change | Ring stroke offset transitions 1.1s |
| Schematic | ambient | Dashed flows animate; dots travel the loop (hidden under reduced motion) |
| Disclaimer | static | "Illustrative model — a sizing conversation, not a quotation." |

## Counters and reveals

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Reveal | 12% viewport intersection | 950ms fade/rise, 80–120ms stagger, fires once |
| Counter | 40% intersection | 1.7s easeOutExpo to final value, fires once |
| Reduced motion | media query | Final state immediately, no observer animation |

## FAQ

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Open | click / Enter / Space | Native `<details>` opens, + rotates to ×, ring turns cyan, body fades 520ms |
| Multiple | independent | Any number can stay open; first item open by default |

## Quote wizard

| Interaction | Trigger | Behaviour |
| --- | --- | --- |
| Service choice | click | Chip fills cyan, tick lights, clears any error |
| Continue | submit | Validates current step; on success advances; on failure shows inline `role="alert"` |
| Back | click | Returns one step, preserves answers, clears error |
| Progress | step change | Completed and active rails turn cyan; active label brightens |
| Field focus | focus | Cyan border + 12% ring; invalid phone/email gets coral border |
| Prepare | submit at step 3 | Validates name + SA number (+ optional email), then confirmation |
| Confirmation | state | Summary rows, WhatsApp link, call link, start again, mailto fallback |
| WhatsApp | click | Opens `wa.me/27789635441` with the encoded message |
| Reset | click | Empties answers, returns to step 1 |

Validation rules: service required; property, suburb (≥2 chars) and urgency required; name ≥2 chars; phone matches `^(?:\+27|0)\d{9}$` after stripping separators; optional email must match a basic pattern.

Keyboard: Tab order follows chips → fields → nav; no custom key traps; Escape does not discard answers.

## Pointer and touch behaviour

- All hover states have a pressed/focus equivalent.
- Tilt and magnetic are pointer-fine only and are skipped for reduced motion.
- The horizontal reel is never the only way to reach content on touch (swipe plus vertical flow).
- No custom cursor; the native cursor remains for precision and accessibility.

## Reduced-motion matrix

| Feature | Full motion | Reduced motion |
| --- | --- | --- |
| Lenis | Active | Native |
| Hero field | Animated, freeze cycle | Static frame |
| Frost overlay | 2.6s spread | Disabled |
| Reveals | Staggered | Instant |
| Counters | Count up | Final value |
| Marquee | Scrolls | Static |
| Scroll-linked layers | Parallax | Neutral positions |
| Card hover | Lift/tilt | Border/colour only |

## Failure states

- WebGL failure → CSS atmosphere, all content unaffected.
- Web font failure → system sans/mono fallback; no layout-blocking.
- WhatsApp unavailable → mailto and phone remain.
- JS disabled → React app does not render; this is a client-rendered build and a future static-render task.
