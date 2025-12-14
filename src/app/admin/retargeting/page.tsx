import React from "react";
import { Metadata } from "next";
import { RetargetingManager } from "@/components/retargeting/retargeting-manager";

export const metadata: Metadata = {
  title: "Retargeting Campaigns | Admin Dashboard",
  description: "Manage your retargeting audiences and creatives across all platforms.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RetargetingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Retargeting Campaigns</h1>
          <p className="text-gray-600 mt-2">
            Manage your retargeting audiences and creatives across Facebook, Google, LinkedIn, and Twitter.
          </p>
        </div>

        <RetargetingManager />
      </div>
    </div>
  );
}
