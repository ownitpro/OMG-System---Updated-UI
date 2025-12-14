"use client";

export default function BeforeAfter() {
  const comparisons = [
    {
      before: "Lead generation feels like a guessing game.",
      after: "You have steady, high-quality leads each week."
    },
    {
      before: "Results are unpredictable.",
      after: "You finally see clear ROI and control your growth."
    },
    {
      before: "No idea which ads work.",
      after: "You know what's working and scale confidently."
    },
    {
      before: "Leads are lost or missed.",
      after: "Every lead gets followed up and nurtured."
    },
    {
      before: "Team feels stressed and lost.",
      after: "Your system grows with you; chaos is gone."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Before | After
          </h2>
        </div>

        <div className="space-y-8">
          {comparisons.map((comparison, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="bg-white rounded-lg p-6 border-l-4 border-red-400 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Before
                    </h3>
                    <p className="text-gray-700">
                      {comparison.before}
                    </p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-400 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      After
                    </h3>
                    <p className="text-gray-700">
                      {comparison.after}
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
