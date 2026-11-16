import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { contact, stats } from '../content/site';
import { prefersReducedMotion, scrollToId } from '../lib/scroll';
import type { ColdField } from '../lib/coldField';
import { ArrowDown, ArrowUpRight, Chat } from './Icons';
import { Magnetic } from './Magnetic';

const IDLE_DELAY = 2800;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<ColdField | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [ambient, setAmbient] = useState(31.4);

  useEffect(() => {
    // rAF can be suspended in an occluded tab; the timer guarantees the chamber opens.
    const reveal = () => setReady(true);
    const timer = window.setTimeout(reveal, 80);
    const raf = requestAnimationFrame(reveal);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pointer idle → frost. Any input melts it again.
  useEffect(() => {
    const wake = () => {
      setFrozen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setFrozen(true), IDLE_DELAY);
    };

    wake();
    window.addEventListener('pointermove', wake, { passive: true });
    window.addEventListener('pointerdown', wake, { passive: true });
    window.addEventListener('keydown', wake);
    window.addEventListener('scroll', wake, { passive: true });

    return () => {
      window.clearTimeout(timerRef.current);
      window.removeEventListener('pointermove', wake);
      window.removeEventListener('pointerdown', wake);
      window.removeEventListener('keydown', wake);
      window.removeEventListener('scroll', wake);
    };
  }, []);

  useEffect(() => {
    fieldRef.current?.setFreeze(frozen);
  }, [frozen]);

  // Ambient reading drifts slowly, like a real sensor.
  useEffect(() => {
    const id = window.setInterval(() => {
      setAmbient((value) => {
        const next = value + (Math.random() - 0.5) * 0.22;
        return Math.round(Math.min(32.2, Math.max(30.7, next)) * 10) / 10;
      });
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  // Load Three.js only once the hero is on screen; degrade to the CSS atmosphere if WebGL fails.
  useEffect(() => {
    const container = canvasRef.current;
    const hero = heroRef.current;
    if (!container || !hero) return;

    let cancelled = false;
    let field: ColdField | null = null;
    let io: IntersectionObserver | null = null;

    const reduced = prefersReducedMotion();

    import('../lib/coldField').then(({ createColdField }) => {
      if (cancelled) return;
      field = createColdField(container, reduced);
      fieldRef.current = field;
      field?.setFreeze(false);
      if (field) {
        container.dataset.webgl = 'true';
        io = new IntersectionObserver(
          (entries) => field?.setActive(Boolean(entries[0]?.isIntersecting)),
          { threshold: 0 },
        );
        io.observe(hero);
      }
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      field?.dispose();
      fieldRef.current = null;
    };
  }, []);

  const delta = (ambient - -18).toFixed(1);

  return (
    <section
      className={`hero ${ready ? 'is-ready' : ''}`.trim()}
      id="top"
      ref={heroRef}
      data-frozen={frozen}
      aria-labelledby="hero-title"
    >
      <div className="hero__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__frost" aria-hidden="true" />

      <div className="hero__rail hero__rail--left" aria-hidden="true">
        Climate engineering · 26.0936° S / 28.0064° E
      </div>
      <div className="hero__rail hero__rail--right" aria-hidden="true">
        Chamber 01 · {frozen ? 'holding' : 'field active'}
      </div>

      <div className="hero__inner shell">
        <div className="hero__copy">
          <p className="eyebrow" style={{ '--d': '80ms' } as CSSProperties}>
            South Africa · Since 1994
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="line">
              <span style={{ '--d': '140ms' } as CSSProperties}>Cooling</span>
            </span>
            <span className="line">
              <span style={{ '--d': '280ms' } as CSSProperties}>
                the <em>future.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lede" style={{ '--d': '460ms' } as CSSProperties}>
            HVAC, refrigeration and cold-chain engineering for the spaces South Africa can't afford to
            get wrong. <strong>Designed, installed and guaranteed</strong> by the team that has been
            doing it since 1994.
          </p>

          <div className="hero__actions" style={{ '--d': '600ms' } as CSSProperties}>
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
              <a className="btn btn--ghost" href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                <span>
                  <Chat size={14} /> Free 15-point check
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="hero__micro" style={{ '--d': '740ms' } as CSSProperties}>
            <span>24/7 emergency response</span>
            <span>SAQCC certified</span>
            <span>Workmanship guaranteed</span>
          </div>

          <div className="hero__readout" aria-hidden="true">
            <span>Chamber 01</span>
            <b>−18.0 °C</b>
            <span>{frozen ? 'Holding' : 'Nominal'}</span>
          </div>
        </div>

        <aside className="chamber glass" aria-label="Live cold chamber readout">
          <div className="chamber__head">
            <span className="mono">Chamber 01</span>
            <span className="chamber__status">{frozen ? 'Holding' : 'Nominal'}</span>
          </div>
          <span className="chamber__label">Setpoint</span>
          <div className="chamber__big">
            −18.0<i>°C</i>
          </div>
          <div className="chamber__delta">
            Ambient {ambient.toFixed(1)} °C · Δ {delta} K
          </div>
          <div className="chamber__rows">
            <div className="chamber__row">
              <span>Refrigerant</span>
              <b>R-32 / R-454B</b>
            </div>
            <div className="chamber__row">
              <span>Response</span>
              <b>2–4 hours</b>
            </div>
            <div className="chamber__row">
              <span>Loop</span>
              <b>{frozen ? 'Idle / stable' : 'Circulating'}</b>
            </div>
          </div>
          <div className="chamber__bar" aria-hidden="true">
            <i />
          </div>
        </aside>
      </div>

      <div className="hero__cue" aria-hidden="true">
        <span>Scroll to enter</span>
        <i />
        <ArrowDown size={11} />
      </div>

      <div className="hero__stats">
        {stats.map((stat) => (
          <div className="hero__stat" key={stat.label}>
            <b>
              {stat.value}
              {'suffix' in stat && stat.suffix ? <i>{stat.suffix}</i> : null}
            </b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
