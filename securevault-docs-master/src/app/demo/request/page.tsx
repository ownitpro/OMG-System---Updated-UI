'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function RequestDemoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = React.useState<'idle' | 'sent' | 'loading'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');

    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const orgId = String(fd.get('orgId') || '');
    const redirect = String(fd.get('redirect') || `/org/${orgId}/overview`);

    // TODO: send to your CRM / email; for dev we just redirect back
    // In production, you would:
    // 1. Send form data to your CRM/email service
    // 2. Create a demo session
    // 3. Then redirect

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setState('sent');
    
    // In dev, bypass and redirect immediately
    if (process.env.NODE_ENV === 'development' || process.env.DEMO_GATE === 'open') {
      window.location.href = redirect;
    } else {
      // In production, you might show a success message and redirect after a delay
      setTimeout(() => {
        window.location.href = redirect;
      }, 2000);
    }
  }

  const orgId = searchParams?.get('orgId') || '';
  const redirect = searchParams?.get('redirect') || `/org/${orgId}/overview`;

  return (
    <div className="min-h-screen bg-background">
      {/* Marketing Header */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
              SVD
            </div>
            <span className="text-lg font-semibold">SecureVault Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Get a Free Demo</h1>
          <p className="text-muted-foreground">
            Fill this quick form to access a live demo. In development, we skip verification.
          </p>
        </div>

        <form className="space-y-4 rounded-2xl border bg-card p-6" onSubmit={submit}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your name
            </label>
            <input
              id="name"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="name"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Work email
            </label>
            <input
              id="email"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="email"
              type="email"
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="company"
              placeholder="Your Company"
            />
          </div>

          <input type="hidden" name="orgId" value={orgId} readOnly />
          <input type="hidden" name="redirect" value={redirect} readOnly />

          <button
            type="submit"
            disabled={state === 'loading' || state === 'sent'}
            className="w-full rounded-xl px-4 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === 'loading'
              ? 'Processing...'
              : state === 'sent'
                ? 'Redirecting...'
                : 'Get a Free Demo'}
          </button>
        </form>

        {state === 'sent' && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            Demo access granted! Redirecting you now...
          </div>
        )}

        <div className="text-sm text-muted-foreground text-center">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </main>
    </div>
  );
}

export default function RequestDemo() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <RequestDemoContent />
    </Suspense>
  );
}

