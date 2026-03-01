"use client";

import { useMemo, useState } from "react";
import type { Testimonial } from "@/lib/types";
import BrutCard from "@/components/BrutCard";
import Image from "next/image";
import { track } from "@/lib/analytics";

export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  const next = () => {
    setIndex((i) => {
      const ni = (i + 1) % items.length;
      track({ name: "testimonial_next", props: { index: ni } });
      return ni;
    });
  };

  const prev = () => {
    setIndex((i) => {
      const ni = (i - 1 + items.length) % items.length;
      track({ name: "testimonial_prev", props: { index: ni } });
      return ni;
    });
  };

  const dots = useMemo(() => Array.from({ length: Math.min(items.length, 6) }), [items.length]);

  if (!current) return null;

  return (
    <BrutCard variant="default">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="text-2xl font-extrabold leading-snug">
            “{current.quote}”
          </div>
          <div className="mt-4 text-sm font-extrabold">
            {current.name} <span className="text-black/60">· {current.location}</span>
          </div>
          <div className="mt-2 inline-flex rounded-[999px] border-[3px] border-black bg-[var(--gold)] px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)]">
            {current.monthlyEarnings}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={prev}
              className="inline-flex items-center justify-center rounded-[14px] border-[3px] border-black bg-white px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Prev
            </button>
            <button
              onClick={next}
              className="inline-flex items-center justify-center rounded-[14px] border-[3px] border-black bg-[var(--green)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Next
            </button>

            <div className="ml-2 flex items-center gap-2">
              {dots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const ni = i % items.length;
                    setIndex(ni);
                    track({ name: "testimonial_dot", props: { index: ni } });
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-3 w-3 rounded-full border-[3px] border-black ${
                    i % items.length === index ? "bg-[var(--gold)]" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border-[3px] border-black bg-[var(--muted)] p-4 shadow-[var(--shadow)]">
          <div className="aspect-square overflow-hidden rounded-[14px] border-[3px] border-black bg-white">
            <Image src={current.thumbnail} alt={`${current.name} thumbnail`} width={600} height={600} />
          </div>
          <div className="mt-4 text-xs text-black/70">
            {current.type === "video" ? "Video testimonial (placeholder)" : "Written testimonial"}
          </div>
        </div>
      </div>
    </BrutCard>
  );
}
