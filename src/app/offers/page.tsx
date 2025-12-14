import Link from 'next/link';
import { Metadata } from 'next';
import { OFFERS } from '@/config/offers';

export const metadata: Metadata = {
  title: 'Lead Packs - Find Customers in Your Industry | OMG Leads',
  description: 'Choose the perfect lead pack for your business. Real estate, accounting, and more. Get real customers who are looking for you.',
};

export default function OffersPage() {
  const offers = Object.values(OFFERS);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Customers in Your Industry
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the lead pack that fits your business. Each pack includes real people who are looking for your services right now.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/offers/${offer.slug}`}
              className="block bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {offer.hero.title}
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-2">
                {offer.hero.subtitle}
              </p>

              {/* Packs Preview */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Available Packs
                </p>
                <div className="space-y-3">
                  {offer.packs.map((pack) => (
                    <div
                      key={pack.id}
                      className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                    >
                      <span className="font-semibold text-gray-900">
                        {pack.name}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{pack.leads} leads</span>
                        <span className="font-bold text-green-600">
                          ${pack.priceUsd}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

