export function ComingSoon({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-zinc-600">{text}</div>

      <div className="mt-5 rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-600">
        Coming soon. We're building this now.
      </div>
    </div>
  );
}

