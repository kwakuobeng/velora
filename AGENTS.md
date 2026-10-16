# Velora — Codex project guide

## Project
Velora is a static four-page residential landscaping marketing site for Dallas–Fort Worth.

Continue work on:
- Repository: `kwakuobeng/velora`
- Branch: `fieldhand-site-revamp`
- Base branch: `main`

Do not move this work into the Next.js `/app` product scaffold or mix it with M1 pricing-engine work.

## Current site
Pages: `index.html`, `services.html`, `quote.html`, `about.html`.

Shared assets: `css/styles.css`, `js/main.js`, `assets/logo-lockup.svg`, `assets/favicon.svg`.

## Design direction
Restrained/editorial: forest #2D5F3F, limestone #E8DFD0, off-white #F7F5F2, dark oak #1A2E22. Instrument Sans display, Inter UI/body. Pill navigation/CTAs, large photography, generous whitespace, soft cards and subtle hairlines. Avoid generic SaaS gradients, excessive icons, or busy card grids.

Homepage hierarchy:
1. Hero: “Know the price before we mow.”
2. Floating sample quote card
3. Proof strip
4. Four core services
5. Four-step process
6. DFW coverage
7. CTA/footer

## Product/content constraints
Preserve unless explicitly changed:
- DFW positioning and existing city list
- Placeholder phone: `(555) 123-4567`
- Placeholder email: `hello@velora.example`
- Existing hours
- Formspree action: `https://formspree.io/f/YOUR_FORMSPREE_ID`
- Existing quote-form field names and JS behavior
- Photo upload limit: 5 images, 5 MB each
- Static HTML/CSS/vanilla JS architecture

Do not invent production contact details or a Formspree ID.

## Remaining hero-image task
Requested source: Pexels `pexels-280222.jpg` (Curtis Adams / Pexels).

The previous environment could not download the required CDN image. If the source is available locally, create desktop and mobile WebP hero crops under `img/`, then update hero CSS for responsive crops while retaining the accessible hero description and photo attribution.

Do not substitute a different stock image unless explicitly approved.

## Validation before PR
Check all four pages and internal links, logo/favicon references, desktop/mobile layouts, quote validation/photo preview, unchanged Formspree placeholder, and that no Next.js/app or unrelated files changed.

Then open one PR from `fieldhand-site-revamp` into `main`, summarizing the redesign and noting intentionally unresolved placeholder values.
