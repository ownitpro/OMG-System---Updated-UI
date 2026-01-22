// src/app/demo/personal/settings/page.tsx
// Personal settings page with tabs

"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [tab, setTab] = useState<"profile" | "security" | "integrations" | "limits">("profile");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-lg text-white/60 mt-2">Manage your personal account settings</p>
      </div>
      <div className="flex gap-4 justify-center">
        {[
          { k: "profile", t: "Profile" },
          { k: "security", t: "Security" },
          { k: "integrations", t: "Integrations" },
          { k: "limits", t: "Limits & Alerts" },
        ].map((x) => (
          <button
            key={x.k}
            onClick={() => setTab(x.k as any)}
            className={`px-6 py-3 rounded-xl text-base font-semibold border transition ${
              tab === x.k
                ? "bg-[#3b82f6] text-black border-transparent"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {x.t}
          </button>
        ))}
      </div>
      {tab === "profile" && <ProfileTab />}
      {tab === "security" && <SecurityTab />}
      {tab === "integrations" && <IntegrationsTab />}
      {tab === "limits" && <LimitsTab />}
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6 max-w-2xl mx-auto">
      <Field label="Full name" value="Jane Doe" />
      <Field label="Email" value="jane@example.com" />
      <Field label="Timezone" value="America/Toronto" />
      <div className="flex justify-center pt-4">
        <button className="rounded-xl bg-[#3b82f6] text-black px-8 py-3 text-base font-semibold hover:opacity-90 transition">
          Save (demo)
        </button>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <Toggle label="Two-factor authentication (demo)" />
        <Toggle label="Login alerts" />
        <Toggle label="Session timeout (30 minutes)" />
        <Toggle label="Email notifications for security events" />
      </div>
      <p className="text-sm text-white/60 text-center">
        WebAuthn + recovery codes are enforced for admins in production.
      </p>
    </div>
  );
}

function IntegrationsTab() {
  const [integrations, setIntegrations] = React.useState({
    email: false,
    google: false,
    onedrive: false,
    dropbox: false,
    box: false,
  });

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations({ ...integrations, [key]: !integrations[key] });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Cloud Integrations</h3>
        <p className="text-sm text-white/60">Connect your cloud storage services</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <IntegrationBox
          name="Email to Vault"
          description="Send documents via email"
          icon="📧"
          connected={integrations.email}
          onClick={() => toggleIntegration('email')}
        />
        <IntegrationBox
          name="Google Drive"
          description="Import from Google Drive"
          icon="📁"
          connected={integrations.google}
          onClick={() => toggleIntegration('google')}
        />
        <IntegrationBox
          name="OneDrive"
          description="Import from Microsoft OneDrive"
          icon="☁️"
          connected={integrations.onedrive}
          onClick={() => toggleIntegration('onedrive')}
        />
        <IntegrationBox
          name="Dropbox"
          description="Import from Dropbox"
          icon="📦"
          connected={integrations.dropbox}
          onClick={() => toggleIntegration('dropbox')}
        />
        <IntegrationBox
          name="Box"
          description="Import from Box"
          icon="📋"
          connected={integrations.box}
          onClick={() => toggleIntegration('box')}
        />
      </div>
      
      <p className="text-sm text-white/60 text-center">
        These integrations do not connect services in demo mode.
      </p>
    </div>
  );
}

function IntegrationBox({ name, description, icon, connected, onClick }: { name: string; description: string; icon: string; connected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border-2 p-6 text-left transition-all ${
        connected
          ? 'border-[#3b82f6] bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <div className="text-base font-semibold text-white">{name}</div>
            <div className="text-xs text-white/60">{description}</div>
          </div>
        </div>
        <div className={`w-12 h-6 rounded-full transition-colors ${connected ? 'bg-[#3b82f6]' : 'bg-white/20'}`}>
          <div className={`w-5 h-5 rounded-full bg-white transition-transform mt-0.5 ${connected ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </div>
      </div>
    </button>
  );
}

function LimitsTab() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6">
        <Field label="Storage cap (MB)" value="500" />
        <Field label="OCR pages / month" value="150" />
        <Field label="Share links limit" value="10" />
        <div className="flex justify-center pt-4">
          <button className="rounded-xl bg-[#3b82f6] text-black px-8 py-3 text-base font-semibold hover:opacity-90 transition">
            Update (demo)
          </button>
        </div>
        <p className="text-sm text-white/60 text-center">
          Alerts: 70% → 80% → 90% → 95% → stop at 100% (demo only visual).
        </p>
      </div>
      
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
        <div className="text-sm font-medium text-white">Install App (mock)</div>
        <p className="text-sm text-white/70">
          Install from <strong className="text-white">securevaultdocs.com</strong>. Desktop: Windows/Mac/Linux. Mobile: use PWA (Add to Home Screen).
        </p>
        <div className="text-xs text-white/50">Troubleshooting: enable "Install app" in your browser, clear any previous PWA, and retry.</div>
      </div>
      
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
        <div className="text-sm font-medium text-white">Marketplace</div>
        <p className="text-sm text-white/70">
          Browse and install ready-made vault templates, request templates, and workflows from the marketplace.
        </p>
        <div className="mt-3">
          <a 
            href="/marketplace" 
            className="inline-block px-4 py-2 rounded-xl bg-[#3b82f6] text-black font-semibold hover:opacity-90 transition"
          >
            Browse Marketplace
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <div className="text-base text-white/70 mb-2 font-medium">{label}</div>
      <input
        defaultValue={value}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
      />
    </label>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <label className="flex items-center justify-between gap-6 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
      <span className="text-base text-white font-medium">{label}</span>
      <input
        type="checkbox"
        className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
    </label>
  );
}

