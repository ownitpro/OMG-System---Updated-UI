import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function StrategySessionPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Strategy Session" nav={nav}>
      <ComingSoon
        title="Strategy Session"
        text="Book and manage your strategy sessions with our team."
      />
    </PortalShell>
  );
}

