### Dhalinyaro Poster Generator — Technical Documentation

## Purpose
This feature generates a **1080×1080** poster by compositing:
- a **fixed template background** (pixel-identical)
- a user-uploaded **photo** (cover-cropped into a fixed region)
- a user **full name** (auto-fit text rendered into a fixed region)

The output is rendered via the **Canvas 2D API** for deterministic, crisp exports.

## Live Route
- **Route**: `/dhalinyaro`
- **Page file**: `src/routes/dhalinyaro/+page.svelte`

## Key Files (where things live)
- **UI / state / download**: `src/lib/components/poster/PosterGenerator.svelte`
- **Canvas renderer (draw order)**: `src/lib/poster/renderPoster.ts`
- **Template URL + coordinates + typography**: `src/lib/poster/layout.ts`
- **Crop math + optional pan/zoom transform**: `src/lib/poster/photoCrop.ts`
- **Template asset**: `static/dhalinyaro/template.jpg`

## How Rendering Works (high level)
Rendering is done by `renderPoster()` and always targets an export canvas sized to the layout output.

- **Output size**: `layout.output.size` (currently 1080)
- **Draw order**:
  - Draw template background
  - Draw user photo in `layout.photoBox`
  - Draw user name in `layout.nameBox`
  - (Optional) debug overlay rectangles for tuning

## Template Asset Requirements
Place your final poster background image under:
- `static/dhalinyaro/template.jpg`

Then ensure `layout.template.url` matches:
- `/dhalinyaro/template.jpg`

Notes:
- Use the exact template image you want exported (no extra UI overlays).
- Best results if the template is **already 1080×1080**.

## Coordinates & Layout Tuning
All positioning is controlled via `src/lib/poster/layout.ts`:
- `photoBox: { x, y, w, h }`
- `nameBox: { x, y, w, h }`
- `nameStyle`: font + sizing + padding rules

Use the **Debug overlay** toggle on `/dhalinyaro` to see outlines for:
- the photo box (yellow dashed)
- the name box (cyan dashed)

### Current tuned values (for `static/dhalinyaro/template.jpg`)
These are the live defaults in `layout.ts` and may change if the template changes:
- `output.size`: 1080
- `photoBox`: `{ x: 224, y: 360, w: 260, h: 330 }` (portrait)
- `photoStyle`:
  - rounded frame + border + shadow (used because this template has no built-in photo frame)
  - orange border matches the template accent: `#ECAA49`
- `nameBox`: `{ x: 552, y: 668, w: 290, h: 48 }` (aligned to the right-side text block)
- `nameStyle`: white, very bold, auto-fit to width

If you swap the template image, expect to do a one-time coordinate tune.

## Photo Cropping (Cover Crop)
The photo is drawn using a “cover” crop:
- the image is scaled so it fully covers the destination rectangle
- overflow is cropped
- default crop is centered

This is implemented in:
- `src/lib/poster/photoCrop.ts` → `computeCoverCrop()`

### Optional Pan/Zoom Transform
Users can refine framing using:
- `zoom` (>= 1)
- `panX`, `panY` in range `[-1, 1]`

Those values are passed into `renderPoster()` as `photoTransform` and affect both preview and export.

## “Adjust photo” Modal (Pan/Zoom UI)
The adjust modal is implemented in `PosterGenerator.svelte`.

Behavior:
- After selecting a photo, the crop modal opens automatically (crop-first UX).
- Users drag to pan and use a slider to zoom.
- “Save” persists the transform to the main render.
- “Reset” resets zoom/pan to defaults.

Important: the modal uses the **same crop math** (`computeCoverCrop`) as the final renderer, so what the user sees is what is exported.

## Text Rendering (Auto-fit)
The name rendering:
- uses `ctx.measureText` to check width
- starts at `nameStyle.fontSize`
- decreases size by 1px until it fits within:
  - `nameBox.w - paddingX*2`
- clamps to `nameStyle.minFontSize`

Implementation:
- `src/lib/poster/renderPoster.ts` → `fitTextToWidth()`

## Export / Download
Download always exports from the same 1080×1080 canvas:
- PNG (default): best for crisp text
- JPG (optional): smaller, adjustable quality

Implementation:
- `PosterGenerator.svelte` calls `canvas.toBlob()` and triggers a download.

## Local Development
From the project root:

```bash
npm install
npm run dev
```

Then open:
- `http://localhost:5173/dhalinyaro` (port may differ; check the terminal output)

## Deployment (Vercel)
This project uses SvelteKit and is deployed on Vercel for `ebalami.com`.

Typical Vercel build settings:
- **Build command**: `npm run build`
- **Install command**: `npm install` (or `npm ci`)

If adding a new domain or redirect, manage it in the Vercel project settings.

## Troubleshooting
### “Template not found”
- Confirm the file exists at `static/dhalinyaro/template.jpg`
- Confirm `layout.template.url` is `/dhalinyaro/template.jpg`

### Photo looks “wrong size” or overlaps design
- Toggle **Debug overlay**
- Adjust `photoBox` coordinates in `layout.ts`

### Name is not aligned or overflows
- Toggle **Debug overlay**
- Adjust `nameBox` and/or:
  - `nameStyle.fontSize`
  - `nameStyle.minFontSize`
  - `nameStyle.paddingX`

### Image quality issues on export
- Prefer PNG
- Avoid extremely large input images; the app clamps decode to reduce memory usage

## Extending to New Templates
To add another poster template:
- Add the new template image under `static/<new-route>/template.jpg`
- Create a new layout constant (copy `posterLayout`) in a new file or add variants
- Create a new route `src/routes/<new-route>/+page.svelte` rendering `PosterGenerator` with the new layout

Recommended: keep each template’s layout constants isolated to avoid accidental edits.


