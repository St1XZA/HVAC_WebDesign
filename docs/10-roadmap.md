# 10 — Implementation roadmap

## Phase 0 — Foundation (shipped)

- Vite + React + TS strict, token-based CSS system, content module.
- Three.js cold field with freeze state, CSS atmosphere fallback, dynamic import.
- Lenis scroll, reveal system, magnetic/tilt primitives, anime.js counters.
- All seven chapters, proof sections, FAQ, footer.
- Three-step quote wizard with validation and WhatsApp staging.
- SEO metadata, LocalBusiness/Service JSON-LD, sitemap, robots, OG image.

**Acceptance:** typecheck clean, production build clean, no console errors, wizard completes, no horizontal overflow at 390px.

## Phase 1 — Production hardening (1–2 weeks)

| Task | Acceptance |
| --- | --- |
| Real-device profiling (mid-range Android, iPhone 12, Windows laptop) | Documented frame time; particle/DPR reduction if >22ms |
| Lighthouse + WebPageTest on the deployed origin | LCP <2.5s mobile, CLS <0.05, INP <200ms, a11y ≥95 |
| Font strategy | Self-host Sora + JetBrains Mono subsets, `font-display: swap`, preload the two critical files |
| WebGL failover | Explicit static-poster mode for `prefers-reduced-data` and context loss |
| Wizard analytics + endpoint | Events fire; optional CRM/email POST with spam protection |
| Cross-browser QA | Safari 17+, Firefox, Chrome, Edge, Samsung Internet |
| Content review with Totally Cool | Every claim, price, brand list and service description approved |

## Phase 2 — Proof and photography (2–3 weeks)

- Shoot the asset list in `12-assets.md` (team, vans, plant rooms, cold rooms, before/after pairs).
- Replace the generated project plates with real photography inside the same card geometry.
- Publish 5 project pages with specs, dates, permission and outcome notes.
- Add a technician profile strip and an anonymised client logo set with permission.
- Add service-page routes generated from `services` data.

**Acceptance:** no placeholder plates remain; every image has width/height, AVIF/WebP, alt text; LCP image ≤180kB.

## Phase 3 — Search and conversion (3–4 weeks)

- Location pages for Randburg, Sandton, Johannesburg, Pretoria, Cape Town, Durban with genuine local content.
- Service × location landing pages only where there is unique content.
- FAQ schema, breadcrumb schema, review schema with verified source links.
- Conversion experiments: hero CTA copy, wizard step order, phone visibility on mobile.
- Add a lightweight CMS (or structured JSON authoring) so the team can publish projects.

**Acceptance:** 20+ indexed routes, no duplicate meta, internal links from every service page to two projects and one location page.

## Phase 4 — Productisation (optional)

- Maintenance-contract calculator (equipment count × criticality → indicative plan), clearly labelled.
- Client portal for service reports and SLA history.
- Booking availability for planned assessments.
- Realtime chat or WhatsApp Business integration with response-time tracking.

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| WebGL hurts low-end mobile | Medium | High | Pause off-screen, cap DPR, device tiering, static fallback |
| Stock-photo gap weakens proof | High | Medium | Keep technical plates intentional; prioritise shoot |
| Unverified marketing claims | Medium | High (trust/legal) | Only published facts; label illustrative models; client sign-off |
| WhatsApp handoff loses leads | Medium | Medium | Add email endpoint + CRM in phase 1; track staged vs sent |
| Font/third-party latency | Medium | Medium | Self-host, subset, preload |
| Scroll effects feel gimmicky | Low | Medium | Reduced motion, restrained amplitudes, no text parallax |

## Success metrics

- Quote starts per 1,000 sessions.
- Wizard completion rate (target >55% of starts).
- WhatsApp/call click-through (target >4% of sessions).
- Emergency calls from mobile.
- Service explorer engagement (target >35% activate a second row).
- Organic impressions for the six target clusters.
- Bounce rate on the hero (target <45%).
