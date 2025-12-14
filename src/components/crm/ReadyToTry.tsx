"use client";

import { useRouter } from "next/navigation";

export default function ReadyToTry() {
  const router = useRouter();

  const handleDemoClick = () => {
    router.push("/try-live-demo?industry=crm");
  };

  const handleContactSales = () => {
    router.push("/contact");
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Ready to Try the CRM?
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            See how our CRM can transform your business operations and drive growth.
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
              Contact Sales for Custom Pricing
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Available standalone or included in our full platform.
          </p>
        </div>
      </div>
    </section>
  );
}
