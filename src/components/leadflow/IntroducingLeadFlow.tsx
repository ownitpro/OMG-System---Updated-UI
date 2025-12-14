"use client";

export default function IntroducingLeadFlow() {
  const benefits = [
    "All your lead tools: integrated & automated.",
    "Zero gaps: from ad to follow-up to sale.",
    "Data-driven and optimized daily.",
    "Built for real growth—whether starting out or scaling fast."
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            Introducing: LeadFlow Engine
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your turnkey lead system—captures leads on Meta (Facebook & Instagram), delivers instantly to your CRM, nurtures them with smart automations, and helps you close and retain more clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What it is
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              A complete lead generation system that takes you from ad creation to client conversion. No more guessing, no more gaps, no more lost opportunities.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Key Benefits:
              </h4>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why It Works
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">1</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Integrated System</h4>
                  <p className="text-gray-600 text-sm">Everything works together seamlessly</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">2</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Data-Driven</h4>
                  <p className="text-gray-600 text-sm">Every decision backed by real performance data</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">3</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Scalable</h4>
                  <p className="text-gray-600 text-sm">Grows with your business from startup to enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
