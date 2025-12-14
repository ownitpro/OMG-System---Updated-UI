import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Page Not Found - 404",
  description: "The page you're looking for doesn't exist. Explore OMGsystems automation solutions for your business.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Industries</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/industries/property-management" className="text-primary hover:underline">
                    Property Management
                  </Link>
                </li>
                <li>
                  <Link href="/industries/real-estate" className="text-primary hover:underline">
                    Real Estate
                  </Link>
                </li>
                <li>
                  <Link href="/industries/contractors" className="text-primary hover:underline">
                    Contractors
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Solutions</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/apps/securevault-docs" className="text-primary hover:underline">
                    SecureVault Docs
                  </Link>
                </li>
                <li>
                  <Link href="/apps/crm" className="text-primary hover:underline">
                    OMG CRM
                  </Link>
                </li>
                <li>
                  <Link href="/apps/leadflow" className="text-primary hover:underline">
                    LeadFlow Engine
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Need help? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
