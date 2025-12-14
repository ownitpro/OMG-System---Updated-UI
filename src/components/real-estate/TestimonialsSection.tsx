"use client";

const testimonials = [
  {
    quote: "Our team cut admin time by 40% and doubled listings under contract.",
    author: "Toronto Real Estate Group",
    company: "Toronto Real Estate Group",
    badge: "Top Rated",
  },
  {
    quote: "The automation handles what my assistant used to do manually — 24/7.",
    author: "Sarah Chen",
    company: "Re/Max Premier",
    badge: "Trusted by Canadian Brokerages",
  },
  {
    quote: "Lead response time went from hours to minutes. Game changer.",
    author: "Mark Thompson",
    company: "Royal LePage",
    badge: "Top Rated",
  },
];

const brokerLogos = [
  "Re/Max",
  "Royal LePage",
  "Century 21",
  "Coldwell Banker",
  "Keller Williams",
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            What Canadian Realtors Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real estate professionals across Canada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.company}
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                  {testimonial.badge}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Broker logo carousel */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-6">Trusted by leading Canadian brokerages</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {brokerLogos.map((logo, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
