# 12 — Asset requirements

## Current state

The shipped build intentionally uses **no photography**. Every visual is CSS, SVG or WebGL, so the page is fast and coherent without stock imagery. The project plates are abstract "field records", not fake photos of jobs that were not shot.

What is still needed: real photography of the team, plant rooms and completed sites. The layouts already reserve the geometry; swapping in images must not change layout.

## Photography shot list

| ID | Subject | Crop | Min resolution | Use |
| --- | --- | --- | --- | --- |
| A01 | Technician on a rooftop plant deck, blue hour, cyan work light | 16:10 + 4:5 | 3200×2000 | About / hero fallback poster |
| A02 | Two engineers commissioning an AHU, side light, no posed smiles | 16:10 | 3200×2000 | About |
| A03 | Cold-room interior, frost on coil, door ajar with light spill | 16:10 + 4:5 | 3200×2000 | Cold rooms service / project |
| A04 | Condenser fans in motion, long exposure, heat haze | 3:2 | 3000×2000 | Technology / project |
| A05 | Commercial ceiling cassette install, clean cable tray detail | 4:5 | 2400×3000 | Services |
| A06 | Restaurant kitchen cold room at service, warm/cool contrast | 3:2 | 3000×2000 | Refrigeration |
| A07 | Van interior, parts drawers labelled, shallow depth | 4:5 | 2400×3000 | Trust / process |
| A08 | Sandton office floor, occupied desks, diffusers in ceiling | 16:10 | 3200×2000 | Case study |
| A09 | Before/after pair: corroded coil → clean coil, identical angle | 1:1 each | 2000×2000 | Projects |
| A10 | Team portrait, workshop, natural light, neutral clothing | 3:2 | 3600×2400 | About / footer |

### Art direction

- Cool grade: shadows toward `#061018`, highlights neutral, cyan bounce only where motivated by sky or screen.
- Desaturate 10–15%; avoid orange/teal cliché.
- Real environments, real wear. No stock handshakes, no lab coats, no fake smiles to camera.
- Condensation, frost, airflow and copper are the texture language.
- No visible competitor branding unless cleared; blur logos on equipment when needed.

## Delivery formats

| Type | Spec |
| --- | --- |
| Stills | AVIF + WebP, fallback JPEG; sRGB; 70–80 quality; strip EXIF |
| Sizes | 640 / 1024 / 1600 / 2400 wide; `srcset` + `sizes` |
| Hero/LCP | ≤180kB at 1600w, preload only if it becomes the LCP element |
| Aspect | Never crop subject with `object-fit` alone; supply both 16:10 and 4:5 |
| Video (optional) | 1080p H.264 + WebM, ≤8s loop, ≤3MB, muted, `playsinline`, poster frame |
| OG | 1200×630 PNG/JPG, ≤300kB, safe text area 80px inset |
| Favicon | SVG primary; 32/180/512 PNG fallbacks |

## Typography

- Sora 200/300/400/500 and JetBrains Mono 400/500.
- Currently loaded from Google Fonts. Production recommendation: self-host WOFF2 subsets (latin + latin-ext), preload the two files used above the fold, keep `font-display: swap`, and add a metric-compatible fallback stack to protect CLS.

## Icons and graphics

- Icons are inline SVG from `Icons.tsx`: 16px grid, 1.2–1.25px stroke, round caps.
- Brand mark is a custom hexagon/snowflake SVG; no raster logo needed.
- Technical plates (About, Technology, ServiceArt) are authored SVG with CSS motion; they need no assets.
- Add a downloadable brand sheet only if the client requests one.

## 3D / WebGL

No external models, HDRIs or textures. All noise is procedural GLSL. This keeps the payload small and avoids licensing. If a product model is added later, use compressed glTF (Draco/meshopt, ≤2MB) and a poster fallback.

## Naming and metadata

```
tc-[subject]-[crop]-[width].avif      tc-coldroom-16x10-1600.avif
tc-[subject]-[crop]-[width].webp
```

Alt text describes the engineering, not the composition: "Technician measuring refrigerant pressure at a rooftop condensing unit in Randburg", not "smiling man with gauges". Decorative images use empty alt; project images name the site and system.

## Permissions

- Written client consent for every identifiable site, staff member or vehicle.
- No street addresses or security-sensitive plant details in captions.
- Model releases for team portraits.
- Review quotes must stay attributable and verifiable; link to the source.

## Replacement checklist

1. Drop files into `public/media/` with the naming scheme.
2. Add `<picture>` with AVIF/WebP/JPEG and explicit width/height.
3. Keep the existing card aspect and gradient as the loading poster.
4. Update `alt`, caption and project data in `src/content/site.ts`.
5. Re-run `npm run build`; check LCP and CLS on mobile.
