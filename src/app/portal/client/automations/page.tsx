import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function AutomationsPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Automations" nav={nav}>
      <ComingSoon
        title="Automations"
        text="This is where you'll run and manage your automations."
      />
    </PortalShell>
  );
}

