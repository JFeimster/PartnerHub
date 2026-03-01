export type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean | null | undefined>;
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  const payload = {
    event: event.name,
    ...event.props
  };

  // GA4 (optional)
  if (window.gtag) {
    window.gtag("event", event.name, event.props || {});
    return;
  }

  // Dev fallback
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[track]", payload);
  }
}
