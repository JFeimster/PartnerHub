import Link from "next/link";
import { getFaqs, getSite, getStats, getTestimonials, getTiers } from "@/lib/data";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import BrutCard from "@/components/BrutCard";
import EarningsCalculator from "@/components/EarningsCalculator";
import TiersGrid from "@/components/TiersGrid";
import HowItWorks from "@/components/HowItWorks";
import ComparisonBars from "@/components/ComparisonBars";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Requirements from "@/components/Requirements";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import ExitIntent from "@/components/ExitIntent";
import ChatWidget from "@/components/ChatWidget";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  const site = getSite();
  const tiers = getTiers();
  const stats = getStats();
  const faqs = getFaqs();
  const testimonials = getTestimonials();

  return (
    <div className="bg-grid">
      <Hero site={site} trustStrip={stats.trustStrip} />

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <Section id="calculator" kicker="Money math" title="Calculate Your Earning Potential" subtitle="Model realistic volume and deal sizes. This is a planning tool—not a promise.">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <EarningsCalculator />
            </div>
            <BrutCard variant="note">
              <h3 className="text-lg font-extrabold">Fast path (the boring truth)</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• Qualify quickly (scripts included)</li>
                <li>• Submit clean applications</li>
                <li>• Follow up daily</li>
                <li>• Repeat. Scale what works.</li>
              </ul>
              <div className="mt-5">
                <Link
                  href="/apply#form"
                  className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  Get Started for Free
                </Link>
              </div>
            </BrutCard>
          </div>
        </Section>

        <Section id="tiers" kicker="Pick your lane" title="3-Tier Partnership Model" subtitle="Start where you are. Upgrade later. Your goal is repeatable deal flow.">
          <TiersGrid tiers={tiers} />
        </Section>

        <Section id="how" kicker="No mystery" title="How It Works" subtitle="A simple 4-step path from application to first payout.">
          <HowItWorks />
        </Section>

        <Section id="compare" kicker="Reality check" title="Compare Your Earning Potential" subtitle="A quick visual comparing typical ranges. Your results depend on skill, consistency, and market.">
          <ComparisonBars items={stats.comparison} />
          <div className="mt-6">
            <Link
              href="/apply#form"
              className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--gold)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              I Want Unlimited Earning Potential
            </Link>
          </div>
        </Section>

        <Section id="stories" kicker="Proof" title="Success Stories" subtitle="Short stories from partners who built a pipeline. (Demo content.)">
          <TestimonialsCarousel items={testimonials} />
        </Section>

        <Section id="qualify" kicker="Fit check" title="Do You Qualify?" subtitle="We want action-takers. If that’s you, you’ll do fine.">
          <Requirements requirements={stats.requirements} />
        </Section>

        <Section id="explainer" kicker="2 minutes" title="Watch the Explainer" subtitle="A lightweight placeholder that you can swap to Vimeo/YouTube later.">
          <BrutCard variant="media">
            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-extrabold">What you’ll learn</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>• Which tier matches you</li>
                  <li>• How payouts typically work</li>
                  <li>• How to find your first clients</li>
                  <li>• What training covers</li>
                </ul>
                <p className="mt-4 text-sm text-black/75">
                  Replace this embed with your real video link when ready.
                </p>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-[18px] border-[3px] border-black bg-[var(--muted)] shadow-[var(--shadow)]">
                <div className="flex h-full w-full items-center justify-center p-6 text-center">
                  <div>
                    <div className="text-sm font-extrabold">Video Placeholder</div>
                    <div className="mt-2 text-xs text-black/70">Drop in a Vimeo/YouTube embed later.</div>
                  </div>
                </div>
              </div>
            </div>
          </BrutCard>
        </Section>

        <Section id="faqs" kicker="Objections handled" title="FAQ" subtitle="Short answers. If you’re serious, apply and we’ll follow up.">
          <FAQAccordion items={faqs} />
          <div className="mt-7">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-white px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              View all FAQs
            </Link>
          </div>
        </Section>

        <Section id="preview" kicker="No friction" title="Your Application Takes 2 Minutes" subtitle="Preview the fields. Then submit once.">
          <BrutCard variant="default">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-extrabold">Form fields</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>• Full name</li>
                  <li>• Email</li>
                  <li>• Phone</li>
                  <li>• Current occupation</li>
                  <li>• Why you want to join</li>
                  <li>• Preferred partnership tier</li>
                </ul>
                <p className="mt-4 text-sm text-black/70">We’ll confirm next steps by email (and optional SMS).</p>
              </div>
              <div className="rounded-[18px] border-[3px] border-black bg-[var(--muted)] p-5 shadow-[var(--shadow)]">
                <div className="grid gap-3">
                  {["Full name", "Email", "Phone", "Current occupation", "Why you want to join"].map((label) => (
                    <div key={label} className="rounded-[14px] border-[3px] border-black bg-white px-4 py-3 text-sm font-semibold">
                      {label}
                    </div>
                  ))}
                  <div className="rounded-[14px] border-[3px] border-black bg-white px-4 py-3 text-sm font-semibold">
                    Preferred tier (Affiliate / ISO / Agency Builder)
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/apply#form"
                className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-4 py-2 font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Start Application Now
              </Link>
            </div>
          </BrutCard>
        </Section>

        <CTASection
          title="Your Financial Freedom Starts Today"
          subtitle="Join hundreds building a repeatable pipeline and earning on their terms. (Demo content.)"
          primary={{ label: "Apply Now (Free)", href: "/apply#form" }}
          secondary={{ label: "Schedule Call with Recruiter", href: "/apply#call" }}
          note="Limited spots messaging should only be used if truthful."
        />
      </div>

      <StickyCTA label="Start Application" href="/apply#form" />
      <ExitIntent />
      <ChatWidget />
    </div>
  );
}
