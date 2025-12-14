import { redirect } from 'next/navigation';

// Redirect /admin/feature-flags to /dashboard/admin/feature-flags
export default function AdminFeatureFlagsRedirect() {
  redirect('/dashboard/admin/feature-flags');
}
