import { contact, testimonials } from '../content/site';
import { StarRow } from './Icons';
import { Reveal } from './Reveal';
import { Tilt } from './Tilt';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

export function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">08 — Field voices</p>
            <h2 className="section__title" id="reviews-title" style={{ marginTop: '1rem' }}>
              Don't take <em>our word</em> for it.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section__aside">
              A 4.9★ average across verified Google reviews. The pattern in them is consistent:
              someone answered, someone arrived, and the problem stayed fixed.
            </p>
          </Reveal>
        </div>

        <div className="reviews__grid">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <Tilt className="review glass">
                <StarRow />
                <p className="review__text">“{item.quote}”</p>
                <div className="review__meta">
                  <span className="review__avatar" aria-hidden="true">
                    {initials(item.name)}
                  </span>
                  <span className="review__who">
                    <b>{item.name}</b>
                    <span>{item.role}</span>
                  </span>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="reviews__foot">
          <span>Source — verified Google reviews</span>
          <a className="tlink" href={contact.google} target="_blank" rel="noreferrer noopener">
            Read them on Google
          </a>
        </div>
      </div>
    </section>
  );
}
