import BrutCard from "@/components/BrutCard";

export default function Requirements({
  requirements
}: {
  requirements: { qualify: string[]; disqualifiers: string[] };
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <BrutCard variant="default">
        <h3 className="text-lg font-extrabold">✅ What We’re Looking For</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {requirements.qualify.map((t) => (
            <li key={t} className="rounded-[14px] border-[3px] border-black bg-white px-3 py-2 font-semibold">
              {t}
            </li>
          ))}
        </ul>
      </BrutCard>

      <BrutCard variant="default">
        <h3 className="text-lg font-extrabold">❌ Disqualifiers</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {requirements.disqualifiers.map((t) => (
            <li key={t} className="rounded-[14px] border-[3px] border-black bg-[var(--muted)] px-3 py-2 font-semibold">
              {t}
            </li>
          ))}
        </ul>
      </BrutCard>
    </div>
  );
}
