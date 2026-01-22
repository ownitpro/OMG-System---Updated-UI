'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function PricingFAQ() {
  const [expandedAll, setExpandedAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    { q: 'Can I switch plans later?', a: 'Yes. You can upgrade or downgrade anytime. Changes apply to the next billing cycle.' },
    { q: 'Do you offer a free trial?', a: 'First-time users get a 7-day limited trial to try uploads and basic OCR.' },
    { q: 'What does "Save 10%" mean?', a: 'Annual billing is paid upfront and is 10% cheaper than paying monthly for a year.' },
    { q: 'What happens at 100% usage?', a: 'Uploads pause. Clean up older files or upgrade your plan to continue.' },
    { q: 'How do seats work on Business plans?', a: 'Each seat is a team member with access. You can add one extra seat per tier before upgrading.' },
    { q: 'Where are my files stored?', a: 'In Canada. We use encryption and follow privacy-by-design practices.' },
    { q: 'Can I delete my data?', a: 'Yes. You can delete files at any time. Deleted items are removed from our storage.' },
    { q: 'Do you give refunds?', a: 'We do not offer mid-cycle refunds. You can cancel anytime; your plan runs until the end of the paid term.' },
    { q: 'Is support included?', a: 'Yes. All plans include support. Higher tiers include faster response times.' },
  ];

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(it => it.q.toLowerCase().includes(term) || it.a.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <section className="mt-16" aria-labelledby="faq-heading">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h2 id="faq-heading" className="text-2xl font-extrabold">Pricing FAQ</h2>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus-visible:outline outline-2 outline-teal-400"
            aria-label="Search FAQ"
          />
          <button
            onClick={() => setExpandedAll(!expandedAll)}
            className="text-sm text-teal-400 hover:underline focus-visible:outline outline-2 outline-teal-400 rounded px-2 py-1 whitespace-nowrap"
          >
            {expandedAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-white/60 text-center py-8">
          No matching questions. Try a different search term or{' '}
          <Link href="/contact-sales" className="underline text-teal-400">contact sales</Link>.
        </p>
      ) : (
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {filteredItems.map((it, i) => (
            <details key={i} open={expandedAll || searchTerm.trim() !== ''} className="p-4 group">
              <summary className="cursor-pointer list-none font-semibold focus-visible:outline outline-2 outline-teal-400 rounded-lg inline-flex items-center justify-between w-full text-white">
                <span>{it.q}</span>
                <span aria-hidden className="ml-3 text-white/60 group-open:rotate-45 transition-transform">＋</span>
              </summary>
              <p className="mt-3 text-white/80">{it.a}</p>
            </details>
          ))}
        </div>
      )}

      <p className="text-sm text-white/60 mt-4 text-center">
        Still have questions?{' '}
        <Link href="/sales" className="underline text-teal-400 hover:text-teal-400/80">
          Contact our sales team
        </Link>
      </p>
    </section>
  );
}

