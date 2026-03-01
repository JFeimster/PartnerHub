"use client";

type AB = { variant: "a" | "b" };

function parseQuery(): URLSearchParams | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search);
}

export function getABVariant(): AB {
  if (typeof window === "undefined") return { variant: "a" };

  const qp = parseQuery();
  const forced = (qp?.get("v") || "").toLowerCase();
  if (forced === "a" || forced === "b") {
    localStorage.setItem("ph_ab", forced);
    return { variant: forced };
  }

  const stored = (localStorage.getItem("ph_ab") || "").toLowerCase();
  if (stored === "a" || stored === "b") return { variant: stored };

  const pick = Math.random() < 0.5 ? "a" : "b";
  localStorage.setItem("ph_ab", pick);
  return { variant: pick };
}

export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const qp = parseQuery();
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = qp?.get(k);
    if (v) out[k] = v;
  }

  // Optionally persist
  if (Object.keys(out).length) {
    try {
      document.cookie = `ph_utm=${encodeURIComponent(JSON.stringify(out))}; path=/; max-age=${60 * 60 * 24 * 30}`;
    } catch {}
  }

  return out;
}
