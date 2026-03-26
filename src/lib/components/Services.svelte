<script>
    import FadeIn from './FadeIn.svelte';
    import { Plane, Wrench, Calendar, Car, Smartphone, Plus, Minus, Lock } from 'lucide-svelte';
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    // Import Lang & Content (Title-ka kaliya)
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
    // Import Sanity
    import { client } from '$lib/sanity';

    // Khariidada Icons-ka (Mapping String to Component)
    const iconMap = {
        'plane': Plane,
        'wrench': Wrench,
        'calendar': Calendar,
        'car': Car,
        'phone': Smartphone
    };

    let services = []; // Weelka Xogta
    let openServiceIndex = 0;
    let loading = true;

    // Soo dejinta Xogta
    onMount(async () => {
        // Waxaan ku dalbanaynaa inuu u kala horumariyo sida aan u galinay (_createdAt)
        const query = `*[_type == "service"] | order(_createdAt asc)`;
        try {
            services = await client.fetch(query);
            loading = false;
        } catch (e) {
            console.error(e);
        }
    });

    function toggleService(index, isComingSoon) {
        if (isComingSoon) return;
        openServiceIndex = openServiceIndex === index ? -1 : index;
    }
</script>

<section class="bg-[#0a0a0a] py-24 relative overflow-hidden" id="services">
  
  <div class="max-w-7xl mx-auto px-4 mb-20 text-center">
    <FadeIn>
      <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-6">
        {content.services.header[$lang]} & <span class="text-[#FFC107]">{content.services.headerProcess[$lang]}</span>
      </h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        {content.services.subHeader[$lang]}
      </p>
    </FadeIn>
  </div>

  <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
    
    <!-- LEFT: SERVICES (Dynamic from Sanity) -->
    <div>
      <FadeIn delay={200}>
        <div class="flex items-center gap-3 mb-10 h-8">
          <div class="h-px bg-[#FFC107] flex-grow opacity-50"></div>
          <h3 class="text-sm font-bold text-[#FFC107] uppercase tracking-widest">
              {content.services.col1Title[$lang]}
          </h3>
          <div class="h-px bg-[#FFC107] flex-grow opacity-50"></div>
        </div>
      </FadeIn>

      <div class="space-y-4">
        {#if loading}
            <div class="text-gray-500 text-center animate-pulse">Loading Services...</div>
        {:else}
            {#each services as service, i}
            <!-- Coming Soon Logic (Laga keenay Sanity) -->
            {@const isComingSoon = service.comingSoon}
            
            <FadeIn delay={300 + (i * 100)}>
                <button 
                    class="w-full text-left group relative rounded-2xl border transition-all duration-300 overflow-hidden 
                    {isComingSoon 
                        ? 'bg-[#121212] border-gray-900 cursor-default opacity-50'
                        : openServiceIndex === i ? 'bg-[#181818] border-[#FFC107] shadow-lg shadow-yellow-900/10' : 'bg-[#181818] border-gray-800 hover:border-gray-700'
                    }"
                    onclick={() => toggleService(i, isComingSoon)}
                    disabled={isComingSoon}
                >
                <div class="p-6 flex items-center justify-between min-h-[100px]"> 
                    <div class="flex items-center gap-5">
                            
                            <!-- ICON MAPPER -->
                            <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 
                                {isComingSoon ? 'bg-gray-900 text-gray-600 border border-gray-800' : 
                                openServiceIndex === i ? 'bg-[#FFC107] text-black' : 'bg-[#121212] text-[#FFC107] group-hover:bg-[#FFC107]/10'}">
                                
                                <!-- Halkan ayaan kaga soo saaraynaa Ikonka saxda ah magaciisa -->
                                <svelte:component this={iconMap[service.icon] || Wrench} size={22} />
                            </div>
                            
                            <div class="flex flex-col items-start justify-center">
                                <h3 class="text-lg font-bold transition-colors 
                                    {isComingSoon ? 'text-gray-500' : 
                                    openServiceIndex === i ? 'text-[#FFC107]' : 'text-white group-hover:text-[#FFC107]'}">
                                    <!-- TURJUMAAD (EN/SO) -->
                                    { $lang === 'en' ? service.title_en : service.title_so }
                                </h3>
                                
                                {#if isComingSoon}
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-[10px] uppercase font-bold tracking-widest text-[#FFC107]/70 bg-[#FFC107]/5 px-2 py-0.5 rounded border border-[#FFC107]/10">
                                            {content.services.comingSoon[$lang]}
                                        </span>
                                    </div>
                                {/if}
                            </div>
                    </div>

                    <div class="transition-transform duration-300 shrink-0">
                        {#if isComingSoon}
                            <Lock size={18} class="text-gray-700" />
                        {:else if openServiceIndex === i}
                            <Minus size={22} class="text-[#FFC107]" />
                        {:else}
                            <Plus size={22} class="text-[#FFC107]" />
                        {/if}
                    </div>
                </div>

                {#if !isComingSoon && openServiceIndex === i}
                    <div transition:slide={{ duration: 300 }} class="px-6 pb-6 pt-0">
                        <div class="pl-[68px] pr-2">
                            <p class="text-gray-400 text-sm leading-relaxed border-t border-gray-800/50 pt-4">
                                { $lang === 'en' ? service.description_en : service.description_so }
                            </p>
                        </div>
                    </div>
                {/if}
                </button>
            </FadeIn>
            {/each}
        {/if}
      </div>
    </div>

    <!-- RIGHT: TIMELINE (Kani static buu ahaan karaa, maadaama uu yahay Step 1,2,3) -->
    <div class="mt-8 lg:mt-0">
       <FadeIn delay={400}>
        <div class="flex items-center gap-3 mb-10 h-8">
          <div class="h-px bg-[#FFC107] flex-grow opacity-50"></div>
          <h3 class="text-sm font-bold text-[#FFC107] uppercase tracking-widest">
              {content.services.col2Title[$lang]}
          </h3>
          <div class="h-px bg-[#FFC107] flex-grow opacity-50"></div>
        </div>
       </FadeIn>

      <div class="pl-2">
        {#each content.services.steps[$lang] as step, i}
          <FadeIn delay={500 + (i * 150)}>
            <div class="relative flex gap-6 min-h-[134px] group">
              {#if i !== content.services.steps[$lang].length - 1}
                <div class="absolute left-[23px] top-12 bottom-0 w-0.5 bg-gray-800 group-hover:bg-gray-700 transition-colors"></div>
              {/if}
              
              <div class="relative z-10">
                 <div class="w-12 h-12 rounded-full bg-black border border-[#FFC107]/30 flex items-center justify-center text-[#FFC107] group-hover:bg-[#FFC107] group-hover:text-black transition-all shadow-md">
                    <svelte:component this={step.icon} size={20} />
                 </div>
              </div>

              <div class="pt-2">
                 <h3 class="text-lg font-bold text-white mb-2 group-hover:text-[#FFC107] transition-colors">{step.title}</h3>
                 <p class="text-gray-500 text-sm leading-relaxed max-w-sm">{step.description}</p>
              </div>
            </div>
          </FadeIn>
        {/each}
      </div>
    </div>

  </div>
</section>