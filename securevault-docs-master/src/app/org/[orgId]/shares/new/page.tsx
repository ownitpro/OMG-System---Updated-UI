// src/app/org/[orgId]/shares/new/page.tsx

"use client";

import * as React from "react";
import { usePlanEnforcement } from "@/hooks/usePlanEnforcement";
import { getUpgradeSuggestion } from "@/lib/plan-limits";
import UpgradePromptModal from "@/components/UpgradePromptModal";

async function createShare(orgId: string, payload: any) {
  const res = await fetch(`/api/org/${orgId}/shares`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create share link');
  }
  return data;
}

type Props = {
  params: Promise<{ orgId: string }>;
};

const DEFAULT_LABELS = ["KYC", "Offer", "Tax", "Invoice", "Contract", "Receipt"];

export default function NewShareLinkPage({ params }: Props) {
  const { canCreateShareLink, plan, trialExpired } = usePlanEnforcement();
  const [orgId, setOrgId] = React.useState<string>("");
  const [label, setLabel] = React.useState("KYC");
  const [pin, setPin] = React.useState("");
  const [expiryDays, setExpiryDays] = React.useState(7);
  const [allowDownload, setAllowDownload] = React.useState(false);
  const [link, setLink] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
  const [upgradeMessage, setUpgradeMessage] = React.useState({
    title: '',
    message: '',
    suggestedPlan: 'growth',
    benefits: [] as string[],
  });

  React.useEffect(() => {
    params.then((p) => setOrgId(p.orgId));
  }, [params]);

  async function onCreate() {
    // Check plan limits before attempting to create
    const enforcementResult = canCreateShareLink();

    if (!enforcementResult.allowed) {
      setError(enforcementResult.reason || 'Cannot create share link');

      if (enforcementResult.showUpgradePrompt) {
        const upgrade = getUpgradeSuggestion(plan, 'shareLinks');
        if (upgrade) {
          setUpgradeMessage({
            title: trialExpired ? 'Trial Expired' : 'Share Link Limit Reached',
            message: enforcementResult.reason || 'Upgrade to create more share links',
            suggestedPlan: enforcementResult.suggestedPlan || upgrade.suggestedPlan,
            benefits: upgrade.benefits,
          });
          setShowUpgradeModal(true);
        }
      }
      return;
    }

    setError(null);

    try {
      const out = await createShare(orgId, {
        label,
        pin: pin || undefined,
        expiryDays,
        allowDownload,
        docIds: [],
      });
      setLink(out.url);
    } catch (err: any) {
      setError(err.message || 'Failed to create share link');

      // Check if it's a limit error from the backend
      if (err.message.includes('limit') || err.message.includes('expired')) {
        const upgrade = getUpgradeSuggestion(plan, 'shareLinks');
        if (upgrade) {
          setUpgradeMessage({
            title: err.message.includes('expired') ? 'Trial Expired' : 'Share Link Limit Reached',
            message: err.message,
            suggestedPlan: upgrade.suggestedPlan,
            benefits: upgrade.benefits,
          });
          setShowUpgradeModal(true);
        }
      }
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-semibold">New share link</h1>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm">
              Label
              <select
                className="mt-1 w-full rounded-xl border p-2 text-sm"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              >
                {DEFAULT_LABELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              PIN (optional)
              <input
                className="mt-1 w-full rounded-xl border p-2 text-sm"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="4–6 digits"
              />
            </label>
            <label className="block text-sm">
              Expires in (days)
              <input
                type="number"
                min={1}
                max={30}
                className="mt-1 w-full rounded-xl border p-2 text-sm"
                value={expiryDays}
                onChange={(e) =>
                  setExpiryDays(parseInt(e.target.value || "1", 10))
                }
              />
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={allowDownload}
                onChange={(e) => setAllowDownload(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Allow downloads
            </label>
          </div>
          <div className="space-y-2 text-xs opacity-80 rounded-xl border p-3">
            <div className="font-semibold text-sm mb-1">
              Documents (coming soon)
            </div>
            <p>
              For this demo, links don&apos;t yet attach specific documents. We
              just show how PINs, expiry and watermarked downloads would work.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
            onClick={onCreate}
          >
            Create link
          </button>
          <a
            href={`/org/${orgId}/overview`}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Cancel
          </a>
        </div>
        {link && (
          <div className="rounded-xl border p-3 text-sm">
            <div>Share this link:</div>
            <div className="mt-1 break-all text-xs">{link}</div>
          </div>
        )}
      </div>

      <UpgradePromptModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title={upgradeMessage.title}
        message={upgradeMessage.message}
        suggestedPlan={upgradeMessage.suggestedPlan}
        benefits={upgradeMessage.benefits}
      />
    </>
  );
}

