import { redirect } from 'next/navigation';

// Redirect /admin/usage to /dashboard/admin/usage-events
export default function AdminUsageRedirect() {
  redirect('/dashboard/admin/usage-events');
}
