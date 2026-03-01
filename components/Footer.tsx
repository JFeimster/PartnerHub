import Link from "next/link";
import type { SiteConfig } from "@/lib/types";

export default function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t-[3px] border-black bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold">{site.brand.name}</div>
            <p className="mt-2 text-sm text-black/75">{site.brand.positioning}</p>
            <p className="mt-4 text-xs text-black/70">{site.footer.disclaimer}</p>
          </div>

          <div>
            <div className="text-sm font-extrabold">Trust signals</div>
            <ul className="mt-3 space-y-2 text-sm">
              {site.footer.trust.map((t) => (
                <li key={t} className="rounded-[14px] border-[3px] border-black bg-[var(--muted)] px-3 py-2">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-extrabold">Links</div>
            <ul className="mt-3 space-y-2 text-sm">
              {site.legalLinks?.map((l) => (
                <li key={l.href}>
                  <Link className="font-bold underline underline-offset-4" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-xs text-black/70">
                Contact: <a className="underline underline-offset-4" href={`mailto:${site.brand.contactEmail}`}>{site.brand.contactEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t-[3px] border-black pt-6 text-xs text-black/60 md:flex-row">
          <div>© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</div>
          <div className="font-mono">Built SSG-first. Webhook-ready.</div>
        </div>
      </div>
    </footer>
  );
}
