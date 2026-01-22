// app/demo/business/components/KpisMock.tsx

export function KpisMock() {
  return (
    <div className="grid md:grid-cols-4 gap-3 mb-6">
      <div className="rounded-2xl border p-4">
        <div className="text-xs text-muted-foreground">Uploads/day</div>
        <div className="text-2xl font-semibold">86</div>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-xs text-muted-foreground">OCR pages</div>
        <div className="text-2xl font-semibold">312</div>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-xs text-muted-foreground">Egress GB</div>
        <div className="text-2xl font-semibold">0.8</div>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="text-xs text-muted-foreground">Active users</div>
        <div className="text-2xl font-semibold">24</div>
      </div>
    </div>
  );
}

