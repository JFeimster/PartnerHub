import { getFaqs } from "@/lib/data";
import Section from "@/components/Section";
import FAQAccordion from "@/components/FAQAccordion";
import BrutCard from "@/components/BrutCard";
import Link from "next/link";

export const metadata = {
  title: "FAQ"
};

export default function FAQPage() {
  const faqs = getFaqs();

  return (
    <div className="bg-grid">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Section kicker="Everything you’re thinking" title="Frequently Asked Questions" subtitle="If you’re stuck, apply—then ask on the follow-up.">
          <BrutCard variant="default">
            <FAQAccordion items={faqs} defaultOpenIndex={0} />
          </BrutCard>
          <div className="mt-8">
            <Link
              href="/apply#form"
              className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Start Application
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
}
