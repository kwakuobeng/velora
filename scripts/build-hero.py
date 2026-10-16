"""Rebuild the Pexels 280222 hero from the committed original (Pillow required)."""
from io import BytesIO
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(root / 'img/hero-lawn-original.jpg').convert('RGB')
width, height = source.size
crop = source.crop((0, round(height * .10), width, round(height * .92)))
for size, name in [(2400, 'hero-lawn.webp'), (1200, 'hero-lawn-1200.webp')]:
    image = crop.resize((size, round(crop.height * size / crop.width)), Image.Resampling.LANCZOS)
    low, high = 10, 85
    best = None
    while low <= high:
        quality = (low + high) // 2
        buffer = BytesIO()
        image.save(buffer, 'WEBP', quality=quality, method=6)
        data = buffer.getvalue()
        if len(data) <= 380000:
            best = data
            low = quality + 1
        else:
            high = quality - 1
    if best is None:
        raise RuntimeError(f'{name} could not meet the 380,000 byte budget')
    (root / 'img' / name).write_bytes(best)
    print(f'{name}: {image.width}×{image.height}, {len(best):,} bytes')
