"use client";

import { useRouter } from "next/navigation";

export default function IndustryCards() {
  const router = useRouter();

  const industries = [
    {
      title: "CRM for Contractors",
      description: "Track jobs from lead to invoice",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
      link: "/industries/contractors"
    },
    {
      title: "CRM for Property Management",
      description: "Manage tenants, maintenance, and rent collection",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M21.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3.75 9.75l10.5-6" />
        </svg>
      ),
      color: "bg-green-50 text-green-600",
      link: "/industries/property-management"
    },
    {
      title: "CRM for Accounting",
      description: "Streamline client onboarding and tax preparation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21m-1.5-1.5h.008v.008H19.5m-1.5-1.5H18m-1.5-1.5h.008v.008H16.5m-1.5-1.5H15m-1.5-1.5h.008v.008H13.5m-1.5-1.5H12m-1.5-1.5h.008v.008H10.5m-1.5-1.5H9m-1.5-1.5h.008v.008H7.5m-1.5-1.5H6m-1.5-1.5h.008v.008H4.5m-1.5-1.5H3m-1.5-1.5h.008v.008H1.5" />
        </svg>
      ),
      color: "bg-purple-50 text-purple-600",
      link: "/industries/accounting"
    },
    {
      title: "CRM for Healthcare",
      description: "Patient management and appointment scheduling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      color: "bg-red-50 text-red-600",
      link: "/industries/healthcare"
    }
  ];

  const handleLearnMore = (link: string) => {
    router.push(link);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Pre-configured workflows and features tailored to your business needs.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleLearnMore(industry.link)}
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
              
              <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700 transition-colors">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
              
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 to-blue-400/0 group-hover:from-emerald-400/5 group-hover:to-blue-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
