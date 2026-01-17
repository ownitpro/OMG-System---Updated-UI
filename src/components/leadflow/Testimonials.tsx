"use client";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Within 7 days we got 20 qualified leads, closed 2 clients—the ad spend paid for itself.",
      author: "Sarah Johnson",
      title: "Property Manager",
      company: "Metro Properties",
      stats: "20 qualified leads in 7 days"
    },
    {
      quote: "Our conversion rate doubled, and our team spends half the time chasing leads.",
      author: "Michael Lee",
      title: "Clinic Director",
      company: "HealthFirst Clinic",
      stats: "3× higher conversion"
    },
    {
      quote: "Finally, a system that works. We went from inconsistent leads to a steady stream of qualified prospects.",
      author: "Jennifer Chen",
      title: "Marketing Director",
      company: "TechStart Solutions",
      stats: "60% time saved on follow-up"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-black">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-blue-600/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-blue-600/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-indigo-600/8 via-blue-500/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Proof & results
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real results from real businesses using LeadFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="mb-4">
                <div className="flex text-blue-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400 font-bold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-white/60 text-sm">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium inline-block border border-blue-500/30">
                  {testimonial.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
