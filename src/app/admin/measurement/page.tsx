import React from "react";
import { Metadata } from "next";
import { MeasurementDashboard } from "@/components/measurement/measurement-dashboard";

export const metadata: Metadata = {
  title: "Measurement & Analytics | Admin Dashboard",
  description: "Monitor key performance indicators and feedback loops.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MeasurementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Measurement & Analytics</h1>
          <p className="text-gray-600 mt-2">
            Monitor key performance indicators, feedback loops, and business metrics across all channels.
          </p>
        </div>

        <MeasurementDashboard />
      </div>
    </div>
  );
}
