import Section from "@/components/Section";
import BrutCard from "@/components/BrutCard";
import { getSite } from "@/lib/data";

export const metadata = {
  title: "Legal"
};

export default function LegalPage() {
  const site = getSite();

  return (
    <div className="bg-grid">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Section kicker="Fine print" title="Legal" subtitle="Plain-language policies for a conversion funnel. Customize for your business.">
          <div className="space-y-6">
            <BrutCard variant="default">
              <h2 className="text-lg font-extrabold" id="terms">Terms</h2>
              <p className="mt-3 text-sm text-black/80">
                This website provides information about partner opportunities and allows submission of an application.
                All content is provided “as is” without warranties. Participation may be subject to additional agreements.
              </p>
              <p className="mt-3 text-sm text-black/80">
                {site.footer.disclaimer}
              </p>
            </BrutCard>

            <BrutCard variant="default">
              <h2 className="text-lg font-extrabold" id="privacy">Privacy</h2>
              <p className="mt-3 text-sm text-black/80">
                We collect information you submit (name, email, phone, and application details) for recruitment and onboarding.
                We may contact you via email and, if you opt in, SMS. We do not sell personal information.
              </p>
              <p className="mt-3 text-sm text-black/80">
                Data submitted is sent to our CRM via webhook. Configure the webhook URL via environment variables on Vercel.
              </p>
            </BrutCard>

            <BrutCard variant="note">
              <h2 className="text-lg font-extrabold">Compliance note</h2>
              <p className="mt-3 text-sm text-black/80">
                Avoid untruthful earnings claims or false scarcity. If you use limited-spots messaging, ensure it is accurate.
              </p>
            </BrutCard>
          </div>
        </Section>
      </div>
    </div>
  );
}
