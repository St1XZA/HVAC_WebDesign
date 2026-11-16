import { caseStudies } from '../content/site';
import { Counter } from './Counter';
import { Reveal } from './Reveal';

export function Cases() {
  return (
    <section className="section cases" aria-labelledby="cases-title">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">06 — Measured outcomes</p>
            <h2 className="section__title" id="cases-title" style={{ marginTop: '1rem' }}>
              Numbers we can <em>defend.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section__aside">
              No stock imagery, no invented awards. These are the figures that matter to a facilities
              manager or a kitchen at 23:00: energy, uptime, stock and response.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell">
        <div className="cases__grid">
          {caseStudies.map((item, index) => (
            <Reveal className="case" key={item.label} delay={index * 90}>
              <span className="case__index">0{index + 1}</span>
              <span className="case__value">
                <Counter
                  to={item.value}
                  prefix={'prefix' in item ? item.prefix : ''}
                  suffix={'suffix' in item ? item.suffix : ''}
                />
              </span>
              <span className="case__label">{item.label}</span>
              <span className="case__context">{item.context}</span>
              <span className="case__detail">{item.detail}</span>
            </Reveal>
          ))}
        </div>
        <p className="mono" style={{ marginTop: '1rem', color: 'rgba(126,148,157,.8)' }}>
          Figures from completed Totally Cool projects. Measurement periods and scopes vary per site.
        </p>
      </div>
    </section>
  );
}
