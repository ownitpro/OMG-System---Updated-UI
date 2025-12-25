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
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[150px] h-[250px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[150px] h-[250px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Before | After
          </h2>
        </div>

        <div className="space-y-6">
          {comparisons.map((comparison, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Before */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border-l-4 border-red-500/70 border border-white/10 hover:border-red-500/30 transition-all duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">
                      Before
                    </h3>
                    <p className="text-white/80">
                      {comparison.before}
                    </p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="bg-[#47BD79]/10 backdrop-blur-xl rounded-xl p-6 border-l-4 border-[#47BD79] border border-[#47BD79]/20 hover:border-[#47BD79]/40 transition-all duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#47BD79] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#47BD79] mb-2">
                      After
                    </h3>
                    <p className="text-white/80">
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
