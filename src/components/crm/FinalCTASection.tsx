"use client";

import { useRouter } from "next/navigation";

export default function FinalCTASection() {
  const router = useRouter();

  const handleDemoClick = () => {
    router.push("/try-live-demo?industry=crm");
  };

  const handleContactSales = () => {
    router.push("/contact");
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Join thousands of businesses that have transformed their operations with our CRM.
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start growing your business today with a CRM that actually works for your industry.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button
              onClick={handleDemoClick}
              className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Try a Live Demo
            </button>
            
            <button
              onClick={handleContactSales}
              className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg rounded-full transition-all duration-300 ease-in-out"
            >
              Contact Sales
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-emerald-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trusted by 1,000+ businesses
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-emerald-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Canadian data residency
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-emerald-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Enterprise security
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
