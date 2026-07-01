const { useState: useStateC } = React;

// All submissions are sent to treasury@cede.to via the user's mail client.
const CONTACT_EMAIL = "treasury@cede.to";

const INQUIRY_TYPES = [
{ v: "Institutional / Mint & Redeem", l: "Institution" },
{ v: "Developer / Integration", l: "Developer" },
{ v: "Partnership", l: "Partnership" },
{ v: "Press / Media", l: "Press" },
{ v: "General", l: "General" }];


function ContactHero() {
  return (
    <section className="hero" style={{ paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-pill">
            <span className="live-dot" aria-hidden />
            We reply within one business day
          </div>
          <h1 className="display display-xl" style={{ marginTop: 20 }}>
            Get in <em>touch.</em>
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>Whether you're an institution looking to mint, a developer integrating GHST, or a partner exploring how digital Cedis fit your business, we'd love to hear from you.

          </p>
        </div>
      </div>
    </section>);

}

function ContactForm() {
  const [form, setForm] = useStateC({
    name: "", email: "", company: "",
    inquiry: INQUIRY_TYPES[0].v,
    message: ""
  });
  const [sent, setSent] = useStateC(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `[${form.inquiry}] — ${form.name || "GHST enquiry"}`;
    const body =
    `Name:    ${form.name}
Email:   ${form.email}
Company: ${form.company || "—"}
Topic:   ${form.inquiry}

${form.message}
`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  };

  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <section className="section section-tight" id="form">
      <div className="container">
        <div className="contact-grid">
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <Field label="Full name" required>
                <input
                  type="text" required
                  value={form.name} onChange={onChange('name')}
                  placeholder="Ama Mensah" />
                
              </Field>
              <Field label="Work email" required>
                <input
                  type="email" required
                  value={form.email} onChange={onChange('email')}
                  placeholder="ama@company.com" />
                
              </Field>
            </div>

            <Field label="Company / organisation">
              <input
                type="text"
                value={form.company} onChange={onChange('company')}
                placeholder="(optional)" />
              
            </Field>

            <Field label="What's this about?" required>
              <div className="segmented">
                {INQUIRY_TYPES.map((t) =>
                <button
                  key={t.v} type="button"
                  className={form.inquiry === t.v ? 'active' : ''}
                  onClick={() => setForm({ ...form, inquiry: t.v })}>
                  {t.l}</button>
                )}
              </div>
            </Field>

            <Field label="How can we help?" required>
              <textarea
                rows="6" required
                value={form.message} onChange={onChange('message')}
                placeholder="Tell us a bit about what you're working on — volume, timeline, integration questions, anything that helps us route you to the right person." />
              
            </Field>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={!valid}>
                Send message <ArrowRight />
              </button>
              <span className="form-hint">
                {sent ? "" : "Submitting opens your email client with the message pre-filled."}
              </span>
            </div>
          </form>

          <ContactAside />
        </div>
      </div>
    </section>);

}

function Field({ label, required, children }) {
  return (
    <label className="form-field">
      <span className="form-label">
        {label}{required && <span className="req" aria-hidden> *</span>}
      </span>
      {children}
    </label>);

}

function ContactAside() {
  const items = [
  {
    heading: "Direct email",
    lines: [<a href={`mailto:${CONTACT_EMAIL}`} key="e">{CONTACT_EMAIL}</a>]
  },
  {
    heading: "Institutions",
    lines: [
    "Mint, redeem, and integrate via WeWire,",
    "the appointed primary broker for GHST.",
    <a key="w" href="https://www.wewire.com" target="_blank" rel="noreferrer">wewire.com →</a>]

  },
  {
    heading: "Headquarters",
    lines: ["Cede Stable Ltd", "Accra, Ghana"]
  }];

  return (
    <aside className="contact-aside">
      {items.map((it, i) =>
      <div className="contact-aside-block" key={i}>
          <div className="contact-aside-heading">{it.heading}</div>
          {it.lines.map((l, j) =>
        <div className="contact-aside-line" key={j}>{l}</div>
        )}
        </div>
      )}
    </aside>);

}

Object.assign(window, { ContactHero, ContactForm });