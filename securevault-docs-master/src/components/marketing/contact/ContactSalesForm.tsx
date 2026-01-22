// src/components/marketing/contact/ContactSalesForm.tsx
// Mock-only contact form (localStorage + toast)

"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ContactSalesForm() {
  const { isDarkMode } = useTheme();
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const key = "svd_contact_sales_submissions";
    
    try {
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({ ...data, ts: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
      
      // Show success state
      setTimeout(() => {
        setSent(true);
        setSubmitting(false);
      }, 500);
    } catch (err) {
      console.error("Failed to save submission:", err);
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className={`rounded-2xl border p-6 ${
        isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className={`h-6 w-6 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
          <div>
            <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Thanks! We'll be in touch shortly.
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              We typically respond within one business day.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const inputClasses = isDarkMode
    ? 'border-slate-600 bg-slate-700 text-white placeholder:text-slate-400'
    : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400';

  return (
    <form onSubmit={onSubmit} className={`rounded-2xl border p-6 space-y-4 ${
      isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-white'
    }`}>
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tell us about your team</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Full name</label>
          <input
            name="name"
            required
            className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputClasses}`}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1">
          <label className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Work email</label>
          <input
            type="email"
            name="email"
            required
            className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputClasses}`}
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-1">
          <label className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Company</label>
          <input
            name="company"
            required
            className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputClasses}`}
            placeholder="Your company"
          />
        </div>

        <div className="space-y-1">
          <label className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Team size</label>
          <select
            name="teamSize"
            className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputClasses}`}
          >
            <option value="1-5">1–5</option>
            <option value="6-15">6–15</option>
            <option value="16-40">16–40</option>
            <option value=">40">40+</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-1">
          <label className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>What are you hoping to solve?</label>
          <textarea
            name="goals"
            rows={4}
            className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${inputClasses}`}
            placeholder="e.g., organize client receipts, secure sharing with PIN & expiry, reduce manual data entry..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="trial"
          type="checkbox"
          name="trial_interest"
          defaultChecked
          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
        <label htmlFor="trial" className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          I'm interested in the 7‑day Starter trial
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-teal-600 px-5 py-2.5 text-white font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Get a call"}
      </button>

      <p className={`text-xs pt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
        By submitting, you agree to our{" "}
        <Link href="/terms" className={`underline ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-500'}`}>
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className={`underline ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-500'}`}>
          Privacy
        </Link>
        . During the Starter trial, usage is limited (5% of Starter monthly limits) to keep things fair while you explore.
      </p>
    </form>
  );
}

