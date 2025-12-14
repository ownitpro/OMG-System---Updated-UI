"use client";

export default function ProblemsSolutions() {
  const problems = [
    {
      problem: "Docs are scattered across drives & email",
      solution: "Unified cloud vault for all clients & files with intelligent organization."
    },
    {
      problem: "Manual filing takes days; audits take weeks",
      solution: "Automated workflows file & tag in minutes, not days."
    },
    {
      problem: "Security and compliance feel like afterthoughts",
      solution: "Encryption, Canadian-residency, built-in audit logs by default."
    },
    {
      problem: "Finding documents is a nightmare",
      solution: "AI-powered search with tags, instant document retrieval."
    },
    {
      problem: "Client document sharing is risky",
      solution: "Secure client portals with role-based access and encrypted sharing."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            See how SecureVault Docs solves the biggest document-management challenges.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop losing control of your documents.
          </p>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Problem</h3>
              </div>
              <div className="bg-emerald-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-emerald-900">Solution</h3>
              </div>
            </div>
            
            {problems.map((item, index) => (
              <div key={index} className="grid grid-cols-2 border-b border-gray-200 last:border-b-0">
                <div className="px-6 py-4 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.problem}</p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-start space-x-4 bg-emerald-50/50">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="lg:hidden space-y-6">
          {problems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Problem</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.problem}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
