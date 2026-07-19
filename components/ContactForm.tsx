"use client";

import { useState } from "react";
import { submitContactEnquiry } from "@/lib/contact";
import { ArrowRight, CheckIcon } from "./icons";

type Field = {
  name: string;
  email: string;
  company: string;
  phone: string;
  sector: string;
  message: string;
};

const empty: Field = {
  name: "",
  email: "",
  company: "",
  phone: "",
  sector: "",
  message: "",
};

export default function ContactForm() {
  const [fields, setFields] = useState<Field>(empty);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const website = String(formData.get("website") ?? "");

    const result = await submitContactEnquiry({
      ...fields,
      ...(website ? { website } : {}),
    });

    setLoading(false);

    if (result.ok) {
      setSent(true);
      return;
    }

    setError(result.error);
  };

  if (sent) {
    return (
      <div className="cf-thankyou">
        <span className="cf-check">
          <CheckIcon width={28} height={28} />
        </span>
        <h3>Message received</h3>
        <p>
          Thank you, <strong>{fields.name}</strong>. Our technical team will
          review your enquiry and get back to you within 2 business days.
        </p>
        <button className="btn btn-green" onClick={() => { setSent(false); setFields(empty); }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      {error ? <p className="cf-error" role="alert">{error}</p> : null}

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-name">Full Name <span aria-hidden>*</span></label>
          <input
            id="cf-name"
            type="text"
            placeholder="Dato' Ahmad Razif"
            value={fields.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-company">Organisation</label>
          <input
            id="cf-company"
            type="text"
            placeholder="Ministry of Defence"
            value={fields.company}
            onChange={set("company")}
          />
        </div>
      </div>

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-email">Email Address <span aria-hidden>*</span></label>
          <input
            id="cf-email"
            type="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={set("email")}
            required
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-phone">Phone Number</label>
          <input
            id="cf-phone"
            type="tel"
            placeholder="+60 12 345 6789"
            value={fields.phone}
            onChange={set("phone")}
          />
        </div>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-sector">Area of Interest</label>
        <select
          id="cf-sector"
          value={fields.sector}
          onChange={set("sector")}
        >
          <option value="">, Select a sector, </option>
          <option value="Military">Military &amp; Defence</option>
          <option value="Railway">Railway &amp; Rail Infrastructure</option>
          <option value="IT">IT &amp; Electronics</option>
          <option value="General">General Enquiry</option>
        </select>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-message">Your Requirement <span aria-hidden>*</span></label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Describe your programme, timeline and any specific products or services you need…"
          value={fields.message}
          onChange={set("message")}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary cf-submit"
        disabled={loading}
      >
        {loading ? "Sending…" : (
          <>Send Enquiry <ArrowRight width={18} height={18} /></>
        )}
      </button>
    </form>
  );
}
