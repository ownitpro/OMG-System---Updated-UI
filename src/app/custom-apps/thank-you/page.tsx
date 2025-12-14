import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

export const metadata: Metadata = {
  title: "Thank You | Custom Apps | OMGsystems",
  description: "Thank you for submitting your custom app specifications. Our team will contact you within 48 hours.",
  robots: "noindex, nofollow",
};

export default function CustomAppsThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Submission!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Our team has received your custom app specifications.<br />
              Expect an email or call within 48 hours to discuss your build.
            </p>
            
            <div className="bg-lime-50 border border-lime-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens next?</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-lime-100 rounded-full flex items-center justify-center mr-3 text-lime-600 text-xs">1</span>
                  <span>Our team reviews your specifications</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-lime-100 rounded-full flex items-center justify-center mr-3 text-lime-600 text-xs">2</span>
                  <span>We prepare a detailed proposal and timeline</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-lime-100 rounded-full flex items-center justify-center mr-3 text-lime-600 text-xs">3</span>
                  <span>We contact you within 48 hours to discuss next steps</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-block bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lime-700 transition-colors"
              >
                Return Home
              </Link>
              
              <div className="text-sm text-gray-600">
                <p>Questions? Contact us at <a href="mailto:Contact@omgsystems.com" className="text-lime-600 hover:text-lime-700">Contact@omgsystems.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
