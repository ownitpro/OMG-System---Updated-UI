import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getAdminNav } from "@/config/portalNav";

export default function AdminOmgAiMasteryPage() {
  const nav = getAdminNav();
  return (
    <PortalShell role="admin" title="OMG-AI-Mastery Admin" nav={nav}>
      <ComingSoon
        title="OMG-AI-Mastery Admin"
        text="Admin interface for OMG-AI-Mastery system management."
      />
    </PortalShell>
  );
}

