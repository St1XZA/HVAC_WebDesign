import { useState } from 'react';
import { technology } from '../content/site';
import { Reveal } from './Reveal';

const FLOW_A = 'M146 178V120H340';
const FLOW_B = 'M420 120H614V176';
const FLOW_C = 'M614 274V349H426';
const FLOW_D = 'M334 349H146V276';

export function Technology() {
  const [presetIndex, setPresetIndex] = useState(0);
  const preset = technology.presets[presetIndex];
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - preset.load / 100);

  return (
    <section className="section section--divided tech" id="technology" aria-labelledby="tech-title">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">05 — The physics, made visible</p>
            <h2 className="section__title" id="tech-title" style={{ marginTop: '1rem' }}>
              Every degree is <em>a decision.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section__aside">{technology.intro}</p>
          </Reveal>
        </div>

        <div className="tech__grid">
          <Reveal className="tech__board glass">
            <div className="tech__board-head">
              <span>Schematic 01 — vapour compression loop</span>
              <span>{preset.label}</span>
            </div>

            <svg
              className="tech__schematic"
              viewBox="0 0 760 430"
              role="img"
              aria-labelledby="schematic-title schematic-desc"
            >
              <title id="schematic-title">Vapour compression cooling loop</title>
              <desc id="schematic-desc">
                Refrigerant leaves the evaporator as low-pressure gas, is compressed, rejects heat in
                the condenser, then expands back into the evaporator. Current preset: {preset.label},
                ambient {preset.ambient} degrees, setpoint {preset.setpoint} degrees.
              </desc>

              <defs>
                <pattern id="techGrid" width="38" height="38" patternUnits="userSpaceOnUse">
                  <path d="M38 0H0V38" fill="none" stroke="rgba(154,223,242,.075)" strokeWidth="1" />
                </pattern>
                <linearGradient id="tempGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#8fe6fb" />
                  <stop offset="45%" stopColor="#46e6ff" />
                  <stop offset="75%" stopColor="#9adff2" />
                  <stop offset="100%" stopColor="#ffb489" />
                </linearGradient>
                <radialGradient id="compGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#46e6ff" stopOpacity=".3" />
                  <stop offset="100%" stopColor="#46e6ff" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="760" height="430" fill="url(#techGrid)" />

              <text className="schematic__label" x="70" y="34">
                Schematic 01 — vapour compression
              </text>
              <text className="schematic__label schematic__label--dim" x="690" y="34" textAnchor="end">
                live preset / {preset.label}
              </text>

              <circle cx="380" cy="120" r="76" fill="url(#compGlow)" />

              <rect className="schematic__node" x="70" y="178" width="152" height="96" rx="7" />
              <rect className="schematic__node schematic__node--hot" x="538" y="178" width="152" height="96" rx="7" />
              <circle className="schematic__node" cx="380" cy="120" r="38" />
              <rect className="schematic__node" x="336" y="326" width="88" height="46" rx="6" />

              <path className="schematic__pipe" d={FLOW_A} />
              <path className="schematic__pipe" d={FLOW_B} />
              <path className="schematic__pipe" d={FLOW_C} />
              <path className="schematic__pipe" d={FLOW_D} />

              <path className="schematic__flow" d={FLOW_A} />
              <path className="schematic__flow schematic__flow--warm" d={FLOW_B} />
              <path className="schematic__flow" d={FLOW_C} />
              <path className="schematic__flow" d={FLOW_D} />

              <g className="schematic__dots" fill="#eaf8fc">
                <circle r="2.6">
                  <animateMotion dur="7s" repeatCount="indefinite" path={FLOW_A} />
                </circle>
                <circle r="2.4" fill="#ffb489">
                  <animateMotion dur="5.5s" repeatCount="indefinite" path={FLOW_B} />
                </circle>
                <circle r="2.2">
                  <animateMotion dur="6.4s" repeatCount="indefinite" path={FLOW_C} />
                </circle>
                <circle r="2.2" fill="#8fe6fb">
                  <animateMotion dur="8.2s" repeatCount="indefinite" path={FLOW_D} />
                </circle>
              </g>

              <g className="schematic__label">
                <text x="70" y="170">EVAPORATOR</text>
                <text className="schematic__label--dim" x="70" y="292">AIR SIDE · {preset.ambient} °C</text>
                <text x="538" y="170">CONDENSER</text>
                <text className="schematic__label--dim" x="538" y="292">HEAT REJECTION</text>
                <text x="356" y="118" textAnchor="middle">COMP</text>
                <text className="schematic__label--dim" x="380" y="130" textAnchor="middle">01</text>
                <text className="schematic__label--dim" x="380" y="176" textAnchor="middle">INVERTER DRIVEN</text>
                <text x="380" y="344" textAnchor="middle">TX</text>
                <text className="schematic__label--dim" x="380" y="358" textAnchor="middle">EXPANSION</text>
                <text className="schematic__label--dim" x="230" y="110" textAnchor="middle">LP GAS</text>
                <text className="schematic__label--dim" x="500" y="110" textAnchor="middle">HP DISCHARGE</text>
                <text className="schematic__label--dim" x="520" y="342" textAnchor="middle">LIQUID LINE</text>
                <text className="schematic__label--dim" x="222" y="342" textAnchor="middle">LP MIX</text>
              </g>

              <text className="schematic__value" x="646" y="238" textAnchor="end">
                {preset.setpoint} °C
              </text>

              <text className="schematic__label schematic__label--dim" x="70" y="390">
                Temperature envelope / °C
              </text>
              <rect x="70" y="398" width="620" height="4" rx="2" fill="url(#tempGrad)" opacity=".8" />
              <g className="schematic__label schematic__label--dim">
                <text x="70" y="418">−25</text>
                <text x="210" y="418">0</text>
                <text x="365" y="418">12</text>
                <text x="530" y="418">22</text>
                <text x="678" y="418" textAnchor="end">40</text>
              </g>
            </svg>

            <div className="tech__legend">
              <span><i /> Low-pressure / liquid</span>
              <span><i className="warm" /> Heat rejection</span>
              <span><i className="dim" /> Pipework</span>
              <span>Inverter modulation</span>
            </div>
          </Reveal>

          <Reveal className="tech__controls glass" delay={140}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>Load simulator</p>
              <div className="tech__presets" role="group" aria-label="Choose a building preset">
                {technology.presets.map((item, index) => (
                  <button
                    type="button"
                    className="tech__preset"
                    key={item.id}
                    aria-pressed={index === presetIndex}
                    onClick={() => setPresetIndex(index)}
                  >
                    <span>{item.label}</span>
                    <i aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <div className="tech__gauge" aria-live="polite">
              <svg viewBox="0 0 96 96" aria-hidden="true">
                <circle className="track" cx="48" cy="48" r="42" />
                <circle
                  className="value"
                  cx="48"
                  cy="48"
                  r="42"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="tech__gauge-copy">
                <b>{preset.load}%</b>
                <span>Relative load</span>
              </div>
            </div>

            <div className="tech__stats">
              <div className="tech__stat">
                <span>Ambient</span>
                <b>{preset.ambient} °C</b>
              </div>
              <div className="tech__stat">
                <span>Setpoint</span>
                <b>{preset.setpoint} °C</b>
              </div>
              <div className="tech__stat">
                <span>Modelled saving</span>
                <b>−{preset.saving}%</b>
              </div>
              <div className="tech__stat">
                <span>Control</span>
                <b>Inverter</b>
              </div>
            </div>

            <p className="tech__note">
              <b>{preset.note}</b> Illustrative model — a sizing conversation, not a quotation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
