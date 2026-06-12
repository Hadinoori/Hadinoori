# hadinoori.ca — v2

Personal site rebuilt on Astro + Vercel + Sveltia CMS.

## Stack

- **Framework**: Astro 4 (static output)
- **Hosting**: Vercel
- **CMS**: Sveltia (git-based, no backend required)
- **Repo**: Private GitHub

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

All content lives in `src/content/`:

- `insights/` — markdown posts (frontmatter-driven)
- `dossier/profile.json` — profile, credentials, competencies, outputs

Content schema is validated at build time via `src/content/config.ts`.
A build will fail with a clear error if a required field is missing or malformed.

### Post status

Every insight has a `status` field:

- `draft` — not rendered, not indexed
- `published` — live on site
- `archived` — hidden from listings but URL remains valid

Use `status: draft` instead of deleting files to preserve history.

## CMS

Dashboard available at `/admin` after connecting your GitHub account.
Sveltia writes directly to the `main` branch.

For draft workflow: create posts with `status: draft` in the CMS.
Set to `published` when ready. Vercel will rebuild automatically.

## Deploy

1. Push repo to GitHub (private)
2. Import into Vercel
3. Add domain `hadinoori.ca` in Vercel settings
4. Update DNS:
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
5. Disable GitHub Pages on old repo

## Before launch

- [ ] Replace placeholder credentials in `src/content/dossier/profile.json`
- [ ] Add real OG image to `public/assets/img/og-image.png` (1200×630)
- [ ] Add favicon to `public/assets/img/favicon.png`
- [ ] Update CMS repo name in `public/admin/config.yml`
- [ ] Verify email address in `src/pages/contact/index.astro`
