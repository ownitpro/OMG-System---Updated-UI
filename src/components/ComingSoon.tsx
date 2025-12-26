import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export function ComingSoon({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
      style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
    >
      <div className="text-2xl font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-white/60">{text}</div>

      <div className="mt-5 rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
            <RocketLaunchIcon className="w-6 h-6 text-[#47BD79]" />
          </div>
        </div>
        <div className="text-white font-medium">Coming Soon</div>
        <div className="text-sm text-white/50 mt-1">We're building this now.</div>
      </div>
    </div>
  );
}

