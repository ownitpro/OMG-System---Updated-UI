import { redirect } from 'next/navigation';

// Redirect all /admin/* routes to /dashboard/admin/*
// This consolidates admin routes to a single location
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // This layout should not be used - redirect to dashboard/admin
  redirect('/dashboard/admin');
}