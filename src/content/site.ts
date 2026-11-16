/**
 * Single source of truth for site content.
 * Company facts, contact details, service lines and published reviews are taken
 * from totallycool.co.za. Project plates are drawn from the company's published
 * "before & after" records; swap the `scope` copy for client-supplied photo assets.
 */

export const contact = {
  phone: '078 963 5441',
  phoneHref: 'tel:+27789635441',
  whatsapp: 'https://wa.me/27789635441?text=Hi%20Totally%20Cool%2C%20I%27d%20like%20a%20free%20quote',
  email: 'info@totallycool.co.za',
  emailHref: 'mailto:info@totallycool.co.za',
  base: 'Randburg, Gauteng',
  hours: '24/7 emergency callout',
  founded: 1994,
  facebook: 'https://www.facebook.com/totallycoolsa',
  instagram: 'https://www.instagram.com/totallycoolsa',
  google: 'https://g.page/r/totallycoolsa/review',
} as const;

export const stats = [
  { value: '30+', label: 'Years in business', detail: 'Operating since 1994' },
  { value: '1,000+', label: 'Systems installed', detail: 'Residential to industrial' },
  { value: '24/7', label: 'Emergency response', detail: '2–4 hour metro callout' },
  { value: '4.9', label: 'Google rating', detail: 'Verified client reviews', suffix: '★' },
] as const;

export const clients = [
  'Broll Property Group',
  'City of Johannesburg',
  'Cradle Moon',
  'Dimension TV',
  'Pizza Perfect',
  'Reflexions',
  "Shepard's Corner",
  'Xerox',
] as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  spec: { label: string; value: string }[];
  metric: { value: string; label: string };
};

