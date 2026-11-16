import data from './landing.json';

export type LandingSummary = { label: string; value: string };
export type LandingFaq = { q: string; a: string };
export type LandingProof = { value: string; label: string; note: string };

type LandingBase = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitle: string;
  heroAccent: string;
  lede: string;
  summary: LandingSummary[];
  introTitle: string;
  intro: string[];
  localTitle: string;
  proof: LandingProof;
  faqs: LandingFaq[];
};

export type LandingService = LandingBase & {
  index: string;
  scopeTitle: string;
  scope: { title: string; body: string }[];
  signalsTitle: string;
  signalsLead: string;
  signals: string[];
  local: { areaSlug: string; label: string; body: string }[];
  related: string[];
};

export type LandingArea = LandingBase & {
  name: string;
  region: string;
  index: string;
  approachTitle: string;
  approach: { title: string; body: string }[];
  local: { title: string; body: string }[];
  systems: string[];
  relatedAreas: string[];
  relatedServices: string[];
};

export const landingServices = data.services as unknown as LandingService[];
export const landingAreas = data.areas as unknown as LandingArea[];

export function serviceHref(slug: string): string {
  return `/services/${slug}/`;
}

export function areaHref(slug: string): string {
  return `/areas/${slug}/`;
}

export function getLandingService(slug: string): LandingService | undefined {
  return landingServices.find((service) => service.slug === slug);
}

export function getLandingArea(slug: string): LandingArea | undefined {
  return landingAreas.find((area) => area.slug === slug);
}
