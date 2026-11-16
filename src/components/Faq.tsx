import { contact, faqs } from '../content/site';
import { ArrowUpRight } from './Icons';
import { Reveal } from './Reveal';

export function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="shell">
        <div className="faq__grid">
          <div className="faq__aside">
            <Reveal>
              <p className="eyebrow">10 — Questions</p>
              <h2 className="section__title" id="faq-title" style={{ marginTop: '1rem' }}>
                The things <em>people ask.</em>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p>
                Still unsure? A technician — not a script — can talk you through it before you commit
                to anything.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <a className="btn btn--ghost btn--sm" href={contact.phoneHref}>
                <span>
                  Call {contact.phone} <ArrowUpRight size={13} />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal className="accordion" delay={120}>
            {faqs.map((item, index) => (
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
      </div>
    </section>
  );
}
