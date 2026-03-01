export type SiteConfig = {
  brand: {
    name: string;
    wordmark: string;
    tagline?: string;
    positioning?: string;
    contactEmail?: string;
    locale?: string;
  };
  style: {
    mode: string;
    colors: Record<string, string>;
  };
  nav: { label: string; href: string }[];
  ctas: {
    primary: { label: string; href: string };
    apply: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    siteUrl: string;
    ogImage: string;
    keywords: string[];
  };
  integrations?: {
    webhookEnvVar?: string;
    calendlyUrl?: string;
    analytics?: {
      provider?: string;
      envVar?: string;
      enabledByDefault?: boolean;
    };
  };
  legalLinks?: { label: string; href: string }[];
  footer: {
    trust: string[];
    disclaimer: string;
  };
};

export type FAQItem = { q: string; a: string };

export type Tier = {
  id: "affiliate" | "iso" | "agency";
  title: string;
  commission: string;
  time: string;
  bestFor: string;
  whatYouDo: string;
  ctaLabel: string;
  featured: boolean;
};

export type Testimonial = {
  name: string;
  location: string;
  monthlyEarnings: string;
  quote: string;
  type: "video" | "written";
  thumbnail: string;
};

export type Stats = {
  trustStrip: string[];
  comparison: { label: string; value: number; note: string }[];
  requirements: {
    qualify: string[];
    disqualifiers: string[];
  };
};
