import BrutCard from "@/components/BrutCard";

const steps = [
  { n: "01", title: "Apply", desc: "2-min application" },
  { n: "02", title: "Get Approved", desc: "24–48 hour review" },
  { n: "03", title: "Complete Training", desc: "Free online modules" },
  { n: "04", title: "Start Earning", desc: "Submit first deal, get paid" }
];

export default function HowItWorks() {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div key={s.n} className="relative">
          <BrutCard variant="default">
            <div className="inline-flex rounded-[14px] border-[3px] border-black bg-[var(--gold)] px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)]">
              {s.n}
            </div>
            <div className="mt-4 text-lg font-extrabold">{s.title}</div>
            <div className="mt-1 text-sm text-black/75">{s.desc}</div>
          </BrutCard>
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute right-[-18px] top-1/2 -translate-y-1/2 text-3xl font-extrabold">
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
