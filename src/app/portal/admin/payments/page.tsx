import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminPaymentsPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="Payments (Stripe)" nav={nav}>
      <ComingSoon
        title="Payment Management"
        text="View and manage payments, subscriptions, and billing through Stripe."
      />
    </PortalShell>
  );
}

