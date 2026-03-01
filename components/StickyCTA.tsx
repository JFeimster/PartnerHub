"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

export default function StickyCTA({ label, href }: { label: string; href: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3 rounded-[18px] border-[3px] border-black bg-white p-3 shadow-[var(--shadow)]">
          <div className="text-sm font-extrabold">Ready to start?</div>
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-[16px] border-[3px] border-black bg-[var(--green)] px-4 py-2 text-sm font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            onClick={() => track({ name: "sticky_cta_click" })}
          >
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
}
