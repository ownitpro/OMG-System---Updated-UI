"use client";

export default function FrustrationsFixes() {
  const frustrations = [
    {
      frustration: "Inconsistent Lead Flow – Some months are strong, then nothing.",
      fix: "Predictable campaign setup means steady leads."
    },
    {
      frustration: "Low-Quality Leads – You get many contacts but few buyers.",
      fix: "Smarter targeting gets buyers not browsers."
    },
    {
      frustration: "Slow Follow-Up – Leads come in, and by the time you reach out, they're gone.",
      fix: "Instant CRM integration + automated nurture."
    },
    {
      frustration: "Manual Chaos – Wrestling spreadsheets, email lists, missed conversations.",
      fix: "Automation replaces spreadsheets/emails."
    },
    {
      frustration: "Wasted Ad Spend – Pouring money into ads but unclear what works.",
      fix: "Data tracks every dollar → focus on ROI."
    },
    {
      frustration: "Generic Messaging – Your messaging looks like competitors'.",
      fix: "Creative video ads + tailored funnels."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            If any of these sound familiar, you're not alone. Most businesses struggle with the same lead generation challenges.
          </h2>
        </div>

        <div className="space-y-8">
          {frustrations.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Frustration */}
              <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-red-400">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your Frustration
                    </h3>
                    <p className="text-gray-700">
                      {item.frustration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fix */}
              <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-400">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Our Fix
                    </h3>
                    <p className="text-gray-700">
                      {item.fix}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
