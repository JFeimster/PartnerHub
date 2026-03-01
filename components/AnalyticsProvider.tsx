"use client";

import Script from "next/script";
import type { SiteConfig } from "@/lib/types";

export default function AnalyticsProvider({ site }: { site: SiteConfig }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // OFF by default unless you set NEXT_PUBLIC_GA_ID
  if (!gaId) return null;

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script id="ga4">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
