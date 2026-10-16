# Velora ← Fieldhand adaptation

**Template URL:** https://fieldhand.modulify.website/  
**Catalog entry:** https://modulify.ai/dashboard/templates/fieldhand  
**Bookmark pack source:** https://x.com/vullnetademaj/status/2107038389803319663 → modulify.ai/templates  

**License / usage (as stated on Modulify):** Fieldhand is a Modulify cloneable product-site template. Usage is governed by Modulify’s product terms (clone into a Modulify dashboard). This adaptation is an **inspired structural redesign** for Velora’s own static HTML/CSS site — not a clone of Modulify code, assets, or illustration art. Do not redistribute Fieldhand’s proprietary landscape illustration or Modulify branding.

**Type on Fieldhand:** Instrument Sans (display) + Inter (UI). Both are available under **OFL / Google Fonts**; we self-host the variable TTFs.

---

## Kept from Fieldhand (structure & craft)

| Area | What we kept |
|------|----------------|
| **Nav** | Floating, centered **pill nav**; logo left · links center · primary CTA right; soft shadow + frosted white surface |
| **Hero layout** | Centered display headline with a single **green italic accent** word; **full-bleed lawn photo** (nav floats over it); single floating quote card with soft shadow (side chips removed to reduce clutter) |
| **Product UI as hero visual** | Fieldhand’s floating agent/approval cards → Velora’s **flat-rate quote card** + flanking glass chips (Measured / Cadence) |
| **Section hierarchy** | Hero → proof/stats → How it works (numbered steps) calm progression |
| **How it works** | Numbered step cards (01–04) with short titles + body; left-aligned section intro |
| **Type pairing** | Instrument Sans for display · Inter for UI/buttons |
| **Shape language** | High continuous radii (~20–24px cards), **pill CTAs**, soft shadows, hairline borders — no hard 3px rules |
| **Tone** | Calm, trustworthy, low-friction; green primary actions |
| **Motion (spec)** | Soft hover on pills; optional gentle fade-up on sections (see tokens.json) — no aggressive parallax |

## Changed for Velora (brand & conversion)

| Area | What we changed |
|------|-----------------|
| **Palette** | Fieldhand olive `#4A5D0E` / scenic art → Velora **forest `#2D5F3F`**, limestone `#E8DFD0`, oak `#1A2E22`, off-white `#F7F5F2` (+ sage/mist supporting) |
| **Background art** | Removed painterly landscape illustration (Modulify asset) **and** the interim SVG prairie/oaks. Replaced with a **real full-bleed photo** of a professionally striped lawn (`img/hero-lawn.webp`, Andrew Abbott / Geograph, CC BY-SA 2.0) + light scrim for type contrast. See IMAGE-CREDITS.md |
| **Primary CTA** | “Get started” → always **Get Quote** (nav, hero, quote card) |
| **Hero copy** | AI agents → DFW lawn care: “Know the price *before* we mow.” + product flow arrows |
| **Hero product card** | Agent run UI → **Sample flat-rate quote** (Plano, $45/visit, Locked, Example pricing) |
| **Proof strip** | Fieldhand KPI cards → quiet **inline product facts** (no boxed cards, no invented metrics): flat rate locked · satellite measure · no surprise fees |
| **How it works labels** | Build / Run / Monitor → **Request quote → Satellite measure → Flat-rate price → Scheduled service** |
| **App screen** | Fieldhand ops dashboard → customer **Quote ready** (address, price, line items, Approve & schedule) |
| **Glassmorphism** | Kept lightly on side chips + nav only — not everywhere (anti-slop) |
| **DFW** | Eyebrow, Plano sample, DFW crews / coverage language throughout |

## Anti-slop pass notes
- No soft gradient blobs as decoration; hills are flat SVG fills at low opacity.
- No template SaaS icon tiles; steps are text-led.
- Quote card + Get Quote remain the loudest elements; proof strip does not restate $45 as a vanity metric.
- Buttons/inputs use `font-family: inherit`.
- Example pricing labeled on web + app.
- No invented time/ROI metrics in proof (removed “1 min average quote”).
- Hero is full-bleed **real lawn photo** with floating nav + scrim; no SVG trees/waves; quote card only (no side chips).

