# 11 — Code structure

```
Totally Cool/
├── index.html                  SEO meta, fonts, JSON-LD (HVACBusiness, WebSite)
├── vite.config.ts              React, base './', three vendor chunk
├── tsconfig.json               strict, bundler resolution, no unused locals
├── scripts/generate-og.mjs     dependency-free 1200×630 PNG generator
├── scripts/generate-pages.mjs  static landing HTML + metadata/schema generator
├── services/                   generated service pages (gitignored)
├── areas/                      generated area pages (gitignored)
├── public/
│   ├── favicon.svg             hexagon snowflake mark
│   └── og.png                  generated frost field
├── src/
│   ├── main.tsx                mount + stylesheet order
│   ├── App.tsx                 section composition + Lenis init
│   ├── content/site.ts         typed single source of truth (home + shared data)
│   ├── content/landing.json    service + area copy, local content and metadata
│   ├── content/landing.ts      landing types, lookups, /services + /areas hrefs
│   ├── lib/
│   │   ├── coldField.ts        Three.js class, GLSL, lifecycle
│   │   ├── routes.ts           page kind + cross-page section URLs
│   │   ├── scroll.ts           Lenis singleton, anchors, lock
│   │   └── useScrollVar.ts     progress → --p
│   ├── components/
│   │   ├── Nav.tsx             fixed nav, progress, mobile menu, cross-page links
│   │   ├── Hero.tsx            WebGL mount, idle freeze, readout
│   │   ├── LandingPage.tsx     service/area template (breadcrumbs, brief, steps, FAQ, cross-links)
│   │   ├── Clients.tsx         marquee
│   │   ├── About.tsx           layered panels + technical plate
│   │   ├── Services.tsx        explorer + airflow art
│   │   ├── Work.tsx            pinned horizontal reel
│   │   ├── Technology.tsx      loop schematic + simulator
│   │   ├── Cases.tsx           animated metric band
│   │   ├── Process.tsx         four-step timeline
│   │   ├── Reviews.tsx         review wall
│   │   ├── Coverage.tsx        area chips + sonar field
│   │   ├── Faq.tsx             native details
│   │   ├── Quote.tsx           wizard + validation + staging
│   │   ├── FinalCta.tsx        closing band
│   │   ├── Footer.tsx          links + wordmark
│   │   ├── Reveal.tsx          IntersectionObserver wrapper
│   │   ├── Magnetic.tsx        pointer attraction
│   │   ├── Tilt.tsx            pointer tilt
│   │   ├── Counter.tsx         anime.js counter
│   │   └── Icons.tsx           inline SVG icons + brand mark
│   └── styles/
│       ├── tokens.css          variables only
│       ├── base.css            reset, shell, labels, reveal
│       ├── components.css      buttons, glass, nav, forms, footer
│       ├── sections.css        hero and all chapters
│       └── landing.css         service and area landing template
└── docs/                       deliverables 01–14 + visual board
```

## Conventions

- **One section per component**, named after the section, default-less named exports.
- **Content never hard-coded** in a section; import from `content/site.ts`.
- **BEM-ish class names** (`hero__copy`, `work__card-specs`) tied to the CSS files.
- **No CSS-in-JS**; dynamic values use inline custom properties (`--hue`, `--d`, `--p`).
- **Type strict**: `strict`, `noUnusedLocals`, `noUnusedParameters`. No `any` in shipped code.
- **Effects** always clean up listeners, observers, timers, rAF and WebGL resources.
- **Accessibility**: real elements, labels, `aria-pressed`, `aria-live`, `aria-hidden` on decoration.

## Build output

```
dist/index.html                     ~6 kB (1.8 kB gzip)
dist/services/*/index.html          ~4.3–4.8 kB each     13 landing documents
dist/areas/*/index.html
dist/assets/main-*.css              ~61 kB (12 kB gzip)
dist/assets/main-*.js               ~300 kB (94 kB gzip)  app + React + anime + Lenis + landing data
dist/assets/three-*.js              ~464 kB (117 kB gzip) vendor, loaded up front
dist/assets/coldField-*.js          ~8 kB (2.9 kB gzip)   scene, dynamically imported
```

Three.js is split into its own chunk; the scene module is imported only after the hero mounts. To keep Three.js off the initial critical path entirely, change the `manualChunks` entry and confirm the dynamic import still resolves; currently the vendor chunk is still fetched by the app graph.

## Local commands

```bash
npm run pages      # regenerate services/*/ and areas/*/index.html
npm run dev        # predev → pages, then 127.0.0.1:5173
npm run typecheck  # tsc --noEmit
npm run build      # prebuild → pages, then typecheck + vite build
npm run preview    # serve dist
npm run og         # regenerate OG PNG
```

Vite runs as a multi-page app (`appType: 'mpa'`, absolute base `/`). `vite.config.ts` imports
`src/content/landing.json` to derive the HTML inputs, so adding a service or area only requires
a JSON entry — then `npm run pages` (or a dev restart) picks it up.

Each landing page is a real static HTML document. The React bundle reads `body[data-page]` and
`body[data-slug]` and renders the matching template. Metadata, canonical URLs and JSON-LD are
in the HTML source, not injected client-side. Body content is still client-rendered; add a
prerender/SSR step if non-JS crawlers or instant LCP become priorities.

## Deployment

Static hosting only — no Node runtime, no environment variables.

- **Netlify / Vercel / Cloudflare Pages:** build `npm run build`, output `dist`.
- **Plain host:** upload `dist`; routes are all anchor-based, so no SPA rewrite is required.
- Serve `og.png` at `/og.png` and keep the absolute URLs in `index.html` in sync with the production domain.
- Cache hashed assets for one year; HTML no-cache. Compress with Brotli.
- Update `sitemap.xml` / canonical URLs if the domain changes.

## Testing hooks

- `ColdField.dispose()` is idempotent and removes the canvas.
- The wizard’s `FormState` is a single object, so tests can drive each step without DOM scraping.
- Data modules are pure, enabling snapshot tests of copy and schema.
- No test runner ships by default; add Vitest + Testing Library for the wizard and scroll-progress hooks when the project gains CI.
