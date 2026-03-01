"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl rounded-[18px] border-[3px] border-black bg-white p-5 shadow-[var(--shadow)]">
        <div className="flex items-start justify-between gap-3">
          <div className="text-lg font-extrabold">{title}</div>
          <button
            className="rounded-[14px] border-[3px] border-black bg-white px-3 py-1 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
