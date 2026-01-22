// app/sales/page.tsx

import Link from "next/link";

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Marketing Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/demo"
              className="nav-link-bubble px-4 py-2 text-sm font-medium rounded-full transition hover:text-blue-600"
            >
              Try Demo
            </Link>
            <Link
              href="/pricing"
              className="nav-link-bubble px-4 py-2 text-sm font-medium rounded-full transition hover:text-blue-600"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="nav-link-bubble px-4 py-2 text-sm font-medium rounded-full transition hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Talk to our sales team</h1>
          <p className="text-base text-gray-600">
            We'll help you pick a plan, set up a live demo, and answer any questions.
          </p>
        </header>

        <section className="grid lg:grid-cols-5 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-3">
            <form
              method="post"
              action="/api/sales/lead"
              className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="text-sm">First name</span>
                  <input
                    name="firstName"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-sm">Last name</span>
                  <input
                    name="lastName"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400"
                  />
                </label>
              </div>
              <label className="space-y-1">
                <span className="text-sm">Work email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm">Company / Firm</span>
                <input
                  name="company"
                  required
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="text-sm">Industry</span>
                  <select
                    name="industry"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400"
                  >
                    <option value="accounting">Accounting</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="contractors">Contractors</option>
                    <option value="project_management">Project Management</option>
                    <option value="personal">Personal</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-sm">Team size</span>
                  <select
                    name="teamSize"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400"
                  >
                    <option value="1">Just me</option>
                    <option value="2-10">2–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value=">200">200+</option>
                  </select>
                </label>
              </div>
              <label className="space-y-1">
                <span className="text-sm">What do you want to do?</span>
                <select
                  name="intent"
                  required
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="demo">Book a live demo</option>
                  <option value="pricing">Talk about pricing</option>
                  <option value="migration">Move from another tool</option>
                  <option value="security">Security/compliance review</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-sm">Tell us a bit more</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Example: We want client portals and OCR for receipts."
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </label>

              {/* optional upload */}
              <label className="space-y-1">
                <span className="text-sm">Attach a file (optional)</span>
                <input
                  type="file"
                  name="attachment"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                />
              </label>

              {/* legal + beta toggle */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="acceptsContact" required className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  I agree to be contacted about SecureVault Docs.
                </label>
                <label className="flex items-center gap-2 text-sm" data-beta-toggle>
                  <input type="checkbox" name="acceptsBetaTerms" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  I agree to the Beta Terms (if my account is in beta).
                </label>
              </div>

              {/* honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-2xl bg-blue-600 text-white px-5 py-2.5 font-semibold hover:opacity-90 transition"
                >
                  Get a demo
                </button>
                <Link
                  href="/pricing"
                  className="rounded-2xl border border-gray-300 bg-white px-5 py-2.5 font-semibold hover:bg-gray-50 transition text-gray-900"
                >
                  See pricing
                </Link>
              </div>

              <p className="text-xs text-gray-500">We respond within one business day.</p>
            </form>
          </div>

          {/* Right: helpful info */}
          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold mb-2 text-gray-900">What to expect</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>We'll email you to set up a time (on Zoom).</li>
                <li>We'll show the parts you care about (client portals, sharing, OCR).</li>
                <li>If you like it, we'll help you start a free trial.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold mb-2 text-gray-900">Quick links</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <Link className="underline text-blue-600 hover:text-blue-700" href="/demo?v=acct&tab=interactive">
                    Interactive demo
                  </Link>
                </li>
                <li>
                  <Link className="underline text-blue-600 hover:text-blue-700" href="/features">
                    Features
                  </Link>
                </li>
                <li>
                  <Link className="underline text-blue-600 hover:text-blue-700" href="/docs">
                    Docs
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

