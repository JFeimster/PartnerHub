"use client";

import type { Tier } from "@/lib/types";
import BrutCard from "@/components/BrutCard";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function TiersGrid({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {tiers.map((t) => (
        <BrutCard key={t.id} variant={t.featured ? "featured" : "default"}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold">{t.title}</h3>
            {t.featured && (
              <div className="rounded-[999px] border-[3px] border-black bg-[var(--green)] px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)]">
                Recommended
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-[14px] border-[3px] border-black bg-white px-3 py-2">
              <div className="text-xs font-extrabold text-black/60">Commission</div>
              <div className="font-extrabold">{t.commission}</div>
            </div>
            <div className="rounded-[14px] border-[3px] border-black bg-white px-3 py-2">
              <div className="text-xs font-extrabold text-black/60">Time</div>
              <div className="font-semibold">{t.time}</div>
            </div>
            <div className="rounded-[14px] border-[3px] border-black bg-white px-3 py-2">
              <div className="text-xs font-extrabold text-black/60">Best for</div>
              <div className="font-semibold">{t.bestFor}</div>
            </div>
            <div className="rounded-[14px] border-[3px] border-black bg-white px-3 py-2">
              <div className="text-xs font-extrabold text-black/60">What you do</div>
              <div className="font-semibold">{t.whatYouDo}</div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/apply#form`}
              className="inline-flex w-full items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--gold)] px-4 py-2 text-center font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              onClick={() => track({ name: "tier_cta_click", props: { tier: t.id } })}
            >
              {t.ctaLabel}
            </Link>
          </div>
        </BrutCard>
      ))}
    </div>
  );
}
