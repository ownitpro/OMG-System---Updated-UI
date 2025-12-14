import Link from "next/link";
import {
  getSolutionsForHomepageSection,
  type SolutionConfig,
} from "@/config/solutions_config";

function AutomationCard({ solution }: { solution: SolutionConfig }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {solution.label}
      </h3>
      <p className="text-gray-600 mb-4">{solution.summary}</p>

      {solution.bullets && solution.bullets.length > 0 && (
        <ul className="space-y-1 text-sm text-gray-600 mb-6">
          {solution.bullets.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1 text-emerald-500">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {solution.ctaHref && solution.ctaLabel && (
        <div className="mt-auto">
          <Link
            href={solution.ctaHref}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-semibold hover:from-emerald-600 hover:to-lime-600 transition-all"
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title stays the same as your current layout */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Automation &amp; Workflows
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
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








