# 02 — Sitemap

## Shipped: one narrative page

```
/  (Totally Cool — climate engineering)
├── #top            Hero — Cooling the future
├── #clients        Client marquee (Broll, City of Johannesburg, Xerox…)
├── #about          About — since 1994, certifications, field plate
├── #services       Service explorer — 7 disciplines
├── #work           Field records — horizontal project reel
├── #technology     Cooling-loop schematic + load simulator
├── (cases)         Measured outcomes band
├── (process)       Four-step delivery model
├── #reviews        Verified review wall
├── (coverage)      Areas served, sonar field
├── #faq            Six objection-handling answers
├── #quote          Three-step quote wizard
├── (final CTA)     Stop sweating it
└── footer          Contact, services, company, social, privacy
```

Utility routes: `#main` skip target, `/privacy-policy` (existing external page), `robots.txt`, `sitemap.xml`, `og.png`, `favicon.svg`.

## Shipped: service and area landing pages

Generated as real static HTML from `src/content/landing.json` by `scripts/generate-pages.mjs`.

```
/services/air-conditioning/       /areas/randburg/
/services/commercial-hvac/         /areas/sandton/
/services/refrigeration/           /areas/johannesburg/
/services/cold-rooms/              /areas/pretoria/
/services/ventilation/             /areas/cape-town/
/services/maintenance/             /areas/durban/
/services/energy/
```

Each page carries its own title, description, canonical, Open Graph and Twitter tags, plus a
`Service` + `BreadcrumbList` + `FAQPage` JSON-LD graph. The React template is shared; the content
and weaknesses (local conditions, signals, FAQs) are unique per page.

## Navigation model

- **Primary nav:** Services, Work, Technology, About, Contact → all scroll, contact jumps to the wizard.
- **Persistent CTA:** "Get a quote" in the nav at every scroll position.
- **Mobile:** full-screen overlay with numbered links plus WhatsApp; body scroll locked while open.
- **Footer:** full service list linked to `/services/*`, company links to home sections, phone, WhatsApp, email, base, social.
- **Landing pages:** breadcrumbs back to `/` and `/#services` or `/#coverage`; service and area cross-links at the foot of each page.

## Remaining expansion (phase 2+)

```
/services/  index page
/areas/     index page
/work/[project-slug]
/insights/[slug]
/about
/contact
```

Rules:

- Each service route reuses the service content object; hero, scope, proof, FAQ and quote CTA are generated from it.
- Each area route must contain genuinely local content (response times, completed sites, access notes) — no doorway pages.
- `/work/[slug]` gets before/after photography and a spec table; only publish records with client permission.
- Keep the one-page experience at `/` as the brand piece; service and area routes are the search entry points.

## Metadata ownership

| Route | Title pattern | Primary intent |
| --- | --- | --- |
| `/` | Totally Cool — HVAC, Refrigeration & Cold Room Engineers \| South Africa | Brand + category |
| `/services/*` | [Service] in Johannesburg & South Africa \| Totally Cool | Commercial |
| `/areas/*` | HVAC & Refrigeration in [Area] \| Totally Cool | Local |
| `/work/*` | [Project] — [Sector] case study \| Totally Cool | Proof |

One `h1` per route, descriptive `h2`s, canonical URLs, OG image per route, breadcrumb schema on child routes.
