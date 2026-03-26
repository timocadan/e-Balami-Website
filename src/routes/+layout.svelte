<script lang="ts">
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    
    import { inject } from '@vercel/analytics';
    import { onMount } from 'svelte';
    
    // WAXA CUSUB: Waxaan soo wacnay 'page' si aan u ogaano linkiga aan joogno
    import { page } from '$app/stores';

    let { children } = $props();

    onMount(() => {
        inject();
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <title>e-Balami: Simplify Your Life</title>
</svelte:head>

<!-- LOGIC MUHIIM AH: -->
<!-- Haddii linkigu ka bilowdo '/finance', tus boggaas oo kaliya (Full Screen) -->
<!-- Haddii kale, tus Websaytka rasmiga ah (Navbar + Footer) -->

{#if $page.url.pathname.startsWith('/finance')}
    
    <!-- MIDAAN WAA Finance App-ka (No Navbar/Footer) -->
    <main class="w-full h-full">
        {@render children()}
    </main>

{:else}

    <!-- MIDAAN WAA PUBLIC WEBSITE (Navbar & Footer) -->
    <div 
        class="flex flex-col min-h-screen bg-[#121212] text-white selection:bg-[#FFC107] selection:text-black overflow-x-hidden" 
        style="font-family: 'Manrope', sans-serif !important;"
    >
        
        <Navbar />

        <main class="flex-grow w-full">
            {@render children()}
        </main>

        <Footer />
    </div>

{/if}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
  }
</style>