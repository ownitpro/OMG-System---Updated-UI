import Link from 'next/link';

export default function FinePrint() {
  return (
    <section className="mt-10 text-xs text-white/60 space-y-2">
      <p>Prices shown in USD. Taxes extra. Annual plans billed upfront with a 10% discount.</p>
      <p>Trials are limited and subject to fair-use. Cancel anytime. Storage in Canada.</p>
      <p>
        For enterprise pricing, <Link href="/contact-sales" className="underline text-teal-400 hover:text-teal-400/80">contact sales</Link>.
      </p>
    </section>
  );
}

