import React from 'react';
import { Metadata } from 'next';
import { AdminShell } from '@/components/admin/admin-shell';
import { ComplianceDashboard } from '@/components/governance/compliance-dashboard';

export const metadata: Metadata = {
  title: 'Governance & Compliance | Admin | OMGsystems',
  description: 'Monitor and manage compliance across all frameworks and regulations',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminGovernancePage() {
  return (
    <AdminShell>
      <ComplianceDashboard />
    </AdminShell>
  );
}
