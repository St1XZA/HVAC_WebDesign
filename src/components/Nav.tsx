import { useEffect, useRef, useState } from 'react';
import { contact, nav } from '../content/site';
import { scrollToId, setScrollLocked } from '../lib/scroll';
import { ArrowUpRight, Chat, Logo, Phone } from './Icons';

type NavProps = { onHome?: boolean };

export function Nav({ onHome = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
    };
  }, [open]);

  const go = (hash: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(hash), 60);
  };

  const linkHref = (hash: string) => (onHome ? hash : `/${hash}`);

  const handleSection = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!onHome) {
      setOpen(false);
      return;
    }
    event.preventDefault();
    go(hash);
  };

  return (
    <>
      <div className="nav__progress" ref={progressRef} aria-hidden="true" />
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav__inner shell">
          <a
            href={onHome ? '#top' : '/'}
            className="brand"
            aria-label="Totally Cool — back to top"
            onClick={(event) => {
              setOpen(false);
              if (!onHome) return;
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Logo className="brand__mark" />
            <span className="brand__type">
              <span className="brand__name">Totally Cool</span>
              <span className="brand__sub">HVAC · Refrigeration · ZA</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                className="nav__link"
                href={linkHref(item.href)}
                onClick={(event) => handleSection(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__phone" href={contact.phoneHref}>
              <Phone size={12} />
              {contact.phone}
            </a>
            <a
              className="btn btn--sm"
              href="#quote"
              onClick={(event) => {
                event.preventDefault();
                go('#quote');
              }}
            >
              <span>
                Get a quote <ArrowUpRight size={13} />
              </span>
            </a>
            <button
              type="button"
              ref={toggleRef}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="menu-toggle__lines">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="menu" id="mobile-menu" data-open={open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="menu__list">
            {nav.map((item, index) => (
              <li key={item.href}>
                <a
                  className="menu__link"
                  href={linkHref(item.href)}
                  onClick={(event) => handleSection(event, item.href)}
                >
                  <span className="menu__index">0{index + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="menu__link"
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="menu__index">06</span>
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>
        <div className="menu__foot">
          <a href={contact.phoneHref} className="tlink">
            <Phone size={13} /> {contact.phone}
          </a>
          <a href={contact.emailHref} className="tlink">
            <Chat size={13} /> {contact.email}
          </a>
          <span className="mono">{contact.base} · {contact.hours}</span>
        </div>
      </div>
    </>
  );
}
