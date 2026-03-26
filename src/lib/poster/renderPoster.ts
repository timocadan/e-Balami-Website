import type { PosterLayout, Rect } from './layout';
import type { PhotoTransform } from './photoCrop';
import { computeCoverCrop } from './photoCrop';

type RenderArgs = {
	canvas: HTMLCanvasElement;
	layout: PosterLayout;
	userPhoto: CanvasImageSource | null;
	photoTransform?: PhotoTransform;
	fullName: string;
	debug: boolean;
};

let templateCache: { url: string; img: CanvasImageSource } | null = null;

async function loadImageSource(url: string): Promise<CanvasImageSource> {
	// Prefer fetch + createImageBitmap for consistent decoding and to avoid CORS surprises.
	if ('createImageBitmap' in window) {
		const res = await fetch(url, { cache: 'force-cache' });
		if (!res.ok) throw new Error(`Template not found: ${url}`);
		const blob = await res.blob();
		return await createImageBitmap(blob);
	}

	// Fallback: HTMLImageElement
	const img = new Image();
	img.decoding = 'async';
	img.src = url;
	await new Promise<void>((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = () => reject(new Error(`Template not found: ${url}`));
	});
	return img;
}

function coverCropDraw(
	ctx: CanvasRenderingContext2D,
	img: CanvasImageSource,
	dst: Rect,
	bgColor?: string,
	transform?: PhotoTransform
) {
	const crop = computeCoverCrop(img, dst, transform);
	if (!crop) return;

	if (bgColor) {
		ctx.fillStyle = bgColor;
		ctx.fillRect(dst.x, dst.y, dst.w, dst.h);
	}

	ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, dst.x, dst.y, dst.w, dst.h);
}

function roundRectPath(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
) {
	const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2));
	ctx.beginPath();
	if ('roundRect' in ctx) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(ctx as any).roundRect(x, y, w, h, radius);
		return;
	}
	const rr = radius;
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}

function fitTextToWidth(
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
	startPx: number,
	minPx: number
): number {
	let size = startPx;
	while (size > minPx) {
		// eslint-disable-next-line no-param-reassign
		ctx.font = ctx.font.replace(/\b\d+px\b/, `${size}px`);
		const w = ctx.measureText(text).width;
		if (w <= maxWidth) break;
		size -= 1;
	}
	return size;
}

export async function renderPoster({
	canvas,
	layout,
	userPhoto,
	photoTransform,
	fullName,
	debug
}: RenderArgs) {
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Canvas 2D context not available.');

	// Keep canvas in the required output size.
	if (canvas.width !== layout.output.size) canvas.width = layout.output.size;
	if (canvas.height !== layout.output.size) canvas.height = layout.output.size;

	// Ensure fonts are ready before measuring/drawing text.
	// (document.fonts is widely supported; safe to await when present)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fonts = (document as any).fonts as FontFaceSet | undefined;
	if (fonts?.ready) {
		try {
			await fonts.ready;
		} catch {
			// ignore font readiness errors; fall back to whatever is available
		}
	}

	// Load & cache template
	if (!templateCache || templateCache.url !== layout.template.url) {
		templateCache = { url: layout.template.url, img: await loadImageSource(layout.template.url) };
	}

	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 1) Template background
	ctx.drawImage(templateCache.img, 0, 0, canvas.width, canvas.height);

	// 2) User photo (cover-crop into the photo box)
	if (userPhoto) {
		const style = layout.photoStyle;
		if (!style) {
			coverCropDraw(ctx, userPhoto, layout.photoBox, undefined, photoTransform);
		} else {
			const outer = layout.photoBox;
			const pad = Math.max(0, style.padding);
			const inner: Rect = {
				x: outer.x + pad,
				y: outer.y + pad,
				w: Math.max(0, outer.w - pad * 2),
				h: Math.max(0, outer.h - pad * 2)
			};

			ctx.save();

			// Shadow (subtle lift)
			ctx.shadowColor = style.shadowColor;
			ctx.shadowBlur = style.shadowBlur;
			ctx.shadowOffsetX = style.shadowOffsetX;
			ctx.shadowOffsetY = style.shadowOffsetY;
			ctx.fillStyle = 'rgba(255,255,255,0.0)';
			roundRectPath(ctx, outer.x, outer.y, outer.w, outer.h, style.radius);
			ctx.fill();

			// Border
			ctx.shadowColor = 'transparent';
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			if (style.borderWidth > 0) {
				ctx.lineWidth = style.borderWidth;
				ctx.strokeStyle = style.borderColor;
				roundRectPath(
					ctx,
					outer.x + style.borderWidth / 2,
					outer.y + style.borderWidth / 2,
					outer.w - style.borderWidth,
					outer.h - style.borderWidth,
					style.radius
				);
				ctx.stroke();
			}

			// Clip photo to rounded inner rect.
			roundRectPath(ctx, inner.x, inner.y, inner.w, inner.h, Math.max(0, style.radius - pad));
			ctx.clip();
			coverCropDraw(ctx, userPhoto, inner, undefined, photoTransform);
			ctx.restore();
		}
	}

	// 3) Name into the blank bar
	const name = (fullName || '').trim();
	if (name) {
		const { nameBox, nameStyle } = layout;
		const maxW = Math.max(0, nameBox.w - nameStyle.paddingX * 2);

		ctx.fillStyle = nameStyle.color;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		// Start with configured size; shrink to fit.
		const baseFont = `${nameStyle.fontWeight} ${nameStyle.fontSize}px ${nameStyle.fontFamily}`;
		ctx.font = baseFont;
		const fitted = fitTextToWidth(ctx, name, maxW, nameStyle.fontSize, nameStyle.minFontSize);
		ctx.font = `${nameStyle.fontWeight} ${fitted}px ${nameStyle.fontFamily}`;

		ctx.fillText(name, nameBox.x + nameBox.w / 2, nameBox.y + nameBox.h / 2);
	}

	// Debug overlay (box outlines)
	if (debug) {
		ctx.lineWidth = 4;
		ctx.setLineDash([10, 10]);

		ctx.strokeStyle = 'rgba(255,193,7,0.9)';
		ctx.strokeRect(layout.photoBox.x, layout.photoBox.y, layout.photoBox.w, layout.photoBox.h);

		ctx.strokeStyle = 'rgba(0,200,255,0.9)';
		ctx.strokeRect(layout.nameBox.x, layout.nameBox.y, layout.nameBox.w, layout.nameBox.h);

		ctx.setLineDash([]);
	}

	ctx.restore();
}


