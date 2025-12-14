import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function ContentDevelopmentPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Content Development" nav={nav}>
      <ComingSoon
        title="Content Development"
        text="Create and manage your content marketing materials."
      />
    </PortalShell>
  );
}

