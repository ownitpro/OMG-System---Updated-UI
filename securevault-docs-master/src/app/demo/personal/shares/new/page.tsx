import DemoShell from "../../../_shared/DemoShell";

export default function NewShare(){
  return (
    <DemoShell title="New share link (mock)" kind="personal">
      <form className="rounded-2xl bg-white/5 p-6 space-y-4">
        <div>
          <label className="text-sm">Label</label>
          <input className="block w-full bg-white/10 rounded-xl px-3 py-2" placeholder="Tax slips" />
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/> PIN required</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/> Expiry (7 days)</label>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400">Create (mock)</button>
      </form>
    </DemoShell>
  );
}

