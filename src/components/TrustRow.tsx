import {
  RocketLaunchIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export function TrustRow() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white">
        <RocketLaunchIcon className="w-4 h-4 text-[#A855F7]" />
        Instant access after purchase
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white">
        <ShieldCheckIcon className="w-4 h-4 text-[#3B82F6]" />
        Secure payments
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white">
        <CheckIcon className="w-4 h-4 text-[#47BD79]" />
        Cancel anytime
      </span>
    </div>
  );
}

