# 06 — Component architecture

## Render tree

```
App
├── Nav                     (scroll state, menu, progress)
├── main#main
│   ├── Hero                (WebGL lifecycle, idle freeze, sensor drift)
│   │   ├── Magnetic → CTA
│   │   └── chamber readout
│   ├── Clients             (CSS marquee, duplicated group)
│   ├── About               (useScrollVar → --p; Reveal layers)
│   ├── Services            (active index; sticky detail panel)
│   ├── Work                (pinned track; scroll → translate3d)
│   ├── Technology          (preset index; schematic + gauge)
│   ├── Cases               (Counter ×4)
│   ├── Process             (useScrollVar → timeline fill)
│   ├── Reviews             (static data → StarRow)
│   ├── Coverage            (area chips + sonar nodes)
│   ├── Faq                 (native details)
│   ├── Quote               (step, form, error, sent)
│   └── FinalCta
└── Footer
```

Shared primitives: `Reveal`, `Magnetic`, `Tilt`, `Counter`, `Icons`, plus the hooks `useScrollVar` and the scroll singleton.

## State ownership

| State | Owner | Type | Persistence |
| --- | --- | --- | --- |
| Scroll progress | DOM (`--p`) | CSS custom property | none |
| Nav scrolled/menu | Nav | `useState`, `useRef` | none |
| Hero frozen | Hero | `useState` + timer | none |
| Ambient reading | Hero | `useState` + interval | none |
| WebGL field | Hero ref | `ColdField \| null` | disposed on unmount |
| Active service | Services | `useState<number>` | none |
| Active preset | Technology | `useState<number>` | none |
| Quote answers | Quote | `useState<FormState>` | in memory only |
| Quote step | Quote | `useState<0\|1\|2>` | none |
| Validation | Quote | `useState<string>` | cleared on edit |

No global store. The only cross-section concerns are scrolling (module singleton) and data (static imports). That keeps the page server-renderable later without rework.

## Data contracts

```ts
type Service = {
  id: string; index: string; title: string; tagline: string;
  description: string; capabilities: string[]; 
  spec: { label: string; value: string }[];
  metric: { value: string; label: string };
};

type Project = {
  id: string; index: string; title: string; location: string;
  sector: string; scope: string; outcome: string;
  specs: { label: string; value: string }[]; hue: number;
};
```

Content is a plain module, so it can be swapped for a CMS fetch by changing one import per section. Keep the field names identical to avoid touching components.

## Primitive behaviour

**Reveal** — IntersectionObserver at 12% threshold, `-8%` bottom margin, unobserves after firing. Adds `is-in`; CSS owns the transition. Reduced motion adds the class immediately.

**Magnetic** — pointer position relative to the wrapper centre, multiplied by strength (0.22), applied to an inner span with a 420ms ease-out. Reset on leave. Disabled under reduced motion. Outer element keeps layout stable.

**Tilt** — pointer position mapped to ±4.5° rotateX/rotateY at 1000px perspective, translateZ(30px) on the inner layer. Not used on touch-critical content; disabled under reduced motion.

**Counter** — anime.js easeOutExpo over 1.7s, triggered once at 40% visibility. Reduced motion renders the final value immediately.

**ServiceArt** — three hand-authored bezier sets, selected by service index, dashed with a 3.4s linear flow. Pure SVG; no layout dependencies.

## Composition rules

- Sections own their own headings and eyebrow numbering; no shared "Section" wrapper that hides structure.
- Content never enters a component as JSX from data; components map typed arrays.
- Interactive controls use real `<button>`/`<a>`/`<input>`/`<select>`; no div-with-role.
- A section may only import from `content`, `lib`, and shared `components` — never from another section.
- Decorative layers are `aria-hidden` and `pointer-events: none`.

## Extension points

| Need | Change |
| --- | --- |
| CMS | Replace `site.ts` exports with async loaders + Suspense boundaries per chapter |
| Analytics | Add a `track(event, payload)` module and call from CTAs, chips, wizard steps |
| Real form endpoint | Add `submitQuote()` server route; keep the staged confirmation as fallback |
| Second locale | Move strings to `content/[locale].ts`; avoid hard-coded copy in components |
| Project detail pages | Extract `ProjectPlate` and reuse in `/work/[slug]` |
