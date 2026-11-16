import { contact } from '../content/site';
import {
  areaHref,
  getLandingArea,
  getLandingService,
  serviceHref,
  type LandingArea,
  type LandingService,
} from '../content/landing';
import { scrollToId } from '../lib/scroll';
import type { PageKind } from '../lib/routes';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Quote } from './Quote';
import { Reveal } from './Reveal';
import { Magnetic } from './Magnetic';
import { ArrowUpRight, Phone } from './Icons';

type LandingPageProps = { kind: Extract<PageKind, 'service' | 'area'>; slug: string };

const cleanTitle = (service: LandingService) => service.heroTitle.replace(/,\s*$/, '');

function MissingPage() {
  return (
    <>
      <Nav onHome={false} />
      <main id="main" className="landing-missing shell">
        <p className="eyebrow">404 — Not found</p>
        <h1 className="section__title">That page is not in the plant room.</h1>
        <p>The service or area you asked for does not have a page yet.</p>
        <div className="landing-missing__links">
          <a className="btn" href="/">
            <span>Back to home</span>
          </a>
          <a className="btn btn--ghost" href="/#services">
            <span>All services</span>
          </a>
          <a className="btn btn--ghost" href="/#coverage">
            <span>Areas served</span>
          </a>
        </div>
      </main>
      <Footer onHome={false} />
    </>
  );
}

