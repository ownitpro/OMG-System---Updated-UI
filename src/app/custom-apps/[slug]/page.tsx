import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { getCustomAppBySlug, customApps } from "@/content/customApps";
import Link from "next/link";

interface CustomAppDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return customApps.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: CustomAppDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getCustomAppBySlug(slug);
  
  if (!app) {
    return {
      title: "App Not Found | OMGsystems",
    };
  }

  return {
    title: `${app.title} | Custom Apps | OMGsystems`,
    description: app.description,
    openGraph: {
      title: `${app.title} | Custom Apps | OMGsystems`,
      description: app.description,
      type: "website",
    },
  };
}

export default async function CustomAppDetailPage({ params }: CustomAppDetailPageProps) {
  const { slug } = await params;
  const app = getCustomAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-lime-50 to-green-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Link
                href="/custom-apps"
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Back to Apps
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {app.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                A real-world example of how custom apps transform workflows.
              </p>
              
              <Link
                href={`/custom-apps/builder?template=${app.slug}`}
                className="inline-block bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lime-700 transition-colors shadow-lg"
              >
                Build Similar App
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Preview Gallery */}
      <Section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              App Preview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-sm text-gray-500">Dashboard</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">Dashboard</h3>
                <p className="text-sm text-gray-600">Main overview and analytics</p>
              </div>
              
              <div className="text-center">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <p className="text-sm text-gray-500">Workflow</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">Workflow</h3>
                <p className="text-sm text-gray-600">Automated processes and logic</p>
              </div>
              
              <div className="text-center">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-sm text-gray-500">Mobile View</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">Mobile View</h3>
                <p className="text-sm text-gray-600">Responsive mobile interface</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Feature Breakdown */}
      <Section className="bg-white py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Modules */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Modules used in this build:
                </h3>
                <div className="space-y-4">
                  {app.modules.map((module, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-lime-600 text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{module}</h4>
                        <p className="text-sm text-gray-600">
                          {module === "Form Intake" && "Capture data from clients"}
                          {module === "User Management" && "Handle user roles and permissions"}
                          {module === "Notifications" && "Send alerts and updates"}
                          {module === "Data Dashboard" && "Display analytics and metrics"}
                          {module === "File Upload" && "Handle document and media uploads"}
                          {module === "API Integration" && "Connect with external services"}
                          {module === "Workflow Automation" && "Automate business processes"}
                          {module === "Payment Processing" && "Handle transactions and billing"}
                          {module === "Chatbot Support" && "Provide automated customer support"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Tech Stack */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Tech stack example:
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                    <p className="text-gray-600">{app.techStack.frontend}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
                    <p className="text-gray-600">{app.techStack.backend}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {app.techStack.integrations.map((integration, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-lime-100 text-lime-700 text-sm rounded-full"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-lime-50 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want something similar?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Click below to start your own custom app based on this example.
            </p>
            <Link
              href={`/custom-apps/builder?template=${app.slug}`}
              className="inline-block bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lime-700 transition-colors shadow-lg"
            >
              Build Similar App
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
