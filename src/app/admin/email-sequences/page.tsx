import React from "react";
import { Metadata } from "next";
import { EmailSequenceManager } from "@/components/email/email-sequence-manager";

export const metadata: Metadata = {
  title: "Email Sequences | Admin Dashboard",
  description: "Manage your email marketing sequences and automation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmailSequencesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Sequences</h1>
          <p className="text-gray-600 mt-2">
            Manage your automated email marketing sequences and nurture campaigns.
          </p>
        </div>

        <EmailSequenceManager />
      </div>
    </div>
  );
}