export function LandingPage({ kind, slug }: LandingPageProps) {
  const service = kind === 'service' ? getLandingService(slug) : undefined;
  const area = kind === 'area' ? getLandingArea(slug) : undefined;

  if (!service && !area) return <MissingPage />;

  const isService = Boolean(service);
  const page = service ?? area!;
  const title = service ? cleanTitle(service) : area!.name;
  const quoteKicker = isService ? `Start here — ${title}` : `Start here — ${area!.name}`;

  const steps = service ? service.scope : area!.approach;
  const stepsTitle = service ? service.scopeTitle : area!.approachTitle;
  const parent = isService
    ? { label: 'Services', href: '/#services' }
    : { label: 'Areas served', href: '/#coverage' };

  const relatedServiceSlugs = service ? service.related : area!.relatedServices;
  const relatedServices = [
    ...new Set(relatedServiceSlugs.map((item) => getLandingService(item)).filter(Boolean) as LandingService[]),
  ];
  const relatedAreaSlugs = service ? service.local.map((item) => item.areaSlug) : area!.relatedAreas;
  const relatedAreas = [
    ...new Set(relatedAreaSlugs.map((item) => getLandingArea(item)).filter(Boolean) as LandingArea[]),
  ];

  return (
    <>
      <Nav onHome={false} />
      <main id="main">
        <section className={`landing-hero landing-hero--${kind}`} aria-labelledby="landing-title">
          <div className="landing-hero__bg" aria-hidden="true" />
          <span className="landing-hero__index" aria-hidden="true">{page.index}</span>

          <div className="shell landing-hero__inner">
            <div className="landing-hero__copy">
              <nav className="crumbs" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span aria-hidden="true">/</span>
                <a href={parent.href}>{parent.label}</a>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{title}</span>
              </nav>

              <p className="eyebrow">{page.heroKicker}</p>
              <h1 className="landing-hero__title" id="landing-title">
                {page.heroTitle} <em>{page.heroAccent}</em>
              </h1>
              <p className="landing-hero__lede">{page.lede}</p>

              <div className="hero__actions">
                <Magnetic>
                  <a
                    className="btn"
                    href="#quote"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId('#quote');
                    }}
                  >
                    <span>
                      Request a survey <ArrowUpRight size={14} />
                    </span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn--ghost" href={contact.phoneHref}>
                    <span>
                      <Phone size={14} /> {contact.phone}
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>

            <aside className="landing-card glass" aria-label={`${title} at a glance`}>
              <div className="landing-card__head">
                <span className="mono">{isService ? 'Service brief' : 'Area brief'}</span>
                <span className="chamber__status">{isService ? 'Scoped' : 'Covered'}</span>
              </div>
              <dl className="landing-card__rows">
                {page.summary.map((row) => (
                  <div className="landing-card__row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="tlink"
                href="#quote"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId('#quote');
                }}
              >
                Start a request
              </a>
            </aside>
          </div>
        </section>

        <section className="section landing-brief" aria-labelledby="brief-title">
          <div className="shell landing-brief__grid">
            <div className="landing-brief__aside">
              <Reveal>
                <p className="eyebrow">{isService ? 'The brief' : 'The local brief'}</p>
                <h2 className="section__title" id="brief-title" style={{ marginTop: '1rem' }}>
                  {page.introTitle}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <div className="landing-proof glass">
                  <b>{page.proof.value}</b>
                  <span>{page.proof.label}</span>
                  <p>{page.proof.note}</p>
                </div>
              </Reveal>
            </div>
            <div className="landing-brief__body">
              {page.intro.map((paragraph) => (
                <Reveal key={paragraph} as="p">
                  {paragraph}
                </Reveal>
              ))}
              <Reveal as="p" className="landing-brief__note">
                Work across {isService ? 'South Africa' : area!.region} is delivered by Totally Cool's own
                certified engineers. {isService ? 'Request a site survey' : 'Confirm coverage'} on{' '}
                <a className="tlink" href={contact.phoneHref}>{contact.phone}</a>.
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section--divided landing-steps-section" aria-labelledby="steps-title">
          <div className="shell">
            <div className="section__head">
              <Reveal>
                <p className="eyebrow">{isService ? 'How we scope it' : 'How we work here'}</p>
                <h2 className="section__title" id="steps-title" style={{ marginTop: '1rem' }}>
                  {stepsTitle}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section__aside">
                  {isService
                    ? 'Every stage produces something you can check: a measured load, a fixed scope, a commissioned system and a handover pack.'
                    : `The local approach is shaped by the buildings, access and climate of ${area!.name}.`}
                </p>
              </Reveal>
            </div>

            <div className="landing-steps">
              {steps.map((step, index) => (
                <Reveal className="landing-step glass" key={step.title} delay={index * 80}>
                  <span className="landing-step__num">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {service && (
          <section className="section section--divided landing-signals" aria-labelledby="signals-title">
            <div className="shell landing-signals__grid">
              <div>
                <Reveal>
                  <p className="eyebrow">Signals</p>
                  <h2 className="section__title" id="signals-title" style={{ marginTop: '1rem' }}>
                    {service.signalsTitle}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="section__aside" style={{ marginTop: '1rem' }}>
                    {service.signalsLead}
                  </p>
                </Reveal>
              </div>
              <Reveal delay={80}>
                <ul className="signal-list">
                  {service.signals.map((signal) => (
                    <li key={signal}>
                      <span aria-hidden="true">+</span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}

        <section className="section section--divided landing-local" aria-labelledby="local-title">
          <div className="shell">
            <div className="section__head">
              <Reveal>
                <p className="eyebrow">{isService ? 'Where it runs' : 'Local detail'}</p>
                <h2 className="section__title" id="local-title" style={{ marginTop: '1rem' }}>
                  {page.localTitle}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section__aside">
                  {isService
                    ? 'Different buildings ask different things of the same discipline. These are the local conditions we design around.'
                    : 'A national standard, applied to the roads, buildings and climate of this area.'}
                </p>
              </Reveal>
            </div>

            {service ? (
              <div className="landing-local__grid">
                {service.local.map((item) => {
                  const linked = getLandingArea(item.areaSlug);
                  return (
                    <Reveal key={`${item.areaSlug}-${item.label}`}>
                      <a className="local-card" href={areaHref(item.areaSlug)}>
                        <span className="local-card__tag">{linked?.region ?? 'Area'}</span>
                        <h3>{item.label}</h3>
                        <p>{item.body}</p>
                        <span className="local-card__link">
                          View {item.label} <ArrowUpRight size={12} />
                        </span>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            ) : area ? (
              <>
                <div className="landing-local__grid">
                  {area.local.map((item) => (
                    <Reveal key={item.title}>
                      <div className="local-card">
                        <span className="local-card__tag">{area.name}</span>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={100}>
                  <div className="landing-systems">
                    <p className="eyebrow">Systems we specify here</p>
                    <div className="systems">
                      {area.systems.map((system) => (
                        <span className="chip" key={system}>{system}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </>
            ) : null}
          </div>
        </section>

        <section className="section section--divided landing-faq" aria-labelledby="landing-faq-title">
          <div className="shell faq__grid">
            <div className="faq__aside">
              <Reveal>
                <p className="eyebrow">Questions</p>
                <h2 className="section__title" id="landing-faq-title" style={{ marginTop: '1rem' }}>
                  Before you <em>book.</em>
                </h2>
              </Reveal>
              <Reveal delay={110}>
                <p>
                  {isService
                    ? 'The questions we are asked most often about this discipline.'
                    : `The questions we are asked most often about working in ${area!.name}.`}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <a className="tlink" href={contact.phoneHref}>
                  Ask an engineer directly
                </a>
              </Reveal>
            </div>
            <Reveal className="accordion" delay={120}>
              {page.faqs.map((item, index) => (
                <details className="acc" key={item.q} open={index === 0}>
                  <summary className="acc__summary">
                    <span>{item.q}</span>
                    <span className="acc__icon" aria-hidden="true" />
                  </summary>
                  <div className="acc__body">{item.a}</div>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section section--divided landing-cross" aria-labelledby="cross-title">
          <div className="shell">
            <div className="section__head">
              <Reveal>
                <p className="eyebrow">Continue</p>
                <h2 className="section__title" id="cross-title" style={{ marginTop: '1rem' }}>
                  Related <em>work.</em>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section__aside">
                  Every discipline connects to the others. These are the pages closest to this brief.
                </p>
              </Reveal>
            </div>

            <div className="cross-grid">
              {relatedServices.map((item) => (
                <a className="cross-card" href={serviceHref(item.slug)} key={item.slug}>
                  <span>
                    <span className="cross-card__kind">Service</span>
                    <b>{cleanTitle(item)}</b>
                  </span>
                  <ArrowUpRight size={15} />
                </a>
              ))}
              {relatedAreas.map((item) => (
                <a className="cross-card" href={areaHref(item.slug)} key={item.slug}>
                  <span>
                    <span className="cross-card__kind">Area · {item.region}</span>
                    <b>{item.name}</b>
                  </span>
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <Quote kicker={quoteKicker} />
      </main>
      <Footer onHome={false} />
    </>
  );
}
