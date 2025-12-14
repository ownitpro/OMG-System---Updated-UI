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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            What You Get
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700 font-medium">
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
