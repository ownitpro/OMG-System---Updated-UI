import { redirect } from 'next/navigation';

// Redirect /admin/audit to /dashboard/admin/audit
export default function AdminAuditRedirect() {
  redirect('/dashboard/admin/audit');
}
