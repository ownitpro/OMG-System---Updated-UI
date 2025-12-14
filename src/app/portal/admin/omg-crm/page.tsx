import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminOmgCrmPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="OMG-CRM Admin" nav={nav}>
      <ComingSoon
        title="OMG-CRM Admin"
        text="Admin interface for OMG-CRM system management."
      />
    </PortalShell>
  );
}

