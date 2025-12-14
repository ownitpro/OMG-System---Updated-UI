import Link from "next/link";
import { automations } from "@/content/automations";

// Function to map automation IDs to their target pages
function getAutomationLink(automationId: string): string {
  const linkMap: Record<string, string> = {
    "client-upsert": "/smart-automations#client-upsert",
    "spreadsheet-sync": "/workflow-builder#spreadsheet-sync",
    "overdue-invoice-reminder": "/workflow-builder#overdue-invoice",
    "meeting-followup": "/smart-automations#meeting-followup",
    "auto-filing": "/apps/securevault-docs#auto-filing",
    "contract-renewal": "/workflow-builder#contract-expiry",
    "feedback-request": "/workflow-builder#customer-feedback",
    "team-alerts": "/workflow-builder#slack-alerts",
    "auto-approval": "/smart-automations#auto-approval",
    "client-status-email": "/smart-automations#status-snapshot",
    "lead-enrichment": "/smart-automations#lead-enrichment",
    "subscription-renewal": "/workflow-builder#subscription-renewal",
    "ticket-triage": "/smart-automations#ticket-triage",
  };
  
  return linkMap[automationId] || `/automations#${automationId}`;
}

interface AutomationGridProps {
  title?: string;
  description?: string;
  showAll?: boolean;
  limit?: number;
}

export function AutomationGrid({ 
  title = "Ready-to-Deploy Automations",
  description = "Choose from our library of proven automations that eliminate repetitive tasks and boost your team's productivity.",
  showAll = true,
  limit = 6
}: AutomationGridProps) {
  const displayAutomations = showAll ? automations : automations.slice(0, limit);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayAutomations.map((automation) => (
            <div
              key={automation.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {automation.title}
                </h3>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  <span style={{color: "#E57373"}}><strong>Pain Point:</strong></span> {automation.painPoint}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Solution:</strong> {automation.solution}
                </p>
              </div>
              
              <Link
                href={getAutomationLink(automation.id)}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        {!showAll && automations.length > limit && (
          <div className="text-center mt-12">
            <Link
              href="/automations"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Automations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
