<script lang="ts">
	import { onMount } from 'svelte';
	import { renderPoster } from '$lib/poster/renderPoster';
	import { posterLayout, type PosterLayout } from '$lib/poster/layout';
	import type { PhotoTransform } from '$lib/poster/photoCrop';
	import { computeCoverCrop } from '$lib/poster/photoCrop';

	type OutputFormat = 'png' | 'jpg';

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let adjustCanvasEl = $state<HTMLCanvasElement | null>(null);

	let layout: PosterLayout = posterLayout;
	let fullName = $state('');
	let debug = $state(false);
	let outputFormat: OutputFormat = $state('png');
	let jpgQuality = $state(0.92);

	let templateReady = $state(false);
	let photoReady = $state(false);
	let loadingTemplate = $state(true);
	let errorMsg = $state<string | null>(null);

	let userPhotoSource = $state<CanvasImageSource | null>(null);
	let photoTransform = $state<PhotoTransform>({ zoom: 1, panX: 0, panY: 0 });
	let adjustOpen = $state(false);
	let adjustDraft = $state<PhotoTransform>({ zoom: 1, panX: 0, panY: 0 });
	let adjustDrag = $state<{
		active: boolean;
		startX: number;
		startY: number;
		startPanX: number;
		startPanY: number;
	}>({ active: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 });

	let rafId: number | null = null;
	let adjustRafId: number | null = null;

	function scheduleRender() {
		if (!canvasEl) return;
		if (!templateReady) return;

		if (rafId !== null) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(async () => {
			rafId = null;
			try {
				await renderPoster({
					canvas: canvasEl!,
					layout,
					userPhoto: userPhotoSource,
					photoTransform,
					fullName,
					debug
				});
			} catch (e) {
				errorMsg = e instanceof Error ? e.message : 'Failed to render poster.';
			}
		});
	}

	function clamp(n: number, min: number, max: number) {
		return Math.min(max, Math.max(min, n));
	}

	function scheduleAdjustRender() {
		if (!adjustCanvasEl) return;
		if (!userPhotoSource) return;

		if (adjustRafId !== null) cancelAnimationFrame(adjustRafId);
		adjustRafId = requestAnimationFrame(() => {
			adjustRafId = null;
			const photo = userPhotoSource;
			if (!photo) return;
			const canvas = adjustCanvasEl!;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Box is the entire canvas, but keep the same aspect ratio as the real photo box.
			const boxAspect = layout.photoBox.w / layout.photoBox.h;
			let bw = canvas.width;
			let bh = Math.round(canvas.width / boxAspect);
			if (bh > canvas.height) {
				bh = canvas.height;
				bw = Math.round(canvas.height * boxAspect);
			}
			const bx = Math.round((canvas.width - bw) / 2);
			const by = Math.round((canvas.height - bh) / 2);

			// Backdrop
			ctx.fillStyle = 'rgba(255,255,255,0.04)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Crop preview
			const crop = computeCoverCrop(photo, { w: bw, h: bh }, adjustDraft);
			if (crop) {
				ctx.drawImage(photo, crop.sx, crop.sy, crop.sw, crop.sh, bx, by, bw, bh);
			}

			// Box outline
			ctx.strokeStyle = 'rgba(255,193,7,0.95)';
			ctx.lineWidth = 3;
			ctx.strokeRect(bx + 1.5, by + 1.5, bw - 3, bh - 3);

			ctx.restore();
		});
	}

	function openAdjust() {
		if (!userPhotoSource) return;
		adjustDraft = { ...photoTransform };
		adjustOpen = true;
		// Let modal mount, then render once.
		queueMicrotask(scheduleAdjustRender);
	}

	function closeAdjust(cancelled: boolean) {
		if (!adjustOpen) return;
		if (!cancelled) {
			photoTransform = { ...adjustDraft };
			scheduleRender();
		}
		adjustOpen = false;
		adjustDrag = { ...adjustDrag, active: false };
	}

	function onAdjustPointerDown(e: PointerEvent) {
		if (!adjustCanvasEl) return;
		if (!userPhotoSource) return;
		(adjustCanvasEl as HTMLCanvasElement).setPointerCapture?.(e.pointerId);
		adjustDrag = {
			active: true,
			startX: e.clientX,
			startY: e.clientY,
			startPanX: adjustDraft.panX,
			startPanY: adjustDraft.panY
		};
	}

	function onAdjustPointerMove(e: PointerEvent) {
		if (!adjustDrag.active) return;
		if (!adjustCanvasEl) return;
		const photo = userPhotoSource;
		if (!photo) return;

		const canvas = adjustCanvasEl!;
		const rect = canvas.getBoundingClientRect();

		// Mirror scheduleAdjustRender's box sizing logic to get bw/bh.
		const boxAspect = layout.photoBox.w / layout.photoBox.h;
		let bw = canvas.width;
		let bh = Math.round(canvas.width / boxAspect);
		if (bh > canvas.height) {
			bh = canvas.height;
			bw = Math.round(canvas.height * boxAspect);
		}

		const crop = computeCoverCrop(photo, { w: bw, h: bh }, adjustDraft);
		if (!crop) return;

		const dx = (e.clientX - adjustDrag.startX) * (canvas.width / rect.width);
		const dy = (e.clientY - adjustDrag.startY) * (canvas.height / rect.height);

		// Convert dest-pixel drag to source-pixel movement inside the crop window.
		const dxSrc = (dx / bw) * crop.sw;
		const dySrc = (dy / bh) * crop.sh;

		const nextPanX =
			crop.rangeX > 0 ? adjustDrag.startPanX - dxSrc / crop.rangeX : adjustDraft.panX;
		const nextPanY =
			crop.rangeY > 0 ? adjustDrag.startPanY - dySrc / crop.rangeY : adjustDraft.panY;

		adjustDraft = {
			...adjustDraft,
			panX: clamp(nextPanX, -1, 1),
			panY: clamp(nextPanY, -1, 1)
		};
		scheduleAdjustRender();
	}

	function onAdjustPointerUp(e: PointerEvent) {
		if (!adjustDrag.active) return;
		(adjustCanvasEl as HTMLCanvasElement | null)?.releasePointerCapture?.(e.pointerId);
		adjustDrag = { ...adjustDrag, active: false };
	}

	function onAdjustKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeAdjust(true);
	}

	function getFirstFile(files: FileList | null): File | null {
		if (!files || files.length === 0) return null;
		return files.item(0);
	}

	async function decodeImage(file: File): Promise<CanvasImageSource> {
		// Prefer createImageBitmap when available (faster + less layout jank).
		if ('createImageBitmap' in window) {
			const maxDim = 4096; // mobile safety clamp
			const bmp = await createImageBitmap(file);
			const w = (bmp as ImageBitmap).width;
			const h = (bmp as ImageBitmap).height;
			if (Math.max(w, h) <= maxDim) return bmp;

			// Downscale via an offscreen canvas to reduce memory/export issues.
			const scale = maxDim / Math.max(w, h);
			const tw = Math.round(w * scale);
			const th = Math.round(h * scale);
			const tmp = document.createElement('canvas');
			tmp.width = tw;
			tmp.height = th;
			const tctx = tmp.getContext('2d');
			if (!tctx) return bmp;
			tctx.drawImage(bmp, 0, 0, tw, th);
			bmp.close?.();
			return tmp;
		}

		// Fallback: HTMLImageElement
		const url = URL.createObjectURL(file);
		try {
			const img = new Image();
			img.decoding = 'async';
			img.src = url;
			await new Promise<void>((resolve, reject) => {
				img.onload = () => resolve();
				img.onerror = () => reject(new Error('Failed to decode image.'));
			});
			return img;
		} finally {
			URL.revokeObjectURL(url);
		}
	}

	async function onPhotoChange(e: Event) {
		errorMsg = null;
		const input = e.currentTarget as HTMLInputElement;
		const file = getFirstFile(input.files);
		if (!file) return;

		try {
			photoReady = false;
			userPhotoSource = await decodeImage(file);
			photoTransform = { zoom: 1, panX: 0, panY: 0 };
			photoReady = true;
			scheduleRender();

			// UX: after selecting a photo, immediately show the crop/adjust step first.
			openAdjust();
		} catch (err) {
			errorMsg = err instanceof Error ? err.message : 'Failed to load photo.';
		}
	}

	async function download() {
		if (!canvasEl) return;
		errorMsg = null;

		// Ensure latest render is on canvas before export.
		await renderPoster({
			canvas: canvasEl,
			layout,
			userPhoto: userPhotoSource,
			photoTransform,
			fullName,
			debug: false
		});

		const mime = outputFormat === 'png' ? 'image/png' : 'image/jpeg';
		const quality = outputFormat === 'jpg' ? jpgQuality : undefined;

		const blob: Blob | null = await new Promise((resolve) => {
			canvasEl!.toBlob((b) => resolve(b), mime, quality);
		});
		if (!blob) {
			errorMsg = 'Download failed (no blob).';
			return;
		}

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `sryf-2026-poster.${outputFormat}`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	onMount(async () => {
		errorMsg = null;
		loadingTemplate = true;
		try {
			// First render will load template internally in the renderer.
			await renderPoster({
				canvas: canvasEl!,
				layout,
				userPhoto: null,
				photoTransform,
				fullName,
				debug
			});
			templateReady = true;
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Failed to load template.';
		} finally {
			loadingTemplate = false;
			scheduleRender();
		}
	});

	$effect(() => {
		// Rerender when inputs change
		fullName;
		debug;
		layout;
		userPhotoSource;
		photoTransform;
		if (templateReady) scheduleRender();
	});

	$effect(() => {
		// When the modal opens (or when the canvas/photo becomes available), render the preview once.
		adjustOpen;
		adjustCanvasEl;
		userPhotoSource;
		if (adjustOpen) scheduleAdjustRender();
	});
</script>

<div class="grid gap-6 lg:grid-cols-2">
	<!-- Preview -->
	<div class="order-1 lg:order-2">
		<div class="rounded-2xl border border-white/10 bg-white/5 p-4">
			<div class="flex items-center justify-between gap-3">
				<div class="text-sm font-semibold">Live Preview</div>
				<label class="flex items-center gap-2 text-xs text-white/70">
					<input
						class="h-4 w-4 accent-[var(--color-brand-yellow)]"
						type="checkbox"
						bind:checked={debug}
					/>
					Debug overlay
				</label>
			</div>

			<div class="mt-3">
				<div class="relative w-full overflow-hidden rounded-xl bg-black/30">
					<canvas
						bind:this={canvasEl}
						class="block h-auto w-full"
						style="aspect-ratio: 1 / 1;"
						width={layout.output.size}
						height={layout.output.size}
						></canvas>
					{#if loadingTemplate}
						<div class="absolute inset-0 grid place-items-center text-sm text-white/70">
							Loading template…
						</div>
					{/if}
				</div>
				<p class="mt-2 text-xs text-white/50">
					Download size: {layout.output.size}×{layout.output.size}px
				</p>
			</div>
		</div>
	</div>

	<!-- Controls -->
	<div class="order-2 lg:order-1">
		<div class="rounded-2xl border border-white/10 bg-white/5 p-4">
			<div class="text-sm font-semibold">Your details</div>

			<div class="mt-4 grid gap-4">
				<div class="grid gap-2">
					<label class="text-xs font-semibold text-white/70" for="photo">Upload your photo</label>
					<input
						id="photo"
						class="block w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-white/15"
						type="file"
						accept="image/*"
						onchange={onPhotoChange}
					/>
					<p class="text-xs text-white/50">
						Tip: choose a clear portrait photo. We’ll auto-crop to fit.
					</p>
					<div class="flex items-center gap-2">
						<button
							type="button"
							class="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
							onclick={openAdjust}
							disabled={!photoReady || !userPhotoSource}
						>
							Adjust photo
						</button>
						<button
							type="button"
							class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-semibold text-white/60 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
							onclick={() => {
								photoTransform = { zoom: 1, panX: 0, panY: 0 };
								scheduleRender();
							}}
							disabled={!photoReady || !userPhotoSource}
						>
							Reset crop
						</button>
					</div>
				</div>

				<div class="grid gap-2">
					<label class="text-xs font-semibold text-white/70" for="fullName">Full name</label>
					<input
						id="fullName"
						class="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
						type="text"
						placeholder="Type your full name"
						bind:value={fullName}
						autocomplete="name"
					/>
				</div>

				<div class="grid gap-2">
					<div class="text-xs font-semibold text-white/70">Download format</div>
					<div class="flex flex-wrap items-center gap-3">
						<label class="flex items-center gap-2 text-sm">
							<input
								class="h-4 w-4 accent-[var(--color-brand-yellow)]"
								type="radio"
								name="fmt"
								value="png"
								bind:group={outputFormat}
							/>
							PNG
						</label>
						<label class="flex items-center gap-2 text-sm">
							<input
								class="h-4 w-4 accent-[var(--color-brand-yellow)]"
								type="radio"
								name="fmt"
								value="jpg"
								bind:group={outputFormat}
							/>
							JPG
						</label>

						{#if outputFormat === 'jpg'}
							<div class="flex items-center gap-2 text-xs text-white/70">
								<span>Quality</span>
								<input
									class="w-28"
									type="range"
									min="0.6"
									max="1"
									step="0.01"
									bind:value={jpgQuality}
								/>
								<span class="tabular-nums">{jpgQuality.toFixed(2)}</span>
							</div>
						{/if}
					</div>
				</div>

				{#if errorMsg}
					<div class="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
						{errorMsg}
					</div>
				{/if}

				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div class="text-xs text-white/60">
						{#if photoReady}
							Photo loaded.
						{:else}
							No photo selected yet.
						{/if}
					</div>

					<button
						class="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-yellow)] px-4 py-2 text-sm font-extrabold text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
						onclick={download}
						disabled={!templateReady}
					>
						Download poster
					</button>
				</div>
			</div>
		</div>

		<p class="mt-3 text-xs text-white/50">
			Note: The design stays identical to the official template; we only replace the photo and name.
		</p>
	</div>
</div>

{#if adjustOpen}
	<!-- Modal -->
	<div
		class="fixed inset-0 z-50"
		role="dialog"
		aria-modal="true"
		aria-label="Adjust photo"
		tabindex="-1"
		onkeydown={onAdjustKeyDown}
	>
		<button
			type="button"
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
			aria-label="Close adjust photo"
			onclick={() => closeAdjust(true)}
		></button>

		<div class="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
			<div
				class="relative z-10 w-full max-w-xl rounded-2xl border border-white/10 bg-[#0B1020] p-4 shadow-2xl"
			>
				<div class="flex items-start justify-between gap-4">
					<div>
						<div class="text-sm font-extrabold">Adjust photo</div>
						<p class="mt-1 text-xs text-white/60">
							Drag to move. Use the slider to zoom. This only affects your photo framing.
						</p>
					</div>
					<button
						type="button"
						class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
						onclick={() => closeAdjust(true)}
					>
						Close
					</button>
				</div>

				<div class="mt-4">
					<div class="rounded-xl border border-white/10 bg-black/20 p-3">
						<canvas
							bind:this={adjustCanvasEl}
							class="block h-auto w-full touch-none rounded-lg"
							style="aspect-ratio: 1 / 1;"
							width="720"
							height="720"
							onpointerdown={onAdjustPointerDown}
							onpointermove={onAdjustPointerMove}
							onpointerup={onAdjustPointerUp}
							onpointercancel={onAdjustPointerUp}
							onpointerleave={onAdjustPointerUp}
						></canvas>
					</div>
				</div>

				<div class="mt-4 grid gap-4">
					<div class="grid gap-2">
						<div class="flex items-center justify-between text-xs text-white/70">
							<span class="font-semibold">Zoom</span>
							<span class="tabular-nums">{adjustDraft.zoom.toFixed(2)}×</span>
						</div>
						<input
							class="w-full"
							type="range"
							min="1"
							max="4"
							step="0.01"
							bind:value={adjustDraft.zoom}
							oninput={() => scheduleAdjustRender()}
						/>
					</div>

					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<button
							type="button"
							class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
							onclick={() => {
								adjustDraft = { zoom: 1, panX: 0, panY: 0 };
								scheduleAdjustRender();
							}}
						>
							Reset
						</button>
						<div class="flex gap-2">
							<button
								type="button"
								class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/5"
								onclick={() => closeAdjust(true)}
							>
								Cancel
							</button>
							<button
								type="button"
								class="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-yellow)] px-4 py-2 text-xs font-extrabold text-black hover:brightness-110"
								onclick={() => closeAdjust(false)}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}


