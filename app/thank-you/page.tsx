import Link from "next/link";
import BrutCard from "@/components/BrutCard";
import Section from "@/components/Section";
import { getSite } from "@/lib/data";

export const metadata = {
  title: "Thank You"
};

export default function ThankYouPage() {
  const site = getSite();

  return (
    <div className="bg-grid">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Section kicker="Submitted" title="Application Received" subtitle="Check your inbox for confirmation and next steps.">
          <BrutCard variant="default">
            <h2 className="text-xl font-extrabold">What to do now</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Watch for an approval email within 24–48 hours.</li>
              <li>• If you opted into SMS, keep your phone nearby.</li>
              <li>• Start thinking about your first 10 prospects.</li>
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-white px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Back to Home
              </Link>
              <a
                href={site.ctas.primary.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                {site.ctas.primary.label}
              </a>
            </div>

            <p className="mt-6 text-xs text-black/70">
              If you don’t see an email, check spam/promotions. For help: {site.brand.contactEmail}
            </p>
          </BrutCard>
        </Section>
      </div>
    </div>
  );
}
