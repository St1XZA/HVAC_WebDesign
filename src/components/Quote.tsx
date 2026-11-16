import { useState, type FormEvent } from 'react';
import { contact, services } from '../content/site';
import { ArrowRight, ArrowUpRight, Chat, Phone } from './Icons';
import { Reveal } from './Reveal';

type FormState = {
  service: string;
  property: string;
  urgency: string;
  suburb: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const EMPTY: FormState = {
  service: '',
  property: '',
  urgency: '',
  suburb: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
};

const serviceOptions = [...services.map((service) => service.title), 'Not sure yet — advise me'];
const propertyOptions = ['Home', 'Office', 'Retail', 'Restaurant / kitchen', 'Warehouse', 'Cold room'];
const urgencyOptions = ['Emergency — today', 'This week', 'Planned project', 'Maintenance contract'];
const steps = ['Scope', 'Site', 'Contact'];

export function Quote({ kicker = '11 — Start here' }: { kicker?: string } = {}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const validate = (): string => {
    if (step === 0 && !form.service) {
      return 'Choose the discipline you need so we can route it to the right engineer.';
    }
    if (step === 1) {
      if (!form.property) return 'Select the property type.';
      if (form.suburb.trim().length < 2) return 'Add your suburb or city so we can confirm coverage.';
      if (!form.urgency) return 'Let us know how urgent this is.';
    }
    if (step === 2) {
      if (form.name.trim().length < 2) return 'Add your name so we know who to ask for.';
      const digits = form.phone.replace(/[^\d+]/g, '');
      if (!/^(?:\+27|0)\d{9}$/.test(digits)) {
        return 'Add a valid South African number, e.g. 078 963 5441.';
      }
      if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) {
        return 'That email address does not look right.';
      }
    }
    return '';
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }
    setSent(true);
  };

  const messageBody = [
    "Hi Totally Cool, I'd like a quote.",
    `Service: ${form.service}`,
    `Property: ${form.property}`,
    `Area: ${form.suburb}`,
    `Urgency: ${form.urgency}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.email ? `Email: ${form.email}` : '',
    form.notes ? `Notes: ${form.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const waHref = `https://wa.me/27789635441?text=${encodeURIComponent(messageBody)}`;
  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Quote request — ${form.service || 'HVAC'}`,
  )}&body=${encodeURIComponent(messageBody)}`;

  const reset = () => {
    setForm(EMPTY);
    setStep(0);
    setSent(false);
    setError('');
  };

  return (
    <section className="quote" id="quote" aria-labelledby="quote-title">
      <div className="quote__aura" aria-hidden="true" />
      <div className="shell">
        <Reveal className="quote__card glass" scale>
          <div className="quote__head">
            <p className="eyebrow">{kicker}</p>
            <h2 className="quote__title" id="quote-title">
              Tell us what <em>needs cooling.</em>
            </h2>
            <p className="quote__lede">
              Three short steps. We'll stage a message you can send straight to the team — no call
              centre, no lead broker, no waiting for a callback that never comes.
            </p>
          </div>

          <div className="quote__body">
            <div className="wizard">
              <div className="wizard__steps" aria-hidden="true">
                {steps.map((label, index) => (
                  <div
                    className="wizard__step"
                    key={label}
                    data-state={index < step ? 'done' : index === step ? 'active' : 'idle'}
                  >
                    <b>0{index + 1}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {sent ? (
                <div className="sent" role="status">
                  <span className="sent__badge">Request staged</span>
                  <h3 className="sent__title">One tap to send.</h3>
                  <p className="sent__body">
                    Your answers are packed into a WhatsApp message. Nothing leaves this page until you
                    send it — and an engineer, not a bot, picks it up. Typical reply is under 30 minutes
                    during business hours.
                  </p>
                  <div className="sent__summary">
                    <div className="sent__row">
                      <span>Service</span>
                      <b>{form.service}</b>
                    </div>
                    <div className="sent__row">
                      <span>Site</span>
                      <b>{form.property} · {form.suburb}</b>
                    </div>
                    <div className="sent__row">
                      <span>Urgency</span>
                      <b>{form.urgency}</b>
                    </div>
                    <div className="sent__row">
                      <span>Contact</span>
                      <b>{form.name} · {form.phone}</b>
                    </div>
                  </div>
                  <div className="sent__actions">
                    <a className="btn" href={waHref} target="_blank" rel="noreferrer noopener">
                      <span>
                        <Chat size={14} /> Open WhatsApp
                      </span>
                    </a>
                    <a className="btn btn--ghost" href={contact.phoneHref}>
                      <span>
                        <Phone size={14} /> Call {contact.phone}
                      </span>
                    </a>
                    <button type="button" className="btn btn--ghost" onClick={reset}>
                      <span>Start again</span>
                    </button>
                  </div>
                  <p className="quote__aside-note">
                    Prefer email?{' '}
                    <a className="tlink" href={mailHref}>
                      Send the same details to {contact.email}
                    </a>
                  </p>
                </div>
              ) : (
                <form className="wizard" onSubmit={submit} noValidate>
                  <div className="wizard__panel" key={step}>
                    {step === 0 && (
                      <>
                        <p className="wizard__legend">What needs cooling?</p>
                        <div className="wizard__choices">
                          {serviceOptions.map((option) => (
                            <button
                              type="button"
                              key={option}
                              className="choice"
                              aria-pressed={form.service === option}
                              onClick={() => update('service', option)}
                            >
                              <span>{option}</span>
                              <span className="choice__tick" aria-hidden="true" />
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <p className="wizard__legend">Where is it, and how urgent?</p>
                        <div className="wizard__choices" style={{ marginBottom: '0.9rem' }}>
                          {propertyOptions.map((option) => (
                            <button
                              type="button"
                              key={option}
                              className="choice"
                              aria-pressed={form.property === option}
                              onClick={() => update('property', option)}
                            >
                              <span>{option}</span>
                              <span className="choice__tick" aria-hidden="true" />
                            </button>
                          ))}
                        </div>
                        <div className="wizard__fields">
                          <div className="field">
                            <label className="field__label" htmlFor="suburb">
                              Suburb / city
                            </label>
                            <input
                              id="suburb"
                              className="field__input"
                              value={form.suburb}
                              onChange={(event) => update('suburb', event.target.value)}
                              placeholder="e.g. Sandton, Johannesburg"
                              autoComplete="address-level2"
                              aria-invalid={Boolean(error) && form.suburb.trim().length < 2}
                            />
                          </div>
                          <div className="field">
                            <label className="field__label" htmlFor="urgency">
                              Urgency
                            </label>
                            <select
                              id="urgency"
                              className="field__input"
                              value={form.urgency}
                              onChange={(event) => update('urgency', event.target.value)}
                            >
                              <option value="">Select urgency</option>
                              {urgencyOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <p className="wizard__legend">Who should we call?</p>
                        <div className="wizard__fields">
                          <div className="field">
                            <label className="field__label" htmlFor="name">
                              Name
                            </label>
                            <input
                              id="name"
                              className="field__input"
                              value={form.name}
                              onChange={(event) => update('name', event.target.value)}
                              placeholder="Your name"
                              autoComplete="name"
                            />
                          </div>
                          <div className="field">
                            <label className="field__label" htmlFor="phone">
                              Phone
                            </label>
                            <input
                              id="phone"
                              className="field__input"
                              type="tel"
                              inputMode="tel"
                              value={form.phone}
                              onChange={(event) => update('phone', event.target.value)}
                              placeholder="078 963 5441"
                              autoComplete="tel"
                            />
                          </div>
                          <div className="field field--wide">
                            <label className="field__label" htmlFor="email">
                              Email <span style={{ textTransform: 'none' }}>(optional)</span>
                            </label>
                            <input
                              id="email"
                              className="field__input"
                              type="email"
                              value={form.email}
                              onChange={(event) => update('email', event.target.value)}
                              placeholder="you@company.co.za"
                              autoComplete="email"
                            />
                          </div>
                          <div className="field field--wide">
                            <label className="field__label" htmlFor="notes">
                              Anything else? <span style={{ textTransform: 'none' }}>(optional)</span>
                            </label>
                            <textarea
                              id="notes"
                              className="field__input"
                              value={form.notes}
                              onChange={(event) => update('notes', event.target.value)}
                              placeholder="Unit count, symptoms, access notes, deadline…"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {error && (
                      <p className="wizard__error" role="alert">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="wizard__nav">
                    <span className="wizard__hint">
                      {step === 2
                        ? 'Your details become a WhatsApp message you choose to send.'
                        : 'No obligation. No lead brokers. Fixed pricing before work starts.'}
                    </span>
                    <div className="wizard__actions">
                      {step > 0 && (
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => {
                            setError('');
                            setStep((current) => current - 1);
                          }}
                        >
                          <span>Back</span>
                        </button>
                      )}
                      <button type="submit" className="btn btn--sm">
                        <span>
                          {step === 2 ? 'Prepare my request' : 'Continue'}
                          {step === 2 ? <ArrowUpRight size={13} /> : <ArrowRight size={13} />}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <aside className="quote__aside">
              <div className="quote__aside-card">
                <span>Emergency · 24/7</span>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
              <div className="quote__aside-card">
                <span>WhatsApp</span>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                  Message the team
                </a>
              </div>
              <div className="quote__aside-card">
                <span>Email</span>
                <a href={contact.emailHref}>{contact.email}</a>
              </div>
              <div className="quote__aside-card">
                <span>Base</span>
                <b>{contact.base}</b>
              </div>
              <p className="quote__aside-note">
                Response within 30 minutes during business hours. After-hours emergencies are answered
                around the clock — cold rooms first.
              </p>
              <p className="quote__aside-note">
                This form has no server. Your answers stay in your browser until you send them.
              </p>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
