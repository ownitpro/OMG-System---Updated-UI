export default function NewShare(){
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-zinc-100">New Share Link</h1>
      <form className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
        <div>
          <label className="text-sm text-zinc-300">Label</label>
          <input className="block w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100" placeholder="KYC" />
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" defaultChecked className="rounded border-zinc-700 text-blue-600"/> PIN required</label>
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" className="rounded border-zinc-700 text-blue-600"/> Expiry (7 days)</label>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">Create (mock)</button>
      </form>
    </div>
  );
}

