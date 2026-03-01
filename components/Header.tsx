"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SiteConfig } from "@/lib/types";
import { track } from "@/lib/analytics";
import { getABVariant } from "@/components/ab";

export default function Header({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const ab = useMemo(() => (typeof window === "undefined" ? { variant: "a" } : getABVariant()), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-black bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-[16px] border-[3px] border-black bg-white px-3 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          onClick={() => track({ name: "nav_logo_click", props: { ab: ab.variant } })}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[10px] border-[3px] border-black bg-[var(--gold)]">
            PH
          </span>
          <span>{site.brand.wordmark}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[14px] px-3 py-2 text-sm font-bold transition hover:bg-[var(--muted)]"
              onClick={() => track({ name: "nav_click", props: { href: item.href, ab: ab.variant } })}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.ctas.apply.href}
            className="ml-2 inline-flex items-center justify-center rounded-[16px] border-[3px] border-black bg-[var(--green)] px-4 py-2 text-sm font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            onClick={() => track({ name: "cta_header_apply_click", props: { ab: ab.variant } })}
          >
            {site.ctas.apply.label}
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-[16px] border-[3px] border-black bg-white px-3 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t-[3px] border-black bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-2">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[14px] border-[3px] border-black bg-white px-4 py-3 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  onClick={() => {
                    setOpen(false);
                    track({ name: "nav_mobile_click", props: { href: item.href, ab: ab.variant } });
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={site.ctas.apply.href}
                className="rounded-[14px] border-[3px] border-black bg-[var(--green)] px-4 py-3 text-center font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                onClick={() => {
                  setOpen(false);
                  track({ name: "cta_mobile_apply_click", props: { ab: ab.variant } });
                }}
              >
                {site.ctas.apply.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
