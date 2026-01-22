// src/app/mock/stripe/checkout/page.tsx

export default function MockStripeCheckoutPage() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4 space-y-4">
      <h1 className="text-2xl font-semibold">Mock Stripe Checkout</h1>
      <p className="text-sm opacity-80">
        In development, we don&apos;t call Stripe yet. This page just confirms
        that the pricing buttons are wired correctly.
      </p>
      <p className="text-sm">
        When you&apos;re ready, you can replace the stub in{" "}
        <code className="px-1 py-0.5 rounded bg-muted text-xs">
          /api/billing/checkout
        </code>{" "}
        with real Stripe Checkout code.
      </p>
    </div>
  );
}

