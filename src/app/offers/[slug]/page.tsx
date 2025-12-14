import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { OFFERS } from '@/config/offers';
import { PricingSection } from '@/components/offers/PricingSection';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = OFFERS[slug];

  if (!offer) {
    return {
      title: 'Offer Not Found',
    };
  }

  return {
    title: `${offer.hero.title} | OMG Leads`,
    description: offer.hero.subtitle,
  };
}

export default async function OfferLandingPage({ params }: Props) {
  const { slug } = await params;
  const offer = OFFERS[slug];

  if (!offer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            OMG Leads
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/offers" className="text-gray-600 hover:text-gray-900">
              Browse Leads
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {offer.hero.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {offer.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {offer.hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {offer.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Who This Is For */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who This Is For</h2>
          <ul className="space-y-4">
            {offer.whoThisIsFor.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <span className="text-gray-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What You Get */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What You Get</h2>
          <ul className="space-y-4">
            {offer.whatYouGet.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <ol className="space-y-6">
            {offer.howItWorks.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <p className="text-gray-700 text-lg">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Lead Packs & Pricing */}
        <PricingSection packs={offer.packs} offerSlug={offer.slug} />

        {/* Why This Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why This Works</h2>
          <ul className="space-y-4">
            {offer.whyThisOffer.map((item, index) => (
              <li key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                <span className="text-gray-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <div className="space-y-4">
            {offer.faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors"
              >
                <summary className="font-semibold text-gray-900 text-lg list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-blue-600 text-2xl">+</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{offer.finalCta.text}</h2>
          <a
            href="#pricing"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors mt-6"
          >
            {offer.finalCta.buttonLabel}
          </a>
        </div>
      </section>
    </div>
  );
}

