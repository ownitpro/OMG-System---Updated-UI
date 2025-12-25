"use client";

export default function FrustrationsFixes() {
  const frustrations = [
    {
      title: "Rollercoaster lead flow",
      frustration: "Some months are strong, then nothing.",
      fix: "Predictable campaign setup means steady leads."
    },
    {
      title: "Low intent contacts",
      frustration: "You get many contacts but few buyers.",
      fix: "Smarter targeting gets buyers not browsers."
    },
    {
      title: "Slow follow-up",
      frustration: "Leads come in, and by the time you reach out, they're gone.",
      fix: "Instant CRM integration + automated nurture."
    },
    {
      title: "Tools are disconnected",
      frustration: "Wrestling spreadsheets, email lists, missed conversations.",
      fix: "Automation replaces spreadsheets/emails."
    },
    {
      title: "No clarity on ROI",
      frustration: "Pouring money into ads but unclear what works.",
      fix: "Data tracks every dollar → focus on ROI."
    },
    {
      title: "Messaging blends in",
      frustration: "Your messaging looks like competitors'.",
      fix: "Creative video ads + tailored funnels."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[150px] h-[250px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-0 w-[150px] h-[250px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-[#47BD79]/8 via-emerald-500/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            We've heard this before
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            If this sounds familiar, LeadFlow fixes it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frustrations.map((item, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Frustration icon & title */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-xl">😤</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>

              {/* Fix section */}
              <div className="bg-[#47BD79]/10 rounded-xl p-4 border-l-4 border-[#47BD79]">
                <p className="text-sm font-semibold text-[#47BD79] mb-1">
                  Our fix:
                </p>
                <p className="text-white/80 text-sm">
                  {item.fix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
