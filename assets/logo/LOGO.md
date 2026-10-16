# Velora logo — locked Swiss forest

**Locked pick:** Logotouse **Swiss** adapted (`06 Logotouse Swiss`), purple swapped for Velora forest green.

## Status

- Direction locked by Kwaku.
- Wordmark: **Velora** (outlined Outfit Medium in source adaptation).
- Symbol: Swiss-style geometric **cross / plus** mark (two white/light + two forest arms) — **not** a leaf.
- **Commercial Logotouse Pro / Lifetime license still required** before launch / official commercial use of the Logotouse Swiss template. Free Logotouse is view-only.

## Color swap

| Role | Was (Swiss source) | Now (Velora) |
|------|--------------------|--------------|
| Accent | Purple `#7B2DFF` | Forest `#2D5F3F` |
| Press (CTA optional) | — | `#244d33` |
| Light / wordmark on dark | White `#FFFFFF` | White `#FFFFFF` |
| Dark ground (primary / icon) | Black `#0A0A0A` | Black `#0A0A0A` |
| Reversed ground | White | Limestone `#E8DFD0` |
| Reversed dark arm / type | Black / `#555555` | Oak `#1A2E22` / Forest `#2D5F3F` |

## Files

| File | Use |
|------|-----|
| `primary.svg` / `.png` | Dark lockup (black ground, white + forest mark, white wordmark) |
| `primary-transparent.svg` | Same lockup, no ground — over dark / photo |
| `reversed.svg` / `.png` | Light lockup (limestone ground, oak + forest mark, oak wordmark) |
| `reversed-transparent.svg` / `logo-lockup.svg` | Light lockup, no ground — **site nav** → commit as `assets/logo-lockup.svg` |
| `icon.svg` / `favicon.svg` | App / favicon master (black plate, white + forest cross) → commit as `assets/favicon.svg` |
| `favicon-16.png`, `favicon-32.png` | Favicons |
| `icon-180.png` / `apple-touch-icon.png` | Apple touch / app icon |
| `nav-mockup.png` | Floating pill nav preview |

## Clear space & sizes

Same guidance as parent `logo/LOGO.md`: clear space ≈ mark height; favicon 16px OK (cross holds); lockup min ~96px digital.

## Rebuild

```bash
python3 /workspace/velora-design/revamp-bookmark-pack/logo/build_swiss_forest.py
```

Source geometry: `logo/review/adapted/logotouse-final/06-swiss/`  
Source build: `logo/review/adapted/build_adapted.py` (`c06_swiss_adapted`).
