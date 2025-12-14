"use client";

export default function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Ready to turn your ads into clients — on autopilot?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-emerald-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book Your Free LeadFlow Strategy Call
          </button>
        </div>
        
        <div className="text-white/80 text-sm">
          <p>No long-term contracts • 3× average ROI • 20+ industries served</p>
        </div>
      </div>
    </section>
  );
}