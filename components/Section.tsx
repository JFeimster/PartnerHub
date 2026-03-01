export default function Section({
  id,
  kicker,
  title,
  subtitle,
  children
}: {
  id?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10">
      <div className="mb-6">
        {kicker && (
          <div className="inline-flex rounded-[999px] border-[3px] border-black bg-[var(--gold)] px-3 py-1 text-xs font-extrabold shadow-[var(--shadow)]">
            {kicker}
          </div>
        )}
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-black/75 md:text-base">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
