# Totally Cool — climate engineering experience

A complete redesign of [totallycool.co.za](https://totallycool.co.za) as an immersive, cold-chamber digital experience for South Africa's HVAC, refrigeration and cold-room specialists.

**Live brand facts, contact details, reviews and project records are real** and were taken from the existing site. The visual system, WebGL field, interaction model and codebase are new.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Build | Vite 5 + React 18 + TypeScript (strict) | Fast HMR, small runtime, typed content contracts |
| 3D | Three.js, custom GLSL | Full control of the fog, frost and particle field without a wrapper tax |
| Smooth scroll | Lenis | Momentum with accessibility escape hatch |
| Motion | anime.js + CSS transitions | Counters and sequenced entrances; CSS for 60fps hover states |
| Styling | Hand-authored CSS with tokens | No utility-class drift; design system is the source of truth |
| Fonts | Sora + JetBrains Mono (Google Fonts) | Geometric display, technical mono |

## Run

```bash
npm install
npm run dev        # generates landing pages, then http://127.0.0.1:5173
npm run pages      # regenerate services/*/ and areas/*/index.html
npm run typecheck
npm run build      # production bundle in dist/
npm run og         # regenerate public/og.png
```

No environment variables, API keys or backend are required.

## Structure

```
src/
  App.tsx                  home vs landing template switch
  content/site.ts          home copy, services, projects, reviews, FAQ, contact
  content/landing.json     service + area landing content and metadata
  content/landing.ts       landing types, lookups, URL helpers
  lib/coldField.ts         Three.js scene + GLSL shaders
  lib/routes.ts            page kind + cross-page section URLs
  lib/scroll.ts            Lenis singleton, anchor scrolling, scroll lock
  lib/useScrollVar.ts      scroll progress → CSS custom property
  components/              home sections, landing template, shared primitives
  styles/                  tokens → base → components → sections → landing
scripts/generate-pages.mjs generates static HTML for 7 services + 6 areas
services/, areas/           generated landing pages (gitignored)
docs/                      strategy, architecture and asset deliverables
public/                    favicon, OG image, sitemap, robots
```

## Landing pages

Thirteen static documents are generated from `src/content/landing.json`:

```
/services/air-conditioning/  /services/commercial-hvac/  /services/refrigeration/
/services/cold-rooms/        /services/ventilation/      /services/maintenance/
/services/energy/
/areas/randburg/   /areas/sandton/   /areas/johannesburg/
/areas/pretoria/   /areas/cape-town/ /areas/durban/
```

Each has its own `<title>`, description, canonical, Open Graph/Twitter tags and a
`Service` + `BreadcrumbList` + `FAQPage` JSON-LD graph in the HTML source. Copy, local conditions,
signals and FAQs are unique per page; geography claims stay honest (Gauteng metro response is 2–4
hours, coastal projects are mobilised from Randburg with response confirmed on the call).

Vite runs multi-page (`appType: 'mpa'`), with inputs derived from the same JSON. Add a page by
adding an entry and re-running `npm run pages`. The body is rendered by React from
`body[data-page]`/`body[data-slug]`; metadata is already static.

Full detail: [`docs/11-code-structure.md`](docs/11-code-structure.md).

## Content and claims

Everything customer-facing lives in `src/content/site.ts`.

- Services, coverage areas, brands, certifications, phone number and email are the company's published details.
- The three testimonials and the project outcomes (Sandton 28% saving, midnight cold-room recovery, Randburg repair, Midrand contract, Cape Town freezer) come from the existing site's published records.
- Scarcity devices from the old site ("only 9 slots left", countdown timers) were deliberately **not** carried over.
- The technology panel is labelled an **illustrative model**, not a quotation.
- The quote form does not invent a backend: it stages a WhatsApp message the user sends themselves.

Replace `src/content/site.ts` and the project plates with client-supplied photography when available. Shot list: [`docs/12-assets.md`](docs/12-assets.md).

## Forms

The multi-step quote is client-side only. On submit it builds a `wa.me` deep link with the answers, exposes a `mailto:` fallback and shows a confirmation. Nothing is transmitted until the user presses send in WhatsApp or their mail client. If a CRM or email endpoint is added later, post from a server route and keep the same field names.

## Performance and accessibility

- Three.js is dynamically imported after first paint and only runs while the hero is on screen; DPR is capped at 1.75.
- The hero paints a CSS atmosphere underneath the canvas, so a WebGL failure degrades gracefully.
- Reduced motion disables Lenis, the freeze loop, counters, marquee and scroll-linked transforms; reveals resolve instantly.
- Skip link, visible focus rings, native `<details>` FAQ, labelled SVGs, `aria-pressed` on toggles and `aria-live` on the wizard confirmation.
- WebGL is decorative and `aria-hidden`; all meaning is in DOM text.

**Not yet measured:** Lighthouse/WebPageTest scores, real-device GPU cost, or Core Web Vitals on production hosting. The 90+ target is a design constraint, not a verified result. See [`docs/10-roadmap.md`](docs/10-roadmap.md).

## Verification performed

- `tsc --noEmit` — clean.
- `npm run build` — clean; 13 landing pages emitted alongside the home page.
- Dev server — HTTP 200 for `/`, a service route and an area route; no console errors; Three.js mounts on home.
- Landing pages — verified titles, descriptions, canonicals, breadcrumbs, schema types, cross-links, local content and quote kickers; no horizontal overflow at 390px.
- Home page — service panel and area chips link to the new pages; hero still renders.
- Quote wizard — exercised through all three steps to the staged WhatsApp payload.

## Deliverables

1. [UX strategy](docs/01-ux-strategy.md)
2. [Sitemap](docs/02-sitemap.md)
3. [User journey map](docs/03-user-journey.md)
4. [Wireframes](docs/04-wireframes.md)
5. [Design system](docs/05-design-system.md)
6. [Component architecture](docs/06-component-architecture.md)
7. [Three.js architecture](docs/07-threejs-architecture.md)
8. [Motion architecture](docs/08-motion-architecture.md)
9. [Responsive specification](docs/09-responsive-spec.md)
10. [Implementation roadmap](docs/10-roadmap.md)
11. [Code structure](docs/11-code-structure.md)
12. [Asset requirements](docs/12-assets.md)
13. [Interaction specification](docs/13-interaction-spec.md)
14. [Visual direction board](docs/visual-direction.html)
