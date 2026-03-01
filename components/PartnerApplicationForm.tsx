"use client";

import { useMemo, useState } from "react";
import type { Tier } from "@/lib/types";
import BrutCard from "@/components/BrutCard";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { getABVariant, getUTMParams } from "@/components/ab";

export default function PartnerApplicationForm({ tiers }: { tiers: Tier[] }) {
  const router = useRouter();
  const ab = useMemo(() => getABVariant(), []);
  const utm = useMemo(() => getUTMParams(), []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [why, setWhy] = useState("");
  const [tier, setTier] = useState<Tier["id"]>("iso");
  const [smsOptIn, setSmsOptIn] = useState(true);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    track({ name: "apply_submit_attempt", props: { tier, ab: ab.variant } });

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          occupation,
          why,
          tier,
          smsOptIn,
          utm,
          ab,
          meta: {
            userAgent: navigator.userAgent,
            referrer: document.referrer || ""
          }
        })
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as any;
        throw new Error(data?.error || "Submission failed");
      }

      track({ name: "apply_submit_success", props: { tier, ab: ab.variant } });
      router.push("/thank-you");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      track({ name: "apply_submit_error", props: { message: err?.message ?? "unknown" } });
      setLoading(false);
    }
  };

  return (
    <BrutCard variant="default">
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={fullName} onChange={setFullName} autoComplete="name" required />
          <Field label="Email" value={email} onChange={setEmail} autoComplete="email" type="email" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone" value={phone} onChange={setPhone} autoComplete="tel" required />
          <Field label="Current occupation" value={occupation} onChange={setOccupation} autoComplete="organization-title" required />
        </div>

        <div>
          <label className="text-sm font-extrabold">Why you want to join</label>
          <textarea
            className="mt-2 w-full rounded-[18px] border-[3px] border-black bg-white p-3 text-sm shadow-[var(--shadow)]"
            rows={4}
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            required
            placeholder="Example: I want a commission-based side business and I can do outreach 3–5 nights/week."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-extrabold">Preferred partnership tier</label>
            <select
              className="mt-2 w-full rounded-[18px] border-[3px] border-black bg-white p-3 text-sm font-bold shadow-[var(--shadow)]"
              value={tier}
              onChange={(e) => setTier(e.target.value as Tier["id"])}
            >
              {tiers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-[18px] border-[3px] border-black bg-[var(--muted)] p-4 shadow-[var(--shadow)]">
            <div className="text-sm font-extrabold">SMS follow-up</div>
            <label className="mt-2 flex items-center gap-3 text-sm font-semibold">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="h-5 w-5"
              />
              Yes, text me next steps
            </label>
            <p className="mt-2 text-xs text-black/70">
              Msg & data rates may apply. You can opt out anytime.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-[18px] border-[3px] border-black bg-[var(--gold)] p-3 text-sm font-bold shadow-[var(--shadow)]">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-5 py-3 text-base font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[var(--shadow)]"
        >
          {loading ? "Submitting…" : "Submit Application"}
        </button>

        <p className="text-xs text-black/60">
          By submitting, you agree to be contacted about the partner program. See <a className="underline underline-offset-4" href="/legal#privacy">Privacy</a>.
        </p>
      </form>
    </BrutCard>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-sm font-extrabold">{label}</label>
      <input
        className="mt-2 w-full rounded-[18px] border-[3px] border-black bg-white p-3 text-sm shadow-[var(--shadow)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        type={type}
        autoComplete={autoComplete}
      />
    </div>
  );
}
