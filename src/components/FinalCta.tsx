import { contact } from '../content/site';
import { scrollToId } from '../lib/scroll';
import { ArrowUpRight, Phone } from './Icons';
import { Magnetic } from './Magnetic';
import { Reveal } from './Reveal';

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="shell final-cta__inner">
        <Reveal>
          <p className="eyebrow">Ready when you are</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="final-cta__title" id="final-title">
            Stop <em>sweating</em> it.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="final-cta__sub">
            Tell us what needs cooling. A certified engineer will scope it, price it, and stand behind
            the work.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="final-cta__actions">
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
                  Request a quote <ArrowUpRight size={14} />
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
        </Reveal>
        <Reveal delay={280}>
          <span className="mono">{contact.hours} · {contact.base}</span>
        </Reveal>
      </div>
    </section>
  );
}
