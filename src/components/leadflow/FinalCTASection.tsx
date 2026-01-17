"use client";

export default function FinalCTASection() {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-bl from-blue-600/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-gradient-to-b from-indigo-600/15 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Ready to turn your ads into clients — on autopilot?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-600 transition-all duration-200 transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]">
            Book Your Free LeadFlow Strategy Call
          </button>
        </div>

        <div className="text-white/60 text-sm">
          <p>No long-term contracts • 3× average ROI • 20+ industries served</p>
        </div>
      </div>
    </section>
  );
}
