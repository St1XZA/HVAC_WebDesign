import { contact, coverage } from '../content/site';
import { areaHref, landingAreas } from '../content/landing';
import { ArrowUpRight } from './Icons';
import { Reveal } from './Reveal';

const nodes = [
  { label: 'Randburg · HQ', x: '57%', y: '36%', hub: true },
  { label: 'Pretoria', x: '64%', y: '22%' },
  { label: 'Johannesburg', x: '50%', y: '44%' },
  { label: 'Durban', x: '73%', y: '66%' },
  { label: 'Cape Town', x: '28%', y: '78%' },
  { label: 'Gqeberha', x: '55%', y: '84%' },
];

const areaByAlias = new Map<string, string>();
for (const area of landingAreas) {
  areaByAlias.set(area.name.toLowerCase(), area.slug);
}
areaByAlias.set('johannesburg cbd', 'johannesburg');

export function Coverage() {
  return (
    <section className="section section--divided coverage" id="coverage" aria-labelledby="coverage-title">
      <div className="shell">
        <div className="coverage__grid">
          <div className="coverage__copy">
            <Reveal>
              <p className="eyebrow">09 — Coverage</p>
              <h2 className="section__title" id="coverage-title" style={{ marginTop: '1rem' }}>
                Gauteng base. <em>National reach.</em>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p>
                Based in Randburg, with certified technicians covering the Gauteng metros and
                project teams mobilising to Cape Town, Durban and Gqeberha. Emergency callouts run
                24 hours a day.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="coverage__chips">
                {coverage.map((area) => {
                  const slug = areaByAlias.get(area.toLowerCase());
                  return slug ? (
                    <a className="chip chip--link" key={area} href={areaHref(slug)}>
                      {area}
                      <ArrowUpRight size={10} />
                    </a>
                  ) : (
                    <span className="chip" key={area}>
                      {area}
                    </span>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <a className="tlink" href={contact.phoneHref}>
                Not on the list? Call {contact.phone}
              </a>
            </Reveal>
          </div>

          <Reveal className="coverage__field" delay={160} scale>
            <div className="coverage__dots" aria-hidden="true" />
            {nodes.map((node) => (
              <span
                key={node.label}
                className={`coverage__node ${node.hub ? 'coverage__node--hub' : ''}`.trim()}
                style={{ left: node.x, top: node.y }}
              >
                {node.label}
              </span>
            ))}
            <div className="coverage__legend">
              <span>26.09° S / 28.00° E</span>
              <span>Service field · live</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
