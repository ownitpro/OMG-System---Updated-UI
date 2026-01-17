"use client";

export default function IntroducingLeadFlow() {
  const benefits = [
    "All your lead tools: integrated & automated.",
    "Zero gaps: from ad to follow-up to sale.",
    "Data-driven and optimized daily.",
    "Built for real growth—whether starting out or scaling fast."
  ];

  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[300px] bg-gradient-to-r from-blue-600/15 via-blue-500/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[300px] bg-gradient-to-l from-blue-600/15 via-blue-500/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-br from-indigo-600/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Introducing: LeadFlow Engine
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Your turnkey lead system—captures leads on Meta (Facebook & Instagram), delivers instantly to your CRM, nurtures them with smart automations, and helps you close and retain more clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">
              What it is
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              A complete lead generation system that takes you from ad creation to client conversion. No more guessing, no more gaps, no more lost opportunities.
            </p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">
                Key Benefits:
              </h4>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-white/80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">
              Why It Works
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400 font-bold text-sm">1</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Integrated System</h4>
                  <p className="text-white/60 text-sm">Everything works together seamlessly</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400 font-bold text-sm">2</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Data-Driven</h4>
                  <p className="text-white/60 text-sm">Every decision backed by real performance data</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400 font-bold text-sm">3</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Scalable</h4>
                  <p className="text-white/60 text-sm">Grows with your business from startup to enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
