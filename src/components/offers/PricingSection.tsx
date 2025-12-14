'use client';

import { OfferPack } from '@/config/offers';

type PricingSectionProps = {
  packs: OfferPack[];
  offerSlug: string;
};

export function PricingSection({ packs, offerSlug }: PricingSectionProps) {
  const handleSelectPack = (packId: string, packName: string) => {
    console.log('Selected pack:', { packId, packName, offer: offerSlug });
    // TODO: Wire up Stripe checkout
  };

  return (
    <section id="pricing" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Lead Packs & Pricing (USD)</h2>
      <p className="text-gray-600 mb-8 text-center">
        All packs include real leads, contact info, and ready-to-send emails.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">{pack.name}</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">{pack.leads} leads</span>
              <span className="text-2xl font-bold text-green-600">${pack.priceUsd}</span>
            </div>
            <button
              onClick={() => handleSelectPack(pack.id, pack.name)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Select Pack
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

