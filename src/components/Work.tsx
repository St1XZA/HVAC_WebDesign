import { useEffect, useRef, type CSSProperties } from 'react';
import { projects } from '../content/site';
import { ProjectPlate } from './ProjectPlate';
import { Reveal } from './Reveal';

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (isMobile) {
        track.style.transform = '';
        section.style.setProperty('--p', '0');
        return;
      }
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const travel = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${(-progress * travel).toFixed(2)}px, 0, 0)`;
      section.style.setProperty('--p', progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef} aria-labelledby="work-title">
      <div className="work__pin">
        <div className="work__stage">
          <div className="shell work__head">
            <Reveal className="work__head-copy">
              <p className="eyebrow">04 — Field records</p>
              <h2 className="work__title" id="work-title">
                Work that holds <em>under load.</em>
              </h2>
            </Reveal>
            <span className="work__count">
              Selected records · <b>{String(projects.length).padStart(2, '0')}</b>
            </span>
          </div>

          <div className="work__viewport">
            <div className="work__track" ref={trackRef}>
              {projects.map((project) => (
                <article
                  className="work__card"
                  key={project.id}
                  style={{ '--hue': project.hue } as CSSProperties}
                >
                  <div className="work__art" aria-hidden="true" />
                  <ProjectPlate id={project.id} />
                  <div className="work__card-top">
                    <span className="work__card-index">{project.index}</span>
                    <span>{project.sector}</span>
                  </div>
                  <div className="work__card-body">
                    <span className="work__card-loc">{project.location}</span>
                    <h3 className="work__card-title">{project.title}</h3>
                    <p className="work__card-outcome">{project.outcome}</p>
                    <div className="work__card-specs">
                      {project.specs.map((spec) => (
                        <span className="work__spec" key={spec.label}>
                          <span>{spec.label}</span>
                          <b>{spec.value}</b>
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="shell work__progress" aria-hidden="true">
            <span>Drag scroll / vertical</span>
            <div className="work__progress-track">
              <i />
            </div>
            <span>0 → 100</span>
          </div>
        </div>
      </div>
    </section>
  );
}
