"use client";

import { useMemo, useState } from "react";
import BrutCard from "@/components/BrutCard";
import { track } from "@/lib/analytics";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/**
 * Simple, transparent model:
 * - Commission rate is a conservative blended estimate (default 7% of deal size)
 * - Deals/month * avg deal size * rate = monthly commission
 */
export default function EarningsCalculator() {
  const [deals, setDeals] = useState(6); // 1–50
  const [dealSize, setDealSize] = useState(75000); // 10k–500k
  const [rateBps, setRateBps] = useState(700); // 3%–12% in bps (300–1200)

  const monthly = useMemo(() => {
    const d = clamp(deals, 1, 50);
    const s = clamp(dealSize, 10000, 500000);
    const r = clamp(rateBps, 300, 1200) / 10000;
    return d * s * r;
  }, [deals, dealSize, rateBps]);

  const annual = monthly * 12;

  return (
    <BrutCard variant="featured">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-5">
            <div>
              <div className="flex items-center justify-between text-sm font-extrabold">
                <label htmlFor="deals">Deals per month</label>
                <span className="rounded-[999px] border-[3px] border-black bg-white px-3 py-1 shadow-[var(--shadow)]">
                  {deals}
                </span>
              </div>
              <input
                id="deals"
                type="range"
                min={1}
                max={50}
                value={deals}
                onChange={(e) => setDeals(parseInt(e.target.value, 10))}
                className="mt-3 w-full"
                onMouseUp={() => track({ name: "calc_change_deals", props: { deals } })}
                onTouchEnd={() => track({ name: "calc_change_deals", props: { deals } })}
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-extrabold">
                <label htmlFor="size">Average deal size</label>
                <span className="rounded-[999px] border-[3px] border-black bg-white px-3 py-1 shadow-[var(--shadow)]">
                  {formatMoney(dealSize)}
                </span>
              </div>
              <input
                id="size"
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={dealSize}
                onChange={(e) => setDealSize(parseInt(e.target.value, 10))}
                className="mt-3 w-full"
                onMouseUp={() => track({ name: "calc_change_deal_size", props: { dealSize } })}
                onTouchEnd={() => track({ name: "calc_change_deal_size", props: { dealSize } })}
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-extrabold">
                <label htmlFor="rate">Estimated commission rate</label>
                <span className="rounded-[999px] border-[3px] border-black bg-white px-3 py-1 shadow-[var(--shadow)]">
                  {(rateBps / 100).toFixed(1)}%
                </span>
              </div>
              <input
                id="rate"
                type="range"
                min={300}
                max={1200}
                step={50}
                value={rateBps}
                onChange={(e) => setRateBps(parseInt(e.target.value, 10))}
                className="mt-3 w-full"
                onMouseUp={() => track({ name: "calc_change_rate", props: { rateBps } })}
                onTouchEnd={() => track({ name: "calc_change_rate", props: { rateBps } })}
              />
              <p className="mt-2 text-xs text-black/70">
                Adjust this based on your tier and payout table. (Default is a conservative blended estimate.)
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border-[3px] border-black bg-white p-5 shadow-[var(--shadow)]">
          <div className="text-xs font-extrabold text-black/60">Monthly Commission</div>
          <div className="mt-2 text-3xl font-extrabold">{formatMoney(monthly)}</div>

          <div className="mt-6 text-xs font-extrabold text-black/60">Annual (12 months)</div>
          <div className="mt-2 text-2xl font-extrabold">{formatMoney(annual)}</div>

          <div className="mt-6 rounded-[16px] border-[3px] border-black bg-[var(--muted)] p-4 text-xs text-black/75">
            This tool is for planning and does not guarantee earnings.
          </div>
        </div>
      </div>
    </BrutCard>
  );
}
