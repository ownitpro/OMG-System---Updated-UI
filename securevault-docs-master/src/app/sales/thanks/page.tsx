// app/sales/thanks/page.tsx

import Link from "next/link";

export default function SalesThanks() {
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

      <main className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Thanks! We'll be in touch.</h1>
        <p className="text-gray-600">We're reviewing your note now. You'll get an email shortly.</p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/demo?v=acct&tab=interactive"
            className="rounded-2xl border border-gray-300 bg-white px-4 py-2 font-semibold hover:bg-gray-50 transition text-gray-900"
          >
            Try the demo
          </Link>
          <Link
            href="/"
            className="rounded-2xl bg-blue-600 text-white px-4 py-2 font-semibold hover:opacity-90 transition"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

