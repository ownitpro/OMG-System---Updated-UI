"use client";
import * as React from "react";
import { useFormStatus } from "react-dom";
export { convertToOrgWithPlanAction } from "./wizard_server"; // server action below via separate file

export function ConvertWizard({
  demoId,
  leadEmail,
  leadName,
  leadCompany,
  context,
  action,
}: {
  demoId: string;
  leadEmail: string;
  leadName: string;
  leadCompany: string;
  context: { app: string; industry: string; answers: any };
  action: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Convert to Lead → Org
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="ml-auto h-full w-full max-w-xl bg-white shadow-xl overflow-y-auto">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="font-semibold">Convert to Organization</h2>
              <button
                className="text-sm text-neutral-600"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <form action={action} className="p-5 grid gap-4">
              <input type="hidden" name="demoId" value={demoId} />
              <input type="hidden" name="context_app" value={context.app} />
              <input type="hidden" name="context_industry" value={context.industry} />

              {/* Step 1: Lead basics */}
              <fieldset className="rounded-xl border border-neutral-200 p-4">
                <legend className="text-sm font-semibold">Lead</legend>
                <div className="grid gap-3">
                  <label className="block">
                    <span className="text-xs font-medium">Full name</span>
                    <input
                      name="leadName"
                      defaultValue={leadName}
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium">Email *</span>
                    <input
                      name="leadEmail"
                      defaultValue={leadEmail}
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium">Company</span>
                    <input
                      name="company"
                      defaultValue={leadCompany}
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    />
                  </label>
                </div>
              </fieldset>

              {/* Step 2: Plan selection (Product/Package/Tier) */}
              <fieldset className="rounded-xl border border-neutral-200 p-4">
                <legend className="text-sm font-semibold">Package & Plan</legend>
                <div className="grid md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-medium">Product *</span>
                    <select
                      name="product"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    >
                      <option value="">Select</option>
                      <option value="crm">OMG CRM</option>
                      <option value="securevault-docs">SecureVault Docs</option>
                      <option value="leadflow">LeadFlow Engine</option>
                      <option value="industryiq">IndustryIQ</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium">Package *</span>
                    <select
                      name="package"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    >
                      <option value="">Select</option>
                      <option value="starter">Starter</option>
                      <option value="growth">Growth</option>
                      <option value="scale">Scale</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium">Billing interval *</span>
                    <select
                      name="interval"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    >
                      <option value="MONTH">Monthly</option>
                      <option value="YEAR">Yearly</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium">Seats / Units</span>
                    <input
                      type="number"
                      min={1}
                      defaultValue={3}
                      name="seats"
                      className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-2"
                    />
                  </label>
                </div>
                <label className="flex items-center gap-2 md:col-span-2 mt-3">
                  <input type="checkbox" name="bill_now" defaultChecked />
                  <span className="text-sm">Create first invoice now</span>
                </label>
              </fieldset>

              {/* Step 3: Seed toggles */}
              <fieldset className="rounded-xl border border-neutral-200 p-4">
                <legend className="text-sm font-semibold">Defaults</legend>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="seed_leadflow" defaultChecked />{" "}
                  <span className="text-sm">Seed LeadFlow defaults</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="seed_industryiq" defaultChecked />{" "}
                  <span className="text-sm">Seed IndustryIQ defaults</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="seed_flags" defaultChecked />{" "}
                  <span className="text-sm">Seed FeatureFlags from package</span>
                </label>
              </fieldset>

              <SubmitRow onClose={() => setOpen(false)} />
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SubmitRow({ onClose }: { onClose: () => void }) {
  const { pending } = useFormStatus() as any;
  return (
    <div className="flex items-center gap-3 pt-2">
      <button className="btn btn-primary" disabled={pending} aria-busy={pending}>
        {pending ? "Converting…" : "Convert now"}
      </button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={onClose}
        disabled={pending}
      >
        Cancel
      </button>
    </div>
  );
}