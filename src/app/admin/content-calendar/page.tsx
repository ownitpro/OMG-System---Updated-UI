import React from "react";
import { Metadata } from "next";
import { ContentCalendar } from "@/components/content/content-calendar";

export const metadata: Metadata = {
  title: "Content Calendar | Admin Dashboard",
  description: "Manage your content calendar and publishing schedule.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-600 mt-2">
            Plan and manage your content strategy across all channels.
          </p>
        </div>

        <div className="space-y-8">
          {/* Q1 2025 */}
          <ContentCalendar quarter="q1" />
          
          {/* Q2 2025 */}
          <ContentCalendar quarter="q2" />
          
          {/* Q3 2025 */}
          <ContentCalendar quarter="q3" />
          
          {/* Q4 2025 */}
          <ContentCalendar quarter="q4" />
        </div>
      </div>
    </div>
  );
}
