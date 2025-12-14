import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';
import { Role } from '../../generated/prisma';

export const metadata: Metadata = {
  title: "Client Dashboard | OMGsystems",
  description: "Manage your automations, usage, and account settings.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userRole = (session.user as any).role as Role;
  if (userRole === Role.VENDOR) { // VENDOR role cannot access client dashboard
    redirect('/unauthorized');
  }

  // Placeholder for a DashboardSidebar component
  const DashboardSidebar = () => (
    <aside className="w-64 bg-gray-800 text-white p-4 flex-shrink-0">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2"><a href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Overview</a></li>
          <li className="mb-2"><a href="/dashboard/usage" className="block py-2 px-3 rounded hover:bg-gray-700">Usage & Billing</a></li>
          <li className="mb-2"><a href="/dashboard/workflows" className="block py-2 px-3 rounded hover:bg-gray-700">Automations & Workflows</a></li>
          <li className="mb-2"><a href="/dashboard/support" className="block py-2 px-3 rounded hover:bg-gray-700">Support</a></li>
          <li className="mb-2"><a href="/dashboard/settings" className="block py-2 px-3 rounded hover:bg-gray-700">Account Settings</a></li>
        </ul>
      </nav>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}