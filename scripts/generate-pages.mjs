/**
 * Generates static landing-page HTML from src/content/landing.json.
 * Each page gets its own title, description, canonical, OG tags and JSON-LD,
 * plus a data-page marker that tells the React app which template to render.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(root, 'src/content/landing.json'), 'utf8'));
const ORIGIN = 'https://totallycool.co.za';
const OG_IMAGE = `${ORIGIN}/og.png`;
const PHONE = '+27789635441';
const CITY = 'Randburg';

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const jsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

function serviceSchema({ name, description, url, areaServed }) {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    areaServed: areaServed.map((city) => ({ '@type': 'City', name: city })),
    provider: {
      '@type': 'HVACBusiness',
      '@id': `${ORIGIN}/#business`,
      name: 'Totally Cool Air Conditioning & Refrigeration',
      url: `${ORIGIN}/`,
      telephone: PHONE,
      address: {
        '@type': 'PostalAddress',
        addressLocality: CITY,
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
    },
  };
}

function document({ title, description, url, page, slug, schema }) {
  const safeTitle = esc(title);
  const safeDescription = esc(description);
  return `<!doctype html>
<html lang="en-ZA">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#04080B" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon.svg" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Totally Cool" />
    <meta property="og:locale" content="en_ZA" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <script type="application/ld+json">
${jsonLd({ '@context': 'https://schema.org', '@graph': schema })}
    </script>
  </head>
  <body data-page="${page}" data-slug="${esc(slug)}">
    <a class="skip-link" href="#main">Skip to content</a>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

let written = 0;
const seen = new Set();

function writePage(relativePath, html) {
  const file = resolve(root, relativePath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written += 1;
}

for (const service of data.services) {
  if (seen.has(`s:${service.slug}`)) throw new Error(`Duplicate service slug: ${service.slug}`);
  seen.add(`s:${service.slug}`);

  const url = `${ORIGIN}/services/${service.slug}/`;
  const pageName = service.heroTitle.replace(/,$/, '');
  const schema = [
    serviceSchema({
      name: pageName,
      description: service.metaDescription,
      url,
      areaServed: ['Johannesburg', 'Sandton', 'Randburg', 'Pretoria', 'Cape Town', 'Durban', 'South Africa'],
    }),
    breadcrumb([
      { name: 'Home', url: `${ORIGIN}/` },
      { name: 'Services', url: `${ORIGIN}/#services` },
      { name: pageName, url },
    ]),
    faqSchema(service.faqs),
  ];

  writePage(
    `services/${service.slug}/index.html`,
    document({
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      page: 'service',
      slug: service.slug,
      schema,
    }),
  );
}

for (const area of data.areas) {
  if (seen.has(`a:${area.slug}`)) throw new Error(`Duplicate area slug: ${area.slug}`);
  seen.add(`a:${area.slug}`);

  const url = `${ORIGIN}/areas/${area.slug}/`;
  const pageName = `HVAC & refrigeration in ${area.name}`;
  const schema = [
    serviceSchema({
      name: pageName,
      description: area.metaDescription,
      url,
      areaServed: [area.name],
    }),
    breadcrumb([
      { name: 'Home', url: `${ORIGIN}/` },
      { name: 'Areas served', url: `${ORIGIN}/#coverage` },
      { name: area.name, url },
    ]),
    faqSchema(area.faqs),
  ];

  writePage(
    `areas/${area.slug}/index.html`,
    document({
      title: area.metaTitle,
      description: area.metaDescription,
      url,
      page: 'area',
      slug: area.slug,
      schema,
    }),
  );
}

// Guard against a stale page surviving a slug rename.
for (const group of ['services', 'areas']) {
  if (!existsSync(resolve(root, group))) continue;
}

console.log(`Generated ${written} landing pages (${data.services.length} services, ${data.areas.length} areas).`);
