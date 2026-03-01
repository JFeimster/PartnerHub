"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import Link from "next/link";

const quick = [
  { q: "Is there any upfront cost?", a: "No—there are zero fees to apply and train." },
  { q: "Can I do this part-time?", a: "Yes. Start with Affiliate or ISO and build consistency." },
  { q: "How fast is approval?", a: "Typically 24–48 hours after you submit the form." }
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      track({ name: "chat_nudge_eligible" });
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      {open && (
        <div className="mb-3 w-[320px] rounded-[18px] border-[3px] border-black bg-white p-4 shadow-[var(--shadow)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold">Quick questions</div>
              <div className="text-xs text-black/60">Demo chat widget (replace with Intercom/Drift later)</div>
            </div>
            <button
              className="rounded-[14px] border-[3px] border-black bg-white px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              onClick={() => {
                setOpen(false);
                track({ name: "chat_close" });
              }}
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            {quick.map((x, i) => (
              <button
                key={x.q}
                className="rounded-[14px] border-[3px] border-black bg-[var(--muted)] px-3 py-2 text-left text-xs font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                onClick={() => {
                  setActive(i);
                  track({ name: "chat_quick_click", props: { index: i } });
                }}
              >
                {x.q}
              </button>
            ))}
          </div>

          {active !== null && (
            <div className="mt-4 rounded-[14px] border-[3px] border-black bg-white px-3 py-3 text-sm shadow-[var(--shadow)]">
              {quick[active]?.a}
            </div>
          )}

          <div className="mt-4 grid gap-2">
            <Link
              href="/apply#form"
              className="inline-flex items-center justify-center rounded-[16px] border-[3px] border-black bg-[var(--green)] px-3 py-2 text-xs font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              onClick={() => track({ name: "chat_apply_click" })}
            >
              Start application
            </Link>
            <a
              href="mailto:partners@moonshine.capital"
              className="inline-flex items-center justify-center rounded-[16px] border-[3px] border-black bg-white px-3 py-2 text-xs font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              onClick={() => track({ name: "chat_email_click" })}
            >
              Email support
            </a>
          </div>
        </div>
      )}

      <button
        className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--gold)] px-4 py-3 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        onClick={() => {
          setOpen((v) => !v);
          track({ name: open ? "chat_toggle_close" : "chat_toggle_open" });
        }}
        aria-expanded={open}
      >
        {open ? "—" : "Chat"}
      </button>
    </div>
  );
}
