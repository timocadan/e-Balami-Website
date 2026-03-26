<script lang="ts">
	import PosterGenerator from '$lib/components/poster/PosterGenerator.svelte';
</script>

<svelte:head>
	<title>SRYF 2026 Poster Generator | ebalami</title>
	<meta
		name="description"
		content="Generate your Somali Region Youth Forum 2026 attendance poster and download it in high quality."
	/>
</svelte:head>

<section class="w-full">
	<div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
		<div class="mb-8">
			<h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">Poster Generator</h1>
			<p class="mt-2 max-w-2xl text-sm text-white/70 sm:text-base">
				Upload your photo, type your name, preview instantly, then download your poster.
			</p>
		</div>

		<PosterGenerator />
	</div>
</section>





