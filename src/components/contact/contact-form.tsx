"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

const CONTACT_EMAIL = "treasury@cede.to";

const INQUIRY_TYPES = [
  { v: "Institutional / Mint & Redeem", l: "Institution" },
  { v: "Developer / Integration", l: "Developer" },
  { v: "Partnership", l: "Partnership" },
  { v: "Press / Media", l: "Press" },
  { v: "General", l: "General" },
] as const;

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  inquiry: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    inquiry: INQUIRY_TYPES[0].v,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const onChange =
    (k: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("submit failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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
                  type="text"
                  required
                  value={form.name}
                  onChange={onChange("name")}
                  placeholder="Ama Mensah"
                />
              </Field>
              <Field label="Work email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="ama@company.com"
                />
              </Field>
            </div>

            <Field label="Company / organisation">
              <input
                type="text"
                value={form.company}
                onChange={onChange("company")}
                placeholder="(optional)"
              />
            </Field>

            <Field label="What's this about?" required>
              <div className="segmented">
                {INQUIRY_TYPES.map((t) => (
                  <button
                    key={t.v}
                    type="button"
                    className={form.inquiry === t.v ? "active" : ""}
                    onClick={() => setForm({ ...form, inquiry: t.v })}
                  >
                    {t.l}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="How can we help?" required>
              <textarea
                rows={6}
                required
                value={form.message}
                onChange={onChange("message")}
                placeholder="Tell us a bit about what you're working on — volume, timeline, integration questions, anything that helps us route you to the right person."
              />
            </Field>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!valid || status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"} <ArrowRight />
              </button>
              <span className="form-hint">
                {status === "sent"
                  ? "Message sent — we'll reply within one business day."
                  : status === "error"
                    ? "Something went wrong. Please try again or email us directly."
                    : ""}
              </span>
            </div>
          </form>

          <ContactAside />
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

function Field({ label, required, children }: FieldProps) {
  return (
    <label className="form-field">
      <span className="form-label">
        {label}
        {required && (
          <span className="req" aria-hidden>
            {" "}
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function ContactAside() {
  const items: { heading: string; lines: ReactNode[] }[] = [
    {
      heading: "Direct email",
      lines: [
        <a href={`mailto:${CONTACT_EMAIL}`} key="e">
          {CONTACT_EMAIL}
        </a>,
      ],
    },
    {
      heading: "Institutions",
      lines: [
        "Mint, redeem, and integrate via WeWire,",
        "the appointed primary broker for GHST.",
        <a key="w" href="https://www.wewire.com" target="_blank" rel="noreferrer">
          wewire.com →
        </a>,
      ],
    },
    {
      heading: "Headquarters",
      lines: ["Cede Stable Ltd", "Accra, Ghana"],
    },
  ];

  return (
    <aside className="contact-aside">
      {items.map((it, i) => (
        <div className="contact-aside-block" key={i}>
          <div className="contact-aside-heading">{it.heading}</div>
          {it.lines.map((l, j) => (
            <div className="contact-aside-line" key={j}>
              {l}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
