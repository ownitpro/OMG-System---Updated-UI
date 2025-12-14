"use client";

export default function ReadyToTry() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              Ready to Secure Your Documents?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Included in the OMGsystems Platform or available as a standalone solution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Try SecureVault Docs Demo
              </button>
              
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Contact Sales for Custom Vault Solution
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
