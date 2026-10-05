# Velora — Residential Landscaping Website (DFW)

Static marketing site for **Velora**, a lean residential landscaping startup serving Dallas–Fort Worth, Texas.

## What was built

A self-contained, mobile-first website (HTML/CSS/vanilla JS only — no frameworks or CDNs except Formspree form POST):

| Page | Path | Contents |
|------|------|----------|
| Homepage | `index.html` | Hero, services overview, how-it-works flow, testimonials, DFW service-area section, CTA |
| Services | `services.html` | Detailed copy for mowing, yard cleanups, mulch/flower beds, hedge trimming |
| Quote | `quote.html` | Quote request form with validation, photo upload (up to 5) + preview, Formspree POST, success state |
| About & Contact | `about.html` | Company story, hours, phone, email, service areas (placeholders marked) |

Shared assets:

- `css/styles.css` — design system (forest green `#2D5F3F`, sage `#A8BC9E`, earth brown `#9B8B6D`, off-white `#F7F5F2`, charcoal `#2C2C2C`)
- `js/main.js` — sticky mobile nav, form validation, drag-and-drop photo preview, Formspree AJAX submit + success message

**Voice:** direct CTAs (“Get Quote”). **Brand:** Velora everywhere (no GrowthWorks).

## DFW cities included

Reasonable metro coverage chosen for launch (edit tags on `index.html` and `about.html` as your real footprint changes):

Dallas, Fort Worth, Plano, Arlington, Irving, Frisco, McKinney, Garland, Grand Prairie, Denton, Richardson, Lewisville, Carrollton, Allen, Flower Mound

(Targeted at Collin, Dallas, Denton, and Tarrant counties.)

## Replace placeholders before going live

### 1. Formspree form ID

In `quote.html`, find:

```html
action="https://formspree.io/f/YOUR_FORMSPREE_ID"
```

1. Sign up at [formspree.io](https://formspree.io) and create a form.
2. Paste your real form ID in place of `YOUR_FORMSPREE_ID`.
3. There is an HTML comment above the `<form>` with the same instructions.

Until you replace it, the form will show an on-page error instead of submitting (so you don’t silently POST to a fake endpoint).

### 2. Contact info

Search the site for these sample placeholders and replace them:

| Placeholder | Where |
|-------------|--------|
| `(555) 123-4567 — replace with your phone number` | `about.html`, `quote.html` sidebar, footers |
| `hello@velora.example — replace with your email address` | `about.html`, footers |
| Hours table note (`— replace with your actual hours`) | `about.html` |
| Business address note | `about.html` |

Testimonials on the homepage are also sample launch copy — swap for real reviews when you have them.

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
# Optional simple server (avoids some file:// quirks with fetch)
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

### GitHub Pages

1. Push this `velora/` folder as a repo (or as `/docs` / root of a Pages-enabled branch).
2. Settings → Pages → deploy from branch (root or `/docs`).
3. Site URL will be `https://<user>.github.io/<repo>/`.

### Netlify

1. Drag-and-drop the `velora` folder onto [Netlify Drop](https://app.netlify.com/drop), **or**
2. Connect the Git repo; set publish directory to the folder that contains `index.html` (this folder).
3. No build command needed — pure static files.

After deploy, update Formspree and contact placeholders if you have not already.

## Open decisions / notes

- **Cities list:** 15 common DFW cities (see above); expand or trim to match actual routes.
- **Hours / phone / email:** intentionally fake placeholders with “replace with…” notes.
- **Testimonials:** three sample quotes for layout; not real customer reviews.
- **Hero price card:** illustrative sample ($45 bi-weekly Plano lot) — not a live pricing API.
- **Formspree file uploads:** free Formspree plans may limit attachments; confirm your plan supports multiple image uploads if photos are critical.


## M0 Next.js app

M0 adds a standalone Next.js App Router + TypeScript project under `/app` while keeping the static marketing site at the repository root.

```bash
cd app
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000/tokens` for the brand token demo.

The Supabase values are placeholders only. M0 includes browser/server client stubs and Zod validation, but no pricing engine, quote workflow, database schema, or APIs.

```bash
npm run lint
npm test
npm run build
```

Pull requests run those checks through GitHub Actions.
