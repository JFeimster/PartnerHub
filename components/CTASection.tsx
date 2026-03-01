import Link from "next/link";
import BrutCard from "@/components/BrutCard";

export default function CTASection({
  title,
  subtitle,
  primary,
  secondary,
  note
}: {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
}) {
  return (
    <section className="py-10">
      <BrutCard variant="featured">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold">{title}</h2>
            <p className="mt-2 text-sm text-black/75 md:text-base">{subtitle}</p>
            {note && (
              <p className="mt-3 text-xs text-black/60">{note}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-[var(--green)] px-5 py-3 text-center font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-black bg-white px-5 py-3 text-center font-extrabold shadow-[var(--shadow)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </BrutCard>
    </section>
  );
}
