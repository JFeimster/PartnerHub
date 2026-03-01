"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/types";
import { track } from "@/lib/analytics";

export default function FAQAccordion({
  items,
  defaultOpenIndex
}: {
  items: FAQItem[];
  defaultOpenIndex?: number;
}) {
  const [open, setOpen] = useState<number | null>(typeof defaultOpenIndex === "number" ? defaultOpenIndex : null);

  return (
    <div className="grid gap-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={it.q} className="rounded-[18px] border-[3px] border-black bg-white shadow-[var(--shadow)]">
            <button
              className="flex w-full items-center justify-between gap-4 p-4 text-left font-extrabold"
              onClick={() => {
                const next = isOpen ? null : idx;
                setOpen(next);
                track({ name: "faq_toggle", props: { index: idx, open: !isOpen } });
              }}
              aria-expanded={isOpen}
            >
              <span>{it.q}</span>
              <span className="text-2xl">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="border-t-[3px] border-black p-4 text-sm text-black/80">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
