import { getSite, getTiers } from "@/lib/data";
import Section from "@/components/Section";
import BrutCard from "@/components/BrutCard";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";
import Link from "next/link";

export const metadata = {
  title: "Apply"
};

export default function ApplyPage() {
  const site = getSite();
  const tiers = getTiers();

  return (
    <div className="bg-grid">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Section
          id="form"
          kicker="2 minutes"
          title="Start Your Application"
          subtitle="Submit once. We’ll review in 24–48 hours and send your next steps."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PartnerApplicationForm tiers={tiers} />
            </div>
            <div className="space-y-6">
              <BrutCard variant="note">
                <h3 className="text-lg font-extrabold">What happens next</h3>
                <ol className="mt-3 space-y-2 text-sm">
                  <li>1) We review your application</li>
                  <li>2) You receive training + assets</li>
                  <li>3) You submit your first deal</li>
                  <li>4) You get paid when it funds</li>
                </ol>
              </BrutCard>

              <BrutCard variant="default">
                <h3 className="text-lg font-extrabold">Want the partner links now?</h3>
                <p className="mt-2 text-sm text-black/75">
                  If you already have access to the partner portal, grab your links here.
                </p>
                <div className="mt-5">
                  <a
                    href={site.ctas.primary.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--gold)] px-4 py-2 text-center font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    {site.ctas.primary.label}
                  </a>
                </div>
              </BrutCard>

              <BrutCard variant="note">
                <h3 id="call" className="text-lg font-extrabold">Schedule a call</h3>
                <p className="mt-2 text-sm text-black/75">
                  Plug in your Calendly link via <span className="font-mono text-xs">data/site.json</span>.
                </p>
                <div className="mt-5">
                  <Link
                    href="/apply#form"
                    className="inline-flex w-full items-center justify-center rounded-[18px] border-[3px] border-black bg-white px-4 py-2 text-center font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    Apply first (recommended)
                  </Link>
                </div>
              </BrutCard>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
