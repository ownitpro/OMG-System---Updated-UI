"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20">
        <div className="absolute inset-0 bg-[url('/images/leadflow/hero-pattern.svg')] bg-cover bg-center opacity-10"></div>
      </div>
      
      {/* Animated Flow Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center space-x-8 md:space-x-16 opacity-30">
          {/* Ads */}
          <div className="text-center animate-pulse">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Ads</span>
          </div>
          
          {/* Arrow */}
          <div className="text-emerald-400">
            <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Leads */}
          <div className="text-center animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Leads</span>
          </div>
          
          {/* Arrow */}
          <div className="text-emerald-400">
            <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* CRM */}
          <div className="text-center animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">CRM</span>
          </div>
          
          {/* Arrow */}
          <div className="text-emerald-400">
            <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Clients */}
          <div className="text-center animate-pulse" style={{ animationDelay: '1.5s' }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">Clients</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Stop Running Ads Blindly — Build a Predictable Lead Machine
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            LeadFlow Engine turns your digital campaigns into a steady stream of qualified clients—from first click to final sale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Your LeadFlow Strategy Call
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>20+ Industries Served</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>3× Average ROI</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No Long-term Contracts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}