import { useRef } from 'react';
import { process } from '../content/site';
import { useScrollVar } from '../lib/useScrollVar';
import { Reveal } from './Reveal';

export function Process() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref);

  return (
    <section className="section section--divided process" ref={ref} aria-labelledby="process-title">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">07 — How it runs</p>
            <h2 className="section__title" id="process-title" style={{ marginTop: '1rem' }}>
              Four steps. <em>No surprises.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section__aside">
              The process is deliberately boring: measure, price, install, document. It is the reason
              the phone does not ring at midnight.
            </p>
          </Reveal>
        </div>

        <div className="process__track">
          <div className="process__line" aria-hidden="true">
            <i />
          </div>
          {process.map((step, index) => (
            <Reveal className="process__step" key={step.step} delay={index * 100}>
              <span className="process__num">{step.step}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__body">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
