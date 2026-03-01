"use client";

import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { useMemo } from "react";
import { track } from "@/lib/analytics";
import { getABVariant } from "@/components/ab";

export default function Hero({
  site,
  trustStrip
}: {
  site: SiteConfig;
  trustStrip: string[];
}) {
  const ab = useMemo(() => (typeof window === "undefined" ? { variant: "a" } : getABVariant()), []);

  const headline =
    ab.variant === "b"
      ? "Turn Referrals Into Daily Commissions."
      : "Build Your Funding Business. Earn Daily Commissions.";
  const sub =
    ab.variant === "b"
      ? "Join partners building a pipeline that pays. Zero fees. Training included."
      : "Join 500+ independent agents earning $500–$5K per deal with zero upfront costs.";

  return (
    <section className="border-b-[3px] border-black bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex rounded-[999px] border-[3px] border-black bg-[var(--muted)] px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)]">
              Partner recruitment funnel
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              {headline}
            </h1>
            <p className="mt-4 max-w-xl text-base text-black/80 md:text-lg">{sub}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={site.ctas.apply.href}
                className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-5 py-3 text-base font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                onClick={() => track({ name: "cta_hero_apply_click", props: { ab: ab.variant } })}
              >
                Start Your Application
              </Link>
              <Link
                href={site.ctas.secondary?.href ?? "/#explainer"}
                className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-white px-5 py-3 text-base font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                onClick={() => track({ name: "cta_hero_video_click", props: { ab: ab.variant } })}
              >
                Watch 2-Min Explainer
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {trustStrip.map((t) => (
                <div
                  key={t}
                  className="inline-flex items-center rounded-[999px] border-[3px] border-black bg-[var(--gold)] px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)]"
                >
                  {t}
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs text-black/60">
              This page uses A/B testing for headline/CTA copy. Force variant via <span className="font-mono">?v=a</span> or <span className="font-mono">?v=b</span>.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[var(--radius)] border-[3px] border-black bg-[var(--muted)] shadow-[var(--shadow)]">
              <div className="aspect-[16/10] w-full">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,.35),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(245,158,11,.35),transparent_45%),linear-gradient(135deg,rgba(30,64,175,.2),rgba(11,18,32,.05))]" />
              </div>
              <div className="border-t-[3px] border-black bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold">Motivational b-roll placeholder</div>
                    <div className="text-xs text-black/65">Swap to a looping MP4/WebM later (public assets).</div>
                  </div>
                  <a
                    href={site.ctas.primary.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-[14px] border-[3px] border-black bg-[var(--gold)] px-3 py-2 text-xs font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    onClick={() => track({ name: "cta_hero_partner_links_click", props: { ab: ab.variant } })}
                  >
                    Get The Partner Links
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Zero fees", v: "Apply free" },
                { k: "Speed", v: "24–48 hr review" },
                { k: "Support", v: "Training included" }
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-[16px] border-[3px] border-black bg-white p-4 text-sm shadow-[var(--shadow)]"
                >
                  <div className="font-extrabold">{s.k}</div>
                  <div className="text-xs text-black/70">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
