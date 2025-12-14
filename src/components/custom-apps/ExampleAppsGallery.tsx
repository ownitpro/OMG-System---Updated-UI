"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

interface ExampleApp {
  id: string;
  title: string;
  description: string;
  category: string;
  modules: string[];
  image: string;
  useCase: string;
}

const exampleApps: ExampleApp[] = [
  {
    id: "vendor-management",
    title: "Vendor Management Tool",
    description: "Streamline vendor onboarding, performance tracking, and payment processing",
    category: "Operations",
    modules: ["Form/Intake", "Workflow", "Dashboard", "Notifications", "User Management"],
    image: "/api/placeholder/400/300",
    useCase: "Property management companies managing multiple vendors and contractors"
  },
  {
    id: "client-onboarding",
    title: "Client Onboarding App",
    description: "Automated client onboarding with document collection and workflow management",
    category: "Customer Experience",
    modules: ["Form/Intake", "Workflow", "Document Storage", "Notifications", "API Integration"],
    image: "/api/placeholder/400/300",
    useCase: "Service businesses automating client intake and onboarding processes"
  },
  {
    id: "inventory-tracking",
    title: "Inventory Tracking Dashboard",
    description: "Real-time inventory management with automated alerts and reporting",
    category: "Operations",
    modules: ["Dashboard", "Notifications", "API Integration", "Reports", "Workflow"],
    image: "/api/placeholder/400/300",
    useCase: "Retail and manufacturing businesses tracking inventory levels"
  },
  {
    id: "field-service",
    title: "Field Service Management",
    description: "Assignment tracking, check-ins, and job completion workflows",
    category: "Operations",
    modules: ["Form/Intake", "Workflow", "Notifications", "User Management", "API Integration"],
    image: "/api/placeholder/400/300",
    useCase: "Contractors and service providers managing field operations"
  },
  {
    id: "booking-scheduling",
    title: "Booking & Scheduling System",
    description: "Automated appointment booking with calendar integration and reminders",
    category: "Customer Experience",
    modules: ["Form/Intake", "Workflow", "Notifications", "API Integration", "Dashboard"],
    image: "/api/placeholder/400/300",
    useCase: "Healthcare, beauty, and service businesses managing appointments"
  },
  {
    id: "membership-portal",
    title: "Membership Portal",
    description: "Member management with subscription handling and content access",
    category: "Customer Experience",
    modules: ["User Management", "Form/Intake", "Workflow", "Dashboard", "API Integration"],
    image: "/api/placeholder/400/300",
    useCase: "Associations and clubs managing member subscriptions and benefits"
  },
  {
    id: "compliance-tracking",
    title: "Compliance & Audit Tracking",
    description: "Track compliance requirements, deadlines, and audit documentation",
    category: "Compliance",
    modules: ["Form/Intake", "Workflow", "Document Storage", "Notifications", "Reports"],
    image: "/api/placeholder/400/300",
    useCase: "Healthcare, financial, and regulated industries managing compliance"
  },
  {
    id: "custom-crm",
    title: "Custom CRM for Dental Practices",
    description: "Specialized CRM for dental practices with appointment and treatment tracking",
    category: "Healthcare",
    modules: ["Form/Intake", "Workflow", "Dashboard", "Notifications", "User Management"],
    image: "/api/placeholder/400/300",
    useCase: "Dental practices managing patients, appointments, and treatments"
  },
  {
    id: "performance-dashboard",
    title: "Internal Performance Dashboard",
    description: "Real-time performance metrics and KPI tracking for teams",
    category: "Analytics",
    modules: ["Dashboard", "Reports", "API Integration", "Notifications", "Workflow"],
    image: "/api/placeholder/400/300",
    useCase: "Businesses tracking team performance and operational metrics"
  },
  {
    id: "payment-portal",
    title: "Payment & Collection Portal",
    description: "Automated payment processing with collection workflows and reporting",
    category: "Finance",
    modules: ["Form/Intake", "Workflow", "API Integration", "Notifications", "Reports"],
    image: "/api/placeholder/400/300",
    useCase: "Service businesses managing payments and collections"
  },
  {
    id: "document-approval",
    title: "Document Review & Approval",
    description: "Streamlined document review process with approval workflows",
    category: "Operations",
    modules: ["Form/Intake", "Workflow", "Document Storage", "Notifications", "User Management"],
    image: "/api/placeholder/400/300",
    useCase: "Legal, real estate, and professional services managing document approvals"
  },
  {
    id: "incident-tracking",
    title: "Incident & Issue Tracking",
    description: "Track and manage incidents with automated escalation and resolution",
    category: "Operations",
    modules: ["Form/Intake", "Workflow", "Notifications", "Dashboard", "Reports"],
    image: "/api/placeholder/400/300",
    useCase: "Property management and facilities management tracking issues"
  },
  {
    id: "referral-program",
    title: "Referral & Loyalty Program",
    description: "Manage referral programs with automated rewards and tracking",
    category: "Marketing",
    modules: ["Form/Intake", "Workflow", "User Management", "Notifications", "API Integration"],
    image: "/api/placeholder/400/300",
    useCase: "Service businesses running referral and loyalty programs"
  },
  {
    id: "hr-performance",
    title: "Employee Performance Tool",
    description: "Track employee performance with goal setting and review workflows",
    category: "HR",
    modules: ["Form/Intake", "Workflow", "Dashboard", "User Management", "Reports"],
    image: "/api/placeholder/400/300",
    useCase: "HR departments managing employee performance and reviews"
  },
  {
    id: "equipment-maintenance",
    title: "Equipment Maintenance Scheduler",
    description: "Schedule and track equipment maintenance with automated reminders",
    category: "Operations",
    modules: ["Form/Intake", "Workflow", "Notifications", "Dashboard", "API Integration"],
    image: "/api/placeholder/400/300",
    useCase: "Manufacturing and facilities management scheduling maintenance"
  },
  {
    id: "analytics-dashboard",
    title: "Custom Analytics Dashboard",
    description: "Business intelligence dashboard with custom metrics and reporting",
    category: "Analytics",
    modules: ["Dashboard", "Reports", "API Integration", "Workflow", "Notifications"],
    image: "/api/placeholder/400/300",
    useCase: "Businesses needing custom analytics and business intelligence"
  },
  {
    id: "field-reporting",
    title: "Mobile Field Reporting",
    description: "Mobile app for field workers to report activities and issues",
    category: "Mobile",
    modules: ["Form/Intake", "Workflow", "Notifications", "API Integration", "User Management"],
    image: "/api/placeholder/400/300",
    useCase: "Field service and construction companies managing mobile reporting"
  },
  {
    id: "claim-processing",
    title: "Automated Claim Processing",
    description: "Streamline insurance and claim processing with automated workflows",
    category: "Finance",
    modules: ["Form/Intake", "Workflow", "Document Storage", "API Integration", "Notifications"],
    image: "/api/placeholder/400/300",
    useCase: "Insurance and financial services processing claims"
  },
  {
    id: "iot-alerts",
    title: "IoT Sensor Alert System",
    description: "Monitor IoT sensors and send automated alerts for anomalies",
    category: "IoT",
    modules: ["API Integration", "Notifications", "Dashboard", "Workflow", "Reports"],
    image: "/api/placeholder/400/300",
    useCase: "Manufacturing and facilities monitoring IoT sensors and devices"
  },
  {
    id: "api-orchestration",
    title: "Custom API Orchestration",
    description: "Orchestrate multiple APIs and services with custom business logic",
    category: "Integration",
    modules: ["API Integration", "Workflow", "Notifications", "Dashboard", "Reports"],
    image: "/api/placeholder/400/300",
    useCase: "Businesses integrating multiple systems and APIs"
  }
];

export function ExampleAppsGallery() {
  const [selectedApp, setSelectedApp] = useState<ExampleApp | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(exampleApps.map(app => app.category)))];

  const filteredApps = filter === "all" 
    ? exampleApps 
    : exampleApps.filter(app => app.category === filter);

  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Example Custom Apps
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              See what's possible with our custom app builder. These examples show real-world applications built with our modules.
            </p>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                onClick={() => setSelectedApp(app)}
              >
                <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-gray-400 text-sm">App Screenshot</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {app.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {app.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {app.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Modules Used:</p>
                    <div className="flex flex-wrap gap-1">
                      {app.modules.slice(0, 3).map((module) => (
                        <span
                          key={module}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {module}
                        </span>
                      ))}
                      {app.modules.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{app.modules.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* App Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {selectedApp.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedApp.title}
                  </h2>
                  <p className="text-gray-600">
                    {selectedApp.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Use Case</h3>
                  <p className="text-gray-600 mb-6">
                    {selectedApp.useCase}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Modules Used</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedApp.modules.map((module) => (
                      <div
                        key={module}
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm"
                      >
                        {module}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">App Preview</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400">App Screenshot Preview</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Build Similar App
                  </button>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
