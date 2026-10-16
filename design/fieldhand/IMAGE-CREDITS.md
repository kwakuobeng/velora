# Image credits — Fieldhand / Velora hero

## Chosen hero photo

| Field | Value |
|-------|-------|
| **File (repo)** | `img/hero-lawn.webp` (2400×1307, 379,792 bytes) · `img/hero-lawn-1200.webp` (1200×653, 246,810 bytes) |
| **Source page** | https://www.pexels.com/photo/white-and-gray-wooden-house-near-grass-field-and-trees-280222/ |
| **Direct download** | https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg |
| **Fallback CDN** | https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?cs=srgb&dl=pexels-pixabay-280222.jpg&fm=jpg |
| **Title** | White and gray wooden house near grass field and trees |
| **Photographer** | Curtis Adams |
| **Original size** | 4288×2848 |
| **License** | [Pexels License](https://www.pexels.com/license/) — free commercial use; **no attribution required** (credited anyway) |
| **Why chosen** | Sunny blue sky, American suburban front yard, bold diagonal mow stripes dominating the frame; no people, no water, no house numbers; ≥2400w native |

**Credit (courtesy, not required):**  
Photo: Curtis Adams / Pexels · https://www.pexels.com/photo/white-and-gray-wooden-house-near-grass-field-and-trees-280222/

### Crop / export
- Crop original `(0, 10% height) → (full width, 92% height)` so the house sits in the upper third and the striped lawn fills the lower ~⅔. Left-side tree shadow retained.
- Resize to 2400w → WebP (~380 KB target, size-capped). Mobile: 1200w WebP.
- CSS `background-position: center 42%` (desktop) / `center 48%` (mobile).
- Alt / aria-label: “Sunny suburban front yard with a white house and a professionally striped green lawn”

## Prior candidates (not used)
An earlier Geograph CC BY-SA candidate was rejected and is not included in this site.

No AI-generated images were used.

Rebuild from the committed original with `python scripts/build-hero.py` (Pillow required). The 2400w export is capped at 380,000 bytes.
