"use client";

import BrutCard from "@/components/BrutCard";

export default function ComparisonBars({
  items
}: {
  items: { label: string; value: number; note: string }[];
}) {
  const max = Math.max(...items.map((i) => i.value));

  return (
    <BrutCard variant="default">
      <div className="grid gap-5">
        {items.map((i) => {
          const pct = Math.round((i.value / max) * 100);
          return (
            <div key={i.label} className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold">{i.label}</div>
                <div className="text-xs font-extrabold text-black/60">{i.note}</div>
              </div>
              <div className="h-10 overflow-hidden rounded-[16px] border-[3px] border-black bg-[var(--muted)]">
                <div
                  className="h-full border-r-[3px] border-black bg-[var(--green)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        <p className="text-xs text-black/70">
          Ranges are illustrative for comparison and are not a guarantee.
        </p>
      </div>
    </BrutCard>
  );
}
