import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminSecurevaultDocsPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="SecureVault Docs Admin" nav={nav}>
      <ComingSoon
        title="SecureVault Docs Admin"
        text="Admin interface for SecureVault Docs system management."
      />
    </PortalShell>
  );
}

