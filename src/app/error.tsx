"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h3 className="font-medium text-gray-900 mb-2">What you can do:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Try refreshing the page</li>
              <li>• Go back to the previous page</li>
              <li>• Visit our homepage and try again</li>
              <li>• Contact support if the problem persists</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Error ID: {error.digest || "unknown"} • 
            <Link href="/status" className="text-primary hover:underline ml-1">
              Check system status
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
