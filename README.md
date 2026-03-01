# PartnerHub (Next.js SSG-first)

Partner recruitment funnel for Moonshine Capital’s partner network: calculator, tiers, how-it-works, social proof, FAQ, application form → webhook.

## Tech
- Next.js App Router (SSG-first pages)
- Tailwind (Neo-Brutalist design tokens in `app/globals.css`)
- API route for form submission → webhook (`/api/apply`)

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

---

## Deployment (GitHub → Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import Git Repository**.
3. Framework preset: **Next.js**
4. Set Environment Variables (recommended):
   - `PARTNER_WEBHOOK_URL` = your CRM webhook endpoint (required to forward applications)
   - `EMAIL_WEBHOOK_URL` = optional confirmation email automation webhook
   - `SMS_WEBHOOK_URL` = optional confirmation SMS automation webhook
   - `NEXT_PUBLIC_GA_ID` = optional GA4 measurement ID (analytics is OFF unless this is set)

5. Deploy.

---

## Webhook Contract (what `/api/apply` sends)

JSON payload includes:
- `fullName`, `email`, `phone`, `occupation`, `why`, `tier`, `smsOptIn`
- `utm` (if present)
- `ab.variant` (A/B test variant)
- `meta.userAgent`, `meta.referrer`

You can map these fields directly into your CRM.

---

## SEO + Performance Checklist

- [ ] Replace `data/site.json` → `seo.siteUrl` with the real production domain
- [ ] Replace `public/img/og-partnerhub.png` with a real OG image
- [ ] Replace demo testimonials with real partner stories (and real thumbnails)
- [ ] If you add an explainer video, use:
  - a lightweight embed (YouTube privacy-enhanced / Vimeo)
  - lazy-load below the fold where possible
- [ ] Avoid untruthful earnings claims or false scarcity
- [ ] Verify mobile CTA usability (sticky CTA + header CTA)

---

## Troubleshooting

**Form submits but nothing happens in CRM**
- Confirm `PARTNER_WEBHOOK_URL` is set in Vercel environment variables.
- Check your webhook endpoint accepts `POST` JSON.

**Analytics not recording**
- Set `NEXT_PUBLIC_GA_ID`.
- Confirm ad blockers aren’t blocking GA scripts in your tests.

**Build fails on Vercel**
- Ensure Node 18+ (Vercel default is fine).
- Run `npm run build` locally to reproduce.

---

## Customization Quick Wins

- Change hero headline variants in `components/Hero.tsx`
- Tune calculator commission estimate in `components/EarningsCalculator.tsx`
- Update tiers in `data/tiers.json`
- Update FAQs in `data/faqs.json`
- Update trust strip + comparison bars in `data/stats.json`
