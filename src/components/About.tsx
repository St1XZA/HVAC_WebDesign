import { useRef } from 'react';
import { useScrollVar } from '../lib/useScrollVar';
import { Reveal } from './Reveal';

const certs = ['SAQCC certified', 'PIRB registered', 'Licensed refrigeration engineers', 'Fully insured', 'All major brands'];

export function About() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref);

  return (
    <section className="section about" id="about" ref={ref} aria-labelledby="about-title">
      <div className="shell">
        <div className="about__grid">
          <div className="about__left">
            <Reveal>
              <p className="eyebrow">02 — About</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="section__title" id="about-title">
                Built in Randburg.
                <br />
                <em>Cold by design.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="about__statement">
                Since 1994 we have been the team other teams call when the building
                <em> has to stay cold.</em>
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="about__body">
                <p>
                  Totally Cool is a team of certified HVAC and refrigeration engineers — not a call
                  centre with subcontracted vans. We size the system, install it, commission it, and
                  answer the phone when it matters.
                </p>
                <p>
                  From a single split unit in a home office to a three-floor commercial fit-out or a
                  cold room holding tonight's service, the standard is the same: measured, documented,
                  guaranteed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="about__certs">
                {certs.map((cert) => (
                  <span className="chip" key={cert}>
                    {cert}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="about__right">
            <div className="about__layers">
              <Reveal className="layer glass" delay={60}>
                <span className="layer__num">01</span>
                <h3 className="layer__title">The workshop</h3>
                <span className="layer__meta">Randburg · 1994</span>
                <p className="layer__body">
                  Founded in Randburg as an air-conditioning and refrigeration specialist. Three
                  decades later, that is still the base — and still the standard.
                </p>
              </Reveal>
              <Reveal className="layer glass" delay={140}>
                <span className="layer__num">02</span>
                <h3 className="layer__title">The field</h3>
                <span className="layer__meta">1,000+ systems · today</span>
                <p className="layer__body">
                  Homes, headquarters, kitchens and cold rooms. Inverter retrofits, emergency callouts
                  and planned maintenance across the country.
                </p>
              </Reveal>
              <Reveal className="layer glass" delay={220}>
                <span className="layer__num">03</span>
                <h3 className="layer__title">The promise</h3>
                <span className="layer__meta">Workmanship guaranteed</span>
                <p className="layer__body">
                  Every installation is tested, balanced and documented. If it is not right, we come
                  back. No questions asked.
                </p>
              </Reveal>
            </div>

            <Reveal delay={260} scale>
              <figure className="about__figure">
                <svg viewBox="0 0 640 400" role="img" aria-label="Technical plate of a chiller plant: evaporator, compressor, condenser and expansion valve connected in a closed loop.">
                  <defs>
                    <radialGradient id="plateGlow" cx="30%" cy="30%" r="75%">
                      <stop offset="0%" stopColor="#46e6ff" stopOpacity="0.22" />
                      <stop offset="70%" stopColor="#46e6ff" stopOpacity="0" />
                    </radialGradient>
                    <pattern id="plateGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M32 0H0V32" fill="none" stroke="rgba(154,223,242,.08)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="640" height="400" fill="url(#plateGrid)" />
                  <rect width="640" height="400" fill="url(#plateGlow)" />
                  <g stroke="rgba(154,223,242,.30)" fill="none">
                    <circle cx="330" cy="196" r="118" strokeDasharray="2 8" />
                    <circle cx="330" cy="196" r="78" strokeDasharray="2 6" opacity=".6" />
                    <path d="M330 54v18M330 320v18M188 196h18M454 196h18" />
                  </g>
                  <g fill="none" stroke="rgba(154,223,242,.55)" strokeWidth="1.2">
                    <rect x="212" y="150" width="78" height="92" rx="8" />
                    <rect x="370" y="150" width="78" height="92" rx="8" />
                    <circle cx="330" cy="196" r="24" />
                    <path d="M290 172h-18M428 172h18" />
                  </g>
                  <g stroke="#46e6ff" strokeWidth="1.4" fill="none" strokeDasharray="3 7" strokeLinecap="round">
                    <path d="M330 172V96M330 220v76" />
                    <path d="M212 196h-42a26 26 0 0 0-26 26v40" />
                    <path d="M448 196h42a26 26 0 0 1 26 26v40" />
                  </g>
                  <g fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="1.4" fill="rgba(196,228,238,.8)">
                    <text x="212" y="142">EVAPORATOR</text>
                    <text x="370" y="142">CONDENSER</text>
                    <text x="303" y="199" fill="#9adff2">COMP</text>
                    <text x="40" y="278">EXPANSION</text>
                    <text x="40" y="290" fill="rgba(126,148,157,.9)">VALVE / TX</text>
                    <text x="518" y="278">PLANT</text>
                    <text x="518" y="290" fill="rgba(126,148,157,.9)">ROOM 01</text>
                    <text x="518" y="70">SETPOINT</text>
                    <text x="518" y="86" fill="#9adff2" fontSize="12">−18.0 °C</text>
                  </g>
                  <g stroke="rgba(154,223,242,.25)" strokeWidth="1">
                    <path d="M40 344h560" />
                    <path d="M40 338v12M152 338v12M264 338v12M376 338v12M488 338v12M600 338v12" />
                  </g>
                  <g fontFamily="'JetBrains Mono', monospace" fontSize="7" letterSpacing="1.2" fill="rgba(126,148,157,.9)">
                    <text x="40" y="362">0</text>
                    <text x="264" y="362">PLANT LENGTH / m</text>
                    <text x="584" y="362">24</text>
                    <text x="40" y="36" fill="rgba(154,223,242,.75)">FIELD PLATE 01 — CHILLER LOOP</text>
                    <text x="518" y="36" fill="rgba(126,148,157,.8)">REV 04.26</text>
                  </g>
                </svg>
                <figcaption>Fig. 01 — Closed-loop cooling, documented before handover</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
