import { useRef, useState } from 'react';
import { services } from '../content/site';
import { scrollToId } from '../lib/scroll';
import { serviceHref } from '../content/landing';
import { ArrowUpRight, ArrowRight } from './Icons';
import { Reveal } from './Reveal';

const ART_CURVES = [
  ['M18 128C72 54 118 150 186 104S272 34 318 72', 'M18 148C80 84 128 166 196 126S278 62 318 96', 'M18 106C64 38 112 124 178 84S268 18 318 50'],
  ['M18 88C78 132 116 42 178 74S268 138 318 96', 'M18 110C86 150 124 62 190 92S276 152 318 118', 'M18 66C72 110 108 24 170 54S262 112 318 70'],
  ['M18 100C70 100 92 44 152 44S238 128 318 100', 'M18 120C78 120 100 66 160 66S244 148 318 122', 'M18 80C66 80 86 26 146 26S232 106 318 78'],
];

function ServiceArt({ index, label }: { index: number; label: string }) {
  const curves = ART_CURVES[index % ART_CURVES.length];
  return (
    <div className="service-panel__art" aria-hidden="true">
      <svg viewBox="0 0 336 168" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="artGlow" cx="18%" cy="14%" r="70%">
            <stop offset="0%" stopColor="#46e6ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#46e6ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="336" height="168" fill="url(#artGlow)" />
        <g stroke="rgba(154,223,242,.10)" strokeWidth="1">
          <path d="M0 42h336M0 84h336M0 126h336M84 0v168M168 0v168M252 0v168" />
        </g>
        {curves.map((d, i) => (
          <path
            key={d}
            d={d}
            className={`airflow ${i === 1 ? 'airflow--dim' : ''}`}
            style={{ animationDelay: `${i * -0.8}s` }}
          />
        ))}
        <circle cx="318" cy={index % 2 === 0 ? 72 : 96} r="3" fill="#46e6ff" />
        <circle cx="18" cy={index % 2 === 0 ? 128 : 88} r="2" fill="rgba(154,223,242,.8)" />
      </svg>
      <span className="service-panel__art-label">{label}</span>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const service = services[active];

  return (
    <section className="section section--divided services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">03 — Capabilities</p>
            <h2 className="section__title" id="services-title" style={{ marginTop: '1rem' }}>
              Seven disciplines.
              <br />
              <em>One cold chain.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section__aside">
              Select a discipline to see how we scope it. Every line is delivered by our own certified
              engineers — from a single split unit to a full plant room.
            </p>
          </Reveal>
        </div>

        <div className="services__layout">
          <div className="services__list" role="group" aria-label="Service disciplines">
            {services.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className="service-row"
                aria-pressed={active === index}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => {
                  setActive(index);
                  panelRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }}
              >
                <span className="service-row__index">{item.index}</span>
                <span className="service-row__title">{item.title}</span>
                <span className="service-row__tag">{item.tagline}</span>
                <span className="service-row__arrow" aria-hidden="true">
                  <ArrowUpRight size={13} />
                </span>
              </button>
            ))}
          </div>

          <div className="service-panel glass" ref={panelRef} aria-live="polite">
            <div key={service.id} className="service-panel__swap">
              <ServiceArt index={active} label={`Airflow schematic · ${service.title}`} />

              <div className="service-panel__top" style={{ marginTop: '1.15rem' }}>
                <div>
                  <h3 className="service-panel__title">{service.title}</h3>
                  <p className="service-panel__tagline">{service.tagline}</p>
                </div>
                <span className="mono">{service.index} / 07</span>
              </div>

              <p className="service-panel__desc" style={{ marginTop: '0.9rem' }}>
                {service.description}
              </p>

              <div className="service-panel__caps" style={{ marginTop: '1rem' }}>
                {service.capabilities.map((cap) => (
                  <span className="chip" key={cap}>
                    {cap}
                  </span>
                ))}
              </div>

              <div className="service-panel__spec">
                {service.spec.map((row) => (
                  <div className="service-panel__spec-row" key={row.label}>
                    <span>{row.label}</span>
                    <b>{row.value}</b>
                  </div>
                ))}
              </div>

              <div className="service-panel__metric" style={{ marginTop: '1rem' }}>
                <b>{service.metric.value}</b>
                <span>{service.metric.label}</span>
              </div>

              <div className="service-panel__actions">
                <a className="btn btn--ghost btn--sm" href={serviceHref(service.id)}>
                  <span>
                    Full service brief <ArrowRight size={13} />
                  </span>
                </a>
                <a
                  className="tlink"
                  href="#quote"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId('#quote');
                  }}
                >
                  Or get a quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
