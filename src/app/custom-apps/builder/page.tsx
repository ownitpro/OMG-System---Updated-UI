import { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { CustomAppsBuilder } from "@/components/custom-apps/CustomAppsBuilder";

export const metadata: Metadata = {
  title: "Custom App Builder | OMGsystems",
  description: "Build your custom application with our guided builder. Choose modules, integrations, and branding to create the perfect app for your business.",
  openGraph: {
    title: "Custom App Builder | OMGsystems",
    description: "Build your custom application with our guided builder. Choose modules, integrations, and branding to create the perfect app for your business.",
    type: "website",
  },
};

export default function CustomAppsBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <Container>
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a href="/custom-apps" className="text-gray-500 hover:text-gray-700 mr-4">
                  ← Back to Apps
                </a>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Custom App Builder</h1>
                  <p className="text-gray-600">Design your perfect business application</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Builder Content */}
      <Section className="py-8">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <CustomAppsBuilder />
        </Suspense>
      </Container>
      </Section>
    </div>
  );
}
