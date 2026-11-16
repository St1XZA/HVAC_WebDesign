import { clients } from '../content/site';

export function Clients() {
  const group = (ariaHidden: boolean) => (
    <div className="marquee__group" aria-hidden={ariaHidden || undefined}>
      {clients.map((client) => (
        <span className="marquee__item" key={client}>
          {client}
        </span>
      ))}
    </div>
  );

  return (
    <section className="clients" aria-label="Selected clients">
      <div className="marquee" style={{ '--marquee-dur': '48s' } as React.CSSProperties}>
        <div className="marquee__track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}
