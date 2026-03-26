import type { Rect } from './layout';

export type PhotoTransform = {
	/**
	 * Zoom factor applied on top of the default "cover" crop.
	 * 1 = default cover crop; >1 zooms in (crops tighter).
	 */
	zoom: number;
	/**
	 * Horizontal pan within the crop range: -1 (left) .. 0 (center) .. 1 (right)
	 */
	panX: number;
	/**
	 * Vertical pan within the crop range: -1 (top) .. 0 (center) .. 1 (bottom)
	 */
	panY: number;
};

function clamp(n: number, min: number, max: number) {
	return Math.min(max, Math.max(min, n));
}

export function getImageSize(img: CanvasImageSource): { w: number; h: number } {
	const w = (img as ImageBitmap).width ?? (img as HTMLImageElement).naturalWidth ?? 0;
	const h = (img as ImageBitmap).height ?? (img as HTMLImageElement).naturalHeight ?? 0;
	return { w, h };
}

export function computeCoverCrop(
	img: CanvasImageSource,
	dst: Pick<Rect, 'w' | 'h'>,
	transform?: Partial<PhotoTransform>
): {
	sx: number;
	sy: number;
	sw: number;
	sh: number;
	// Useful for UI mapping
	centerSx: number;
	centerSy: number;
	rangeX: number;
	rangeY: number;
	iw: number;
	ih: number;
} | null {
	const { w: iw, h: ih } = getImageSize(img);
	if (!iw || !ih) return null;

	const zoom = clamp(transform?.zoom ?? 1, 1, 6);
	const panX = clamp(transform?.panX ?? 0, -1, 1);
	const panY = clamp(transform?.panY ?? 0, -1, 1);

	const scale = Math.max(dst.w / iw, dst.h / ih);
	let sw = dst.w / scale;
	let sh = dst.h / scale;

	// Zoom in by cropping a smaller source rect.
	sw = clamp(sw / zoom, 1, iw);
	sh = clamp(sh / zoom, 1, ih);

	const maxSx = Math.max(0, iw - sw);
	const maxSy = Math.max(0, ih - sh);

	const centerSx = maxSx / 2;
	const centerSy = maxSy / 2;
	const rangeX = maxSx / 2;
	const rangeY = maxSy / 2;

	const sx = clamp(centerSx + panX * rangeX, 0, maxSx);
	const sy = clamp(centerSy + panY * rangeY, 0, maxSy);

	return { sx, sy, sw, sh, centerSx, centerSy, rangeX, rangeY, iw, ih };
}


