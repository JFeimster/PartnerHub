import fs from "node:fs";
import path from "node:path";
import type { FAQItem, SiteConfig, Stats, Testimonial, Tier } from "@/lib/types";

function readJson<T>(relPath: string): T {
  const p = path.join(process.cwd(), relPath);
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw) as T;
}

let _site: SiteConfig | null = null;
export function getSite(): SiteConfig {
  if (_site) return _site;
  _site = readJson<SiteConfig>("data/site.json");
  return _site;
}

let _faqs: FAQItem[] | null = null;
export function getFaqs(): FAQItem[] {
  if (_faqs) return _faqs;
  _faqs = readJson<FAQItem[]>("data/faqs.json");
  return _faqs;
}

let _testimonials: Testimonial[] | null = null;
export function getTestimonials(): Testimonial[] {
  if (_testimonials) return _testimonials;
  _testimonials = readJson<Testimonial[]>("data/testimonials.json");
  return _testimonials;
}

let _tiers: Tier[] | null = null;
export function getTiers(): Tier[] {
  if (_tiers) return _tiers;
  _tiers = readJson<Tier[]>("data/tiers.json");
  return _tiers;
}

let _stats: Stats | null = null;
export function getStats(): Stats {
  if (_stats) return _stats;
  _stats = readJson<Stats>("data/stats.json");
  return _stats;
}
