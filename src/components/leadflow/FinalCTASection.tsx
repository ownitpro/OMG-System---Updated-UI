"use client";

export default function FinalCTASection() {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-[#47BD79]/20 via-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-bl from-[#47BD79]/20 via-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-gradient-to-b from-[#47BD79]/15 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Ready to turn your ads into clients — on autopilot?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#47BD79] text-lg font-medium rounded-xl text-white bg-[#47BD79] hover:bg-[#47BD79]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#47BD79] transition-all duration-200 transform hover:scale-105 shadow-[0_0_30px_rgba(71,189,121,0.3)] hover:shadow-[0_0_40px_rgba(71,189,121,0.5)]">
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
