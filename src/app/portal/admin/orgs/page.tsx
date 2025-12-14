import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminOrgsPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="Organizations" nav={nav}>
      <ComingSoon
        title="Organization Management"
        text="Manage organizations and their settings."
      />
    </PortalShell>
  );
}

