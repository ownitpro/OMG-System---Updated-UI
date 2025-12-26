import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function PricingStrip({
  price,
  note,
  color = "#47BD79",
}: {
  price: string;
  note?: string;
  color?: string;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span
        className="rounded-full px-4 py-1.5 text-sm font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {price}
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white">
        <CheckIcon className="w-4 h-4 text-[#47BD79]" />
        {note || "Cancel anytime"}
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white">
        <ShieldCheckIcon className="w-4 h-4 text-[#3B82F6]" />
        Secure checkout
      </span>
    </div>
  );
}

