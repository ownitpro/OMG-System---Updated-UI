import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminEntitlementsPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="Entitlements" nav={nav}>
      <ComingSoon
        title="Entitlements Management"
        text="Manage product entitlements and feature access."
      />
    </PortalShell>
  );
}

