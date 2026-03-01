import type { Metadata } from "next";
import "./globals.css";
import { getSite } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import AnalyticsProvider from "@/components/AnalyticsProvider";

export function generateMetadata(): Metadata {
  const site = getSite();
  return buildMetadata({
    site,
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    path: "/"
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();

  return (
    <html lang="en">
      <body className="min-h-screen">
        <SkipLink />
        <AnalyticsProvider site={site} />
        <Header site={site} />
        <main id="main" className="min-h-[70vh]">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
