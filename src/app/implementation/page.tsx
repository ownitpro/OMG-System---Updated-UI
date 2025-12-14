import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

export const metadata: Metadata = {
  title: "Implementation Process | OMGsystems",
  description: "Learn how OMGsystems implements custom automation solutions from discovery to go-live with our proven 6-step process.",
  openGraph: {
    title: "Implementation Process | OMGsystems",
    description: "Learn how OMGsystems implements custom automation solutions from discovery to go-live with our proven 6-step process.",
    type: "website",
  },
};

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Implementation Process
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              From discovery to go-live: How we implement your custom automation solutions
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-700">
                Our proven 6-step process ensures successful implementation with clear timelines, 
                deliverables, and ongoing support throughout your automation journey.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Overview */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our 6-Step Implementation Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Discovery & Assessment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We dive deep into your current processes, pain points, and automation opportunities.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Process mapping & analysis
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Stakeholder interviews
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Technical requirements gathering
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    ROI analysis & prioritization
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-xs text-blue-700">
                    <strong>Timeline:</strong> 1-2 weeks<br/>
                    <strong>Deliverable:</strong> Implementation roadmap
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Configuration & Prototyping</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We build and configure your automation workflows based on your specific requirements.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Workflow design & configuration
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Custom form & template creation
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Integration setup & testing
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Initial prototype development
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <div className="text-xs text-purple-700">
                    <strong>Timeline:</strong> 2-3 weeks<br/>
                    <strong>Deliverable:</strong> Working prototype
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Integration & Data Mapping</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We connect your existing systems and ensure seamless data flow between platforms.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    API connections & authentication
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Data mapping & transformation
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Field mapping & validation
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Error handling & monitoring
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="text-xs text-green-700">
                    <strong>Timeline:</strong> 1-2 weeks<br/>
                    <strong>Deliverable:</strong> Integrated system
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Pilot & Testing</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We run a controlled pilot with real data to validate and refine the automation.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Limited user testing
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Performance monitoring
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Bug fixes & optimizations
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    User feedback collection
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <div className="text-xs text-orange-700">
                    <strong>Timeline:</strong> 1-2 weeks<br/>
                    <strong>Deliverable:</strong> Validated system
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border-l-4 border-indigo-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    5
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Rollout & Training</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We deploy the full system and provide comprehensive training to your team.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Full system deployment
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    User training & documentation
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Admin training & handoff
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Go-live support
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-200">
                  <div className="text-xs text-indigo-700">
                    <strong>Timeline:</strong> 1 week<br/>
                    <strong>Deliverable:</strong> Live system
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border-l-4 border-teal-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    6
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Optimization & Support</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We monitor performance, gather feedback, and continuously optimize your automation.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    Performance monitoring
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    User feedback & improvements
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    Ongoing support & maintenance
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    Future enhancement planning
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-teal-200">
                  <div className="text-xs text-teal-700">
                    <strong>Timeline:</strong> Ongoing<br/>
                    <strong>Deliverable:</strong> Optimized system
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team & Roles */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Who's Involved
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">OMGsystems Team</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Project Manager</h4>
                    <p className="text-sm text-gray-600">Coordinates timeline, manages deliverables, and ensures smooth communication</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Solutions Architect</h4>
                    <p className="text-sm text-gray-600">Designs workflows, configures integrations, and ensures technical best practices</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Implementation Specialist</h4>
                    <p className="text-sm text-gray-600">Builds and tests automations, handles data mapping, and provides training</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Support Engineer</h4>
                    <p className="text-sm text-gray-600">Provides ongoing support, monitors performance, and handles optimization</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Team</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Project Sponsor</h4>
                    <p className="text-sm text-gray-600">Provides strategic direction, approves changes, and ensures business alignment</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Process Owner</h4>
                    <p className="text-sm text-gray-600">Defines requirements, validates workflows, and provides domain expertise</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">IT Contact</h4>
                    <p className="text-sm text-gray-600">Facilitates system access, manages integrations, and handles technical requirements</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">End Users</h4>
                    <p className="text-sm text-gray-600">Participate in testing, provide feedback, and receive training on new processes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline & Milestones */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Typical Timeline & Milestones
            </h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">Discovery & Assessment</h3>
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Week 1-2</span>
                    </div>
                    <p className="text-gray-600 text-sm">Complete process analysis and requirements gathering</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">Configuration & Prototyping</h3>
                      <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">Week 3-5</span>
                    </div>
                    <p className="text-gray-600 text-sm">Build and configure initial automation workflows</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">Integration & Data Mapping</h3>
                      <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Week 6-7</span>
                    </div>
                    <p className="text-gray-600 text-sm">Connect systems and ensure seamless data flow</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">Pilot & Testing</h3>
                      <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Week 8-9</span>
                    </div>
                    <p className="text-gray-600 text-sm">Run controlled pilot with real data and user feedback</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">Rollout & Training</h3>
                      <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded">Week 10</span>
                    </div>
                    <p className="text-gray-600 text-sm">Deploy full system and provide comprehensive training</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    6
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">Optimization & Support</h3>
                      <span className="text-sm text-teal-600 bg-teal-100 px-2 py-1 rounded">Ongoing</span>
                    </div>
                    <p className="text-gray-600 text-sm">Monitor performance and continuously optimize</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                <strong>Total Implementation Time:</strong> 8-10 weeks for most projects
              </p>
              <p className="text-sm text-gray-500">
                Timeline may vary based on complexity, number of integrations, and scope of automation
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Success Factors */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Keys to Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clear Communication</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Regular check-ins and status updates</li>
                  <li>• Clear documentation of requirements</li>
                  <li>• Transparent timeline and milestone tracking</li>
                  <li>• Open feedback channels throughout the process</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stakeholder Engagement</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Active participation from process owners</li>
                  <li>• Early involvement of end users</li>
                  <li>• Executive sponsorship and support</li>
                  <li>• Cross-functional team collaboration</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Iterative Approach</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Start with high-impact, low-risk automations</li>
                  <li>• Build and test in small increments</li>
                  <li>• Gather feedback early and often</li>
                  <li>• Adapt and refine based on learnings</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Management</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Comprehensive user training</li>
                  <li>• Clear documentation and procedures</li>
                  <li>• Gradual rollout with support</li>
                  <li>• Ongoing support and optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss your automation needs and create a custom implementation plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact?type=implementation"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Schedule Discovery Call
              </a>
              <a
                href="/case-snapshots"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
