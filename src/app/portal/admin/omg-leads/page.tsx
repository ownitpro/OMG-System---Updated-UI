import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminOmgLeadsPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="OMG-Leads Admin" nav={nav}>
      <ComingSoon
        title="OMG-Leads Admin"
        text="Admin interface for OMG-Leads system management."
      />
    </PortalShell>
  );
}

