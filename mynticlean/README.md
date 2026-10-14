# Mynticlean

Standalone photo-free static marketing app for mynticlean.com. Original markup inspired by the requested Fieldhand direction. No Velora code or assets. Requires Node 20+; no packages to install.

```sh
cd mynticlean
npm run dev       # http://localhost:3000
npm run check     # JavaScript syntax
npm run build     # generates dist/
npm start         # serves dist/ after building
```

Deploy only `mynticlean/dist`, or set a separate hosting project root to `mynticlean`. Do not change existing Velora hosting. Set PORT if 3000 is occupied.

## Logos and typography

`public/favicon.svg` is the supplied concept 19 Chicago Wand SVG, with a valid SVG xmlns. `components/LogoMark.js` exports reusable LogoMark DOM elements sourcing that same SVG. Wordmarks are live Manrope 700 text with -0.02em tracking. Manrope loads from Google Fonts with system sans fallback. No paid logo asset is needed.

## Placeholder boundaries

All rates are **EXAMPLE PRICING — NOT LIVE RATES**. The standard-clean fixture is `(85 + bedrooms × 20 + bathrooms × 20) × frequency factor`, rounded to dollars. Factors: once 1, weekly .8, biweekly .9, monthly .95. These are fixture numbers, not actual rates. Proposed service inclusions and recurring options require business confirmation. Only Dallas–Fort Worth is listed.

Book a Clean leads to the quote widget. Get Quote opens an honest example summary, with an optional mailto enquiry. No scheduling backend, payment, reservation, or form submission exists. `hello@mynticlean.com` is a placeholder until activated.

Trust cards are explicitly labeled placeholders: no reviews, ratings, invented statistics, insurance claims or photographs. Native dialogs provide focus containment, Escape dismissal, close controls and focus restoration. Motion respects prefers-reduced-motion. The hero sheen uses CSS shapes and a passive scroll handler.

Before launch, confirm scope, pricing, working email, business policies and booking integration. No live deployment is part of this scaffold.

## Viewing the actual webpage

A GitHub PR or GitHub file link displays source, not a hosted webpage. For a rendered site, run `npm run dev`, or run `npm run build` and open `dist/index.html` directly in a browser. The built HTML embeds all scripts, styling, and logo assets; no local server or JavaScript module loading is required. An optional Google Fonts request can fall back to system fonts. Source `index.html` also uses classic deferred scripts so opening it in place works with its adjacent assets. Logo images appear even before JavaScript runs.
