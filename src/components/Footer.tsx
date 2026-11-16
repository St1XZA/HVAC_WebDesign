import { contact, nav, services } from '../content/site';
import { serviceHref } from '../content/landing';
import { scrollToId } from '../lib/scroll';
import { ColdFieldCanvas } from './ColdFieldCanvas';
import { Chat, Logo, Phone } from './Icons';

type FooterProps = { onHome?: boolean };

export function Footer({ onHome = true }: FooterProps) {
  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!onHome) return;
    event.preventDefault();
    scrollToId(hash);
  };

  return (
    <footer className="footer">
      <ColdFieldCanvas className="footer__field" />
      <div className="footer__field-veil" aria-hidden="true" />

      <div className="shell">
        <div className="footer__grid">
          <div className="footer__brand">
            <a
              href={onHome ? '#top' : '/'}
              className="brand"
              aria-label="Totally Cool — back to top"
              onClick={(event) => {
                if (!onHome) return;
                event.preventDefault();
                scrollToId('#top');
              }}
            >
              <Logo className="brand__mark" />
              <span className="brand__type">
                <span className="brand__name">Totally Cool</span>
                <span className="brand__sub">Air conditioning &amp; refrigeration</span>
              </span>
            </a>
            <p>
              South Africa's HVAC and refrigeration specialists since 1994. Licensed, certified, and
              committed to total comfort.
            </p>
            <span className="mono">SAQCC · PIRB · Fully insured</span>
          </div>

          <div>
            <h3 className="footer__heading">Services</h3>
            <ul className="footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={serviceHref(service.id)}>{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Company</h3>
            <ul className="footer__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={sectionHref(item.href)} onClick={(event) => jump(event, item.href)}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={sectionHref('#faq')} onClick={(event) => jump(event, '#faq')}>
                  FAQ
                </a>
              </li>
              <li>
                <a href={sectionHref('#coverage')} onClick={(event) => jump(event, '#coverage')}>
                  Areas served
                </a>
              </li>
              <li>
                <a
                  href="https://totallycool.co.za/privacy-policy"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__list">
              <li>
                <a href={contact.phoneHref}>
                  <Phone size={12} /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                  <Chat size={12} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={contact.emailHref}>{contact.email}</a>
              </li>
              <li>{contact.base}, South Africa</li>
              <li className="mono" style={{ marginTop: '0.4rem' }}>
                {contact.hours}
              </li>
            </ul>
            <div className="footer__list" style={{ marginTop: '1rem', display: 'flex', gap: '0.9rem' }}>
              <a href={contact.facebook} target="_blank" rel="noreferrer noopener">
                Facebook
              </a>
              <a href={contact.instagram} target="_blank" rel="noreferrer noopener">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          TOTALLY COOL
        </div>

        <div className="footer__legal">
          <span>© {new Date().getFullYear()} Totally Cool Air Conditioning &amp; Refrigeration</span>
          <span>Randburg · Gauteng · South Africa</span>
          <span>Engineered for the cold chain</span>
        </div>
      </div>
    </footer>
  );
}
