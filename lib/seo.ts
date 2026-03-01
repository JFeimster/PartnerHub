import type { Metadata } from "next";
import type { SiteConfig } from "@/lib/types";

function joinUrl(base: string, path: string) {
  const b = base.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

export function buildMetadata(args: {
  site: SiteConfig;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { site, title, description, path } = args;
  const url = joinUrl(site.seo.siteUrl, path);
  const ogImage = joinUrl(site.seo.siteUrl, site.seo.ogImage);

  return {
    title,
    description,
    keywords: site.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brand.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    metadataBase: new URL(site.seo.siteUrl)
  };
}
