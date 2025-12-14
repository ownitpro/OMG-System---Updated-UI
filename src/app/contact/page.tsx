"use client";

// app/contact/page.tsx
import * as React from "react";
import { contact } from "@/content/contact";

export default function ContactPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(contact.analytics.view));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{contact.hero.title}</h1>
          <p className="mt-4 text-blue-100 text-xl leading-relaxed max-w-3xl mx-auto">{contact.hero.subtitle}</p>
          {contact.hero.badges?.length ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {contact.hero.badges.map((b) => (
                <span key={b} className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm border border-white/30">
                  {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* TWO-COLUMN: reasons + form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid gap-12 lg:grid-cols-2">
          {/* Left: reasons + offices + FAQ */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{contact.reasons.title}</h2>
              <ul className="space-y-3">
                {contact.reasons.bullets.map((b) => (
                  <li key={b} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Office</h3>
              <div className="space-y-4">
                {contact.offices.map((o) => (
                  <div key={o.label} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{o.label}</div>
                      <div className="text-gray-600">
                        {o.address}, {o.city}, {o.province}, {o.country} {o.postal}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">{o.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {contact.faq.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="cursor-pointer font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{f.q}</span>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contact.schema.organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contact.schema.breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contact.schema.faq) }} />
    </main>
  );
}

/* ========== Client component for the form ========== */
function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      window.dispatchEvent(new CustomEvent(contact.analytics.submit));
      setStatus("submitting");

      // POST to your server action / route handler (see below)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        window.dispatchEvent(new CustomEvent(contact.analytics.success));
        form.reset();
        return;
      }
      throw new Error("Request failed");
    } catch {
      setStatus("error");
      window.dispatchEvent(new CustomEvent(contact.analytics.error));
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{contact.form.title}</h2>
      <p className="text-gray-600 mb-6">{contact.form.subtitle}</p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="block">
            <label htmlFor="contact-name" className="text-sm font-semibold text-gray-700">Full name *</label>
            <input 
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required 
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
            />
          </div>
          <div className="block">
            <label htmlFor="contact-email" className="text-sm font-semibold text-gray-700">Work email *</label>
            <input 
              id="contact-email"
              type="email" 
              name="email"
              autoComplete="email"
              required 
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="block">
            <label htmlFor="contact-company" className="text-sm font-semibold text-gray-700">Company</label>
            <input 
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
            />
          </div>
          <div className="block">
            <label htmlFor="contact-phone" className="text-sm font-semibold text-gray-700">Phone (optional)</label>
            <input 
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="+1 (___) ___-____" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="block">
            <label htmlFor="contact-industry" className="text-sm font-semibold text-gray-700">Industry *</label>
            <select 
              id="contact-industry"
              name="industry"
              autoComplete="organization-title"
              required 
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select</option>
              {contact.form.fields.industries.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="block">
            <label htmlFor="contact-budget" className="text-sm font-semibold text-gray-700">Monthly budget *</label>
            <select 
              id="contact-budget"
              name="budget"
              required 
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select</option>
              {contact.form.fields.budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="block">
            <label htmlFor="contact-timeline" className="text-sm font-semibold text-gray-700">Timeline *</label>
            <select 
              id="contact-timeline"
              name="timeline"
              required 
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select</option>
              {contact.form.fields.timelines.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="block">
          <label htmlFor="contact-message" className="text-sm font-semibold text-gray-700">What problem should we solve first? *</label>
          <textarea 
            id="contact-message"
            name="message"
            autoComplete="off"
            required 
            rows={5} 
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
            placeholder="e.g., We need consistent leads; proposals and document collection take too long..." 
          />
        </div>

        <div className="flex items-start gap-3">
          <input 
            id="contact-casl"
            type="checkbox" 
            name="casl"
            required 
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
          />
          <label htmlFor="contact-casl" className="text-sm text-gray-600">
            {contact.form.caslNote}
          </label>
        </div>

        <p className="text-xs text-gray-500">{contact.form.privacyNote}</p>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
          >
            {status === "submitting" ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : contact.form.submitLabel}
          </button>
          {status === "success" ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-700 font-medium">
                  {contact.form.successTitle} — {contact.form.successBody}
                </span>
              </div>
            </div>
          ) : null}
          {status === "error" ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-700 font-medium">
                  {contact.form.errorTitle}: {contact.form.errorBody}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
