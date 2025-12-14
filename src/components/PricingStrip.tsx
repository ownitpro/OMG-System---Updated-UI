export function PricingStrip({
  price,
  note,
}: {
  price: string;
  note?: string;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold text-white">
        {price}
      </span>
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
        {note || "Cancel anytime"}
      </span>
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
        Secure checkout
      </span>
    </div>
  );
}