export const services: Service[] = [
  {
    id: 'air-conditioning',
    index: '01',
    title: 'Air conditioning',
    tagline: 'Comfort, engineered to the kilowatt.',
    description:
      'Heat-load modelling, correctly sized equipment and a clean installation. We supply and commission inverter split, ducted and multi-split systems from every leading brand — then keep them running at rated efficiency.',
    capabilities: ['Heat-load sizing', 'Inverter split & ducted', 'Multi-split and VRF', 'Smart controls & zoning'],
    spec: [
      { label: 'Equipment', value: 'Samsung · LG · Daikin · Midea' },
      { label: 'Typical install', value: '3–5 hours' },
      { label: 'Warranty', value: 'Workmanship guaranteed' },
    ],
    metric: { value: '−32%', label: 'Typical inverter energy draw' },
  },
  {
    id: 'commercial-hvac',
    index: '02',
    title: 'Commercial HVAC',
    tagline: 'Whole-building climate, from plant room to ceiling.',
    description:
      'Full mechanical fit-outs for offices, retail, warehouses and hospitality. Load modelling, ducting, air-handling units, chillers and controls — balanced, commissioned and documented before handover.',
    capabilities: ['Load modelling', 'Ducting & AHU', 'Chillers & cooling towers', 'Commissioning & balancing'],
    spec: [
      { label: 'Scope', value: 'Design → install → commission' },
      { label: 'Sectors', value: 'Office · retail · industrial' },
      { label: 'Reporting', value: 'Full as-built documentation' },
    ],
    metric: { value: '3 floors', label: 'Sandton HQ, zero downtime' },
  },
  {
    id: 'refrigeration',
    index: '03',
    title: 'Commercial refrigeration',
    tagline: 'The cold chain does not get a lunch break.',
    description:
      'Display fridges, prep counters, blast chillers and walk-in units for restaurants, supermarkets and food producers. Fault-first diagnostics, parts carried on the van, and a 24-hour line when stock is on the line.',
    capabilities: ['Display & prep fridges', 'Blast chillers', 'Compressor & condenser sets', 'Refrigerant leak detection'],
    spec: [
      { label: 'Response', value: '24/7 · 2–4 hour metro' },
      { label: 'Refrigerants', value: 'Modern low-GWP blends' },
      { label: 'Downtime', value: 'Stock-loss mitigation first' },
    ],
    metric: { value: '2 hrs', label: 'Emergency on-site target' },
  },
  {
    id: 'cold-rooms',
    index: '04',
    title: 'Cold rooms',
    tagline: 'Panels, plant and protocol — built as one system.',
    description:
      'Cold-room and freezer-room design, construction and repair. Insulated panels, condensing units, door systems, monitoring and alarms — engineered around what you actually store and how often the door opens.',
    capabilities: ['Panel & door systems', 'Condensing unit sizing', 'Temperature monitoring', 'Blast freezer rooms'],
    spec: [
      { label: 'Range', value: '+15 °C to −25 °C' },
      { label: 'Build', value: 'New · refurbishment · repair' },
      { label: 'Monitoring', value: 'Alarm & logging options' },
    ],
    metric: { value: '0', label: 'Stock lost on emergency callout' },
  },
  {
    id: 'ventilation',
    index: '05',
    title: 'Ventilation & air quality',
    tagline: 'A building that can breathe.',
    description:
      'Extraction, fresh-air supply, ducting and filtration for kitchens, basements, workshops and dense occupancies. We measure airflow, then design to the occupancy — not to a catalogue page.',
    capabilities: ['Kitchen extraction', 'Fresh-air supply', 'Ducting & filtration', 'Airflow balancing'],
    spec: [
      { label: 'Testing', value: 'Airflow & pressure measurement' },
      { label: 'Compliance', value: 'Occupancy-led design' },
      { label: 'Scope', value: 'New builds & retrofits' },
    ],
    metric: { value: '100%', label: 'Balanced before handover' },
  },
  {
    id: 'maintenance',
    index: '06',
    title: 'Maintenance & 24/7',
    tagline: 'Prevent the breakdown, not just the invoice.',
    description:
      'Scheduled service contracts that protect efficiency, lifespan and manufacturer warranty — with priority response, discounted repairs and reporting your facilities team can actually use.',
    capabilities: ['Scheduled servicing', '15-point health checks', 'Priority SLAs', 'Emergency callouts'],
    spec: [
      { label: 'Contracts', value: 'From R300 / month' },
      { label: 'SLA', value: '4-hour priority response' },
      { label: 'Reporting', value: 'Written service reports' },
    ],
    metric: { value: '3 yrs', label: 'Zero breakdowns, Rosebank site' },
  },
  {
    id: 'energy',
    index: '07',
    title: 'Energy efficiency',
    tagline: 'Find the money your building is leaking.',
    description:
      'Energy audits, inverter retrofits and smart control upgrades. We measure the load, isolate the losses and quote a fixed-scope upgrade with a realistic payback — then verify the saving after commissioning.',
    capabilities: ['Energy audits', 'Inverter retrofits', 'Smart controls', 'Post-install verification'],
    spec: [
      { label: 'Deliverable', value: 'Written audit + payback model' },
      { label: 'Typical saving', value: '18–35% of HVAC draw' },
      { label: 'Verification', value: 'Measured after commissioning' },
    ],
    metric: { value: '−28%', label: 'Verified at Sandton office' },
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  location: string;
  sector: string;
  scope: string;
  outcome: string;
  specs: { label: string; value: string }[];
  hue: number;
};

export const projects: Project[] = [
  {
    id: 'sandton-hq',
    index: '01',
    title: 'Three floors, one climate',
    location: 'Sandton, Johannesburg',
    sector: 'Commercial HVAC',
    scope:
      'Full commercial HVAC installation across three floors, phased around occupied desks and live meeting rooms.',
    outcome: 'Energy-efficient inverter systems cut electricity costs by 28% with zero business disruption.',
    specs: [
      { label: 'System', value: 'Inverter multi-split' },
      { label: 'Floors', value: '03' },
      { label: 'Saving', value: '28%' },
    ],
    hue: 191,
  },
  {
    id: 'cold-room-recovery',
    index: '02',
    title: 'Midnight cold-chain rescue',
    location: 'Restaurant, Johannesburg',
    sector: 'Cold room',
    scope:
      'Compressor failure on a commercial cold room holding a full service stock. Emergency callout, parts sourced the same night.',
    outcome: 'System running by 02:00. Zero stock lost, restaurant open for lunch service.',
    specs: [
      { label: 'Response', value: '2 hours' },
      { label: 'Compressor', value: 'Replaced' },
      { label: 'Stock lost', value: 'R0' },
    ],
    hue: 206,
  },
  {
    id: 'randburg-split',
    index: '03',
    title: 'Restoring rated capacity',
    location: 'Randburg, Gauteng',
    sector: 'Residential',
    scope:
      'Blocked coils, a slow refrigerant leak and clogged filters on a residential split unit running hot all summer.',
    outcome: 'Full service, leak repair and gas recharge restored the unit to 100% of rated capacity.',
    specs: [
      { label: 'Fault', value: 'Leak + fouled coil' },
      { label: 'Time', value: 'Same day' },
      { label: 'Capacity', value: '100%' },
    ],
    hue: 186,
  },
  {
    id: 'midrand-contract',
    index: '04',
    title: 'Three years, zero breakdowns',
    location: 'Midrand, Gauteng',
    sector: 'Maintenance',
    scope:
      'Planned maintenance contract across a multi-tenant office park: quarterly servicing, filter cycles and priority response.',
    outcome: 'No unplanned breakdowns in three years. Manufacturer warranties intact across the estate.',
    specs: [
      { label: 'Term', value: '36 months' },
      { label: 'Units', value: '24' },
      { label: 'Breakdowns', value: '0' },
    ],
    hue: 196,
  },
  {
    id: 'cape-freezer',
    index: '05',
    title: 'A freezer that never slept',
    location: 'Cape Town, Western Cape',
    sector: 'Refrigeration',
    scope:
      'Walk-in freezer compressor replacement and control recalibration for a food-and-beverage producer with daily dispatch.',
    outcome: 'Returned to temperature overnight, dispatch unaffected, refrigerant charge verified and logged.',
    specs: [
      { label: 'Unit', value: 'Walk-in freezer' },
      { label: 'Window', value: 'Overnight' },
      { label: 'Dispatch', value: 'On time' },
    ],
    hue: 199,
  },
];

export const technology = {
  eyebrow: '05 — The physics, made visible',
  title: 'Every degree is a decision.',
  intro:
    'Cooling is not a product you bolt to a wall. It is a loop: refrigerant absorbs heat, the compressor raises its pressure, the condenser rejects that heat outside, and the expansion valve starts the cycle again. Get one stage wrong and the whole building pays for it.',
  metrics: [
    { label: 'Refrigerant', value: 'Low-GWP blends' },
    { label: 'Control', value: 'Inverter-driven' },
    { label: 'Verification', value: 'Measured, not assumed' },
  ],
  presets: [
    {
      id: 'office',
      label: 'Office floor',
      ambient: 31,
      setpoint: 22,
      load: 72,
      saving: 28,
      note: 'Inverter VRF, occupancy-zoned, economiser cycle on shoulder months.',
    },
    {
      id: 'coldroom',
      label: 'Cold room',
      ambient: 34,
      setpoint: -18,
      load: 91,
      saving: 19,
      note: 'High-duty condensing unit, door-alarm interlocks, overnight defrost schedule.',
    },
    {
      id: 'retail',
      label: 'Retail floor',
      ambient: 29,
      setpoint: 23,
      load: 64,
      saving: 22,
      note: 'Display refrigeration with night blinds, heat reclaim to the shop floor.',
    },
  ],
} as const;

export const caseStudies = [
  {
    value: 28,
    suffix: '%',
    label: 'Energy reduction',
    context: 'Sandton commercial HQ, three floors',
    detail: 'Measured against the prior 12-month HVAC baseline after inverter commissioning.',
  },
  {
    value: 0,
    prefix: 'R',
    label: 'Stock lost',
    context: 'Emergency cold-room recovery',
    detail: 'Compressor sourced and replaced overnight while the kitchen held a full service stock.',
  },
  {
    value: 4,
    suffix: 'h',
    label: 'Priority response',
    context: 'Maintenance contract SLA',
    detail: 'Guaranteed on-site window for contracted clients across the Gauteng metros.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Workmanship cover',
    context: 'Every installation, no exceptions',
    detail: 'If our work is not right, we return and fix it at no additional cost.',
  },
] as const;

export const process = [
  {
    step: '01',
    title: 'Request',
    body: 'Send the form, WhatsApp or call. We reply within 30 minutes during business hours — sooner if it is an emergency.',
  },
  {
    step: '02',
    title: 'Assess',
    body: 'A certified technician measures the actual load, inspects the plant and writes up what is really happening.',
  },
  {
    step: '03',
    title: 'Quote',
    body: 'Fixed, itemised pricing before anything is touched. You approve the number, not a range.',
  },
  {
    step: '04',
    title: 'Commission',
    body: 'Install, test, balance and hand over with documentation. Backed by our workmanship guarantee.',
  },
] as const;

export const testimonials = [
  {
    quote:
      'My office aircon died in the middle of summer. Totally Cool had a certified technician on-site within two hours and fixed it the same day.',
    name: 'James Mthembu',
    role: 'Operations Manager — Sandton',
    source: 'Google review',
  },
  {
    quote:
      'They installed two new inverter units at home and the difference is night and day. Professional, clean, on time, and the pricing was very fair.',
    name: 'Sipho Nkosi',
    role: 'Homeowner — Fourways',
    source: 'Google review',
  },
  {
    quote:
      'Three years on a maintenance contract and not a single breakdown. The only HVAC company I trust with our restaurant equipment.',
    name: 'Priya Venkatesan',
    role: 'Restaurant Owner — Rosebank',
    source: 'Google review',
  },
] as const;

export const coverage = [
  'Randburg',
  'Sandton',
  'Rosebank',
  'Fourways',
  'Midrand',
  'Roodepoort',
  'Johannesburg CBD',
  'Soweto',
  'Centurion',
  'Pretoria',
  'Pretoria East',
  'Tshwane',
  'Ekurhuleni',
  'Germiston',
  'Kempton Park',
  'Cape Town',
  'Century City',
  'Durban',
  'Umhlanga',
  'Gqeberha',
] as const;

export const faqs = [
  {
    q: 'How quickly can you respond to an emergency?',
    a: 'We aim to have a certified technician on-site within 2–4 hours for emergencies in the major Gauteng metros. After-hours callouts run 24/7, and premium SLA clients receive a guaranteed four-hour response.',
  },
  {
    q: 'Do you service all aircon brands?',
    a: 'Yes. We service and install all major brands, including Samsung, LG, Daikin, Carrier, Midea, Gree, York, Hitachi and Fujitsu. Our vans carry parts for the most common models so most faults are resolved on the first visit.',
  },
  {
    q: 'What does the 15-point health check include?',
    a: 'Refrigerant levels, filter condition, coil cleanliness, condensate drainage, electrical safety, thermostat accuracy, airflow performance and more. You receive a full written report with a no-obligation recommendation.',
  },
  {
    q: 'Do you offer maintenance contracts for businesses?',
    a: 'Yes. Contracts include scheduled services, priority callout response, discounted repair rates and written reporting. Plans start from R300 per month and are scoped to your equipment count and criticality.',
  },
  {
    q: 'How long does a typical installation take?',
    a: 'A standard residential split-unit installation takes three to five hours. Commercial projects are scoped individually, and we phase work around your operating hours to keep disruption low.',
  },
  {
    q: 'Is your workmanship guaranteed?',
    a: 'Every installation is covered by our workmanship guarantee, using manufacturer-backed parts. If something is not right after our work, we return and fix it at no additional cost.',
  },
] as const;

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#quote' },
] as const;
