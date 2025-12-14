import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminOmgIqPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="OMG-IQ Admin" nav={nav}>
      <ComingSoon
        title="OMG-IQ Admin"
        text="Admin interface for OMG-IQ system management."
      />
    </PortalShell>
  );
}

