"use client";

export default function IndustryCards() {
  const industries = [
    {
      title: "Property Management",
      description: "Secure tenant documents, lease agreements, and maintenance records.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
      link: "/industries/property-management"
    },
    {
      title: "Contractors",
      description: "Project documents, permits, and client communications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 1-.535-1.763m11.28 3.948L15 17.25m-6.18-2.25L8.25 15.75m2.57-2.57L12 12.75m-1.5-1.5L8.25 9.75m2.25-2.25L12 6.75m-1.5-1.5L8.25 3.75m2.25-2.25L12 0.75m-1.5-1.5L8.25-2.25" />
        </svg>
      ),
      color: "bg-orange-50 text-orange-600",
      link: "/industries/contractors"
    },
    {
      title: "Healthcare",
      description: "Patient records, consent forms, and compliance documentation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ),
      color: "bg-green-50 text-green-600",
      link: "/industries/healthcare"
    },
    {
      title: "Accounting",
      description: "Client files, tax documents, and audit-ready documentation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      color: "bg-purple-50 text-purple-600",
      link: "/industries/accounting"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Built for Your Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pre-configured workflows and features tailored to your specific business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-gray-100"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${industry.color} mb-4`}>
                {industry.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {industry.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {industry.description}
              </p>
              
              <a 
                href={industry.link}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group-hover:underline"
              >
                Learn More
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 to-blue-400/0 group-hover:from-emerald-400/5 group-hover:to-blue-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
