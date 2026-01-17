"use client";

export default function Deliverables() {
  const deliverables = [
    "A complete targeting & messaging blueprint",
    "3–5 high-converting video ad creatives",
    "Fully built and launched Meta lead campaigns",
    "LeadFlow Engine: ad → capture → CRM integration",
    "Automated nurture email/SMS sequences",
    "Retargeting funnels & control flows",
    "Live dashboard & ROI tracking",
    "Ongoing campaign optimisation & scaling strategies",
    "Optional: branding help, visual assets, landing pages"
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-blue-600/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-blue-600/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            What you get
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Clear handoffs, working assets, measurable outcomes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="flex items-start bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-white/90 font-medium">
                  {deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
