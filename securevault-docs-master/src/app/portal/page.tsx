// app/portal/page.tsx — explainer + entry

"use client";

import * as React from "react";
import Link from "next/link";

export default function PortalIndex() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Client Portal</h2>
        <div className="bg-muted/40 rounded-2xl p-4 border border-border/40">
          <p className="text-sm">
            If your accountant or service provider sent you an invite, click it to open your portal. If you only have a
            token, paste it below.
          </p>
          <form
            action="/portal/login"
            method="get"
            className="mt-3 flex gap-2"
            onSubmit={e => {
              e.preventDefault();
              const form = e.currentTarget;
              const token = (form.querySelector('input[name="token"]') as HTMLInputElement)?.value;
              if (token) {
                window.location.href = `/portal/login?token=${encodeURIComponent(token)}`;
              } else {
                window.location.href = `/portal/login`;
              }
            }}
          >
            <input
              name="token"
              placeholder="Paste invite token"
              className="rounded-xl border px-3 py-2 w-80"
            />
            <button type="submit" className="rounded-xl px-4 py-2 bg-primary text-primary-foreground">
              Open Portal
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">What you can do here</h2>
        <div className="bg-muted/40 rounded-2xl p-4 border border-border/40">
          <ul className="list-disc ml-5 text-sm space-y-1">
            <li>Securely upload documents (PDF, images, docs)</li>
            <li>See what was requested and what you already sent</li>
            <li>Check due dates and messages from the business</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

