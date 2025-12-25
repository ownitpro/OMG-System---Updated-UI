import Link from "next/link";
import {
  getSolutionsForHomepageSection,
  type SolutionConfig,
} from "@/config/solutions_config";

function AutomationCard({ solution }: { solution: SolutionConfig }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-[#47BD79]/20 hover:bg-white/10 hover:border-[#47BD79]/40 transition-all duration-600 ease-premium-out flex flex-col h-full" style={{ boxShadow: '0 0 30px rgba(71, 189, 121, 0.1)' }}>
      <h3 className="text-xl font-semibold text-white mb-2">
        {solution.label}
      </h3>
      <p className="text-white/60 mb-4">{solution.summary}</p>

      {solution.bullets && solution.bullets.length > 0 && (
        <ul className="space-y-1 text-sm text-white/60 mb-6">
          {solution.bullets.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1 text-[#47BD79]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {solution.ctaHref && solution.ctaLabel && (
        <div className="mt-auto">
          <Link
            href={solution.ctaHref}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#47BD79] text-white text-sm font-semibold hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)]"
          >
            {solution.ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

export function HomeAutomationAndWorkflowsSection() {
  const solutions = getSolutionsForHomepageSection("automation_workflows");

  // We expect exactly 2 here: Automations + Custom Solutions
  // but this will gracefully support more if you ever add them.
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title stays the same as your current layout */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Automation &amp; Workflows
        </h2>
        <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">
          Turn busywork into background noise. OMGsystems connects your CRM,
          SecureVault Docs, inboxes, and forms so leads, documents, and tasks
          move automatically—while you and your team focus on clients and
          growth.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <AutomationCard key={solution.id} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  );
}








