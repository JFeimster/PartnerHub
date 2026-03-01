"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = "ph_exit_intent_shown";
    if (sessionStorage.getItem(key) === "1") return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem(key, "1");
        setOpen(true);
        track({ name: "exit_intent_open" });
      }
    };

    window.addEventListener("mouseout", onMouseLeave);
    return () => window.removeEventListener("mouseout", onMouseLeave);
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        track({ name: "exit_intent_close" });
      }}
      title="Before you go… want the quick-start guide?"
    >
      <p className="text-sm text-black/80">
        Get the 1-page “First Deal Checklist” (demo). Or skip and apply now.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="/apply#form"
          className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          onClick={() => track({ name: "exit_intent_apply_click" })}
        >
          Apply Now
        </Link>
        <a
          href="/img/first-deal-checklist.png"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-white px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          onClick={() => track({ name: "exit_intent_guide_click" })}
        >
          View Guide
        </a>
      </div>

      <p className="mt-4 text-xs text-black/60">
        Tip: Replace this with an email capture form if you want to deliver the guide via automation.
      </p>
    </Modal>
  );
}
