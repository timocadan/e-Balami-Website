<script lang="ts">
  import { onMount } from 'svelte';
  import FadeIn from './FadeIn.svelte';
  import Counter from './Counter.svelte';
  import { Star, Quote } from 'lucide-svelte';
  
  // SOO WAC XOGTA CAADIGA AH (Translations for titles)
  import { lang } from '$lib/stores/lang';
  import { content } from '$lib/data/translations';

  // SOO WAC SANITY (Bridge)
  import { client, urlFor } from '$lib/sanity';

  // Weelka aan ku keydinayno xogta imaanaysa
  let reviews = []; 
  let activeIndex = 0;
  let loading = true; // Si aan u sugno inta internetka laga soo wadey

  onMount(async () => {
    // 1. CODSI XOGTA: "Fadlan iisoo dhiib dhamaan 'review' type-ka"
    const query = `*[_type == "review"]`;
    
    try {
        // Halkan ayuu Internetka kala soo dagayaa
        reviews = await client.fetch(query);
        loading = false;
    } catch (error) {
        console.error("Cilad dhanka soo dejinta ah:", error);
    }

    // 2. SLIDER ANIMATION
    const interval = setInterval(() => {
        if(reviews.length > 0) {
            activeIndex = (activeIndex + 1) % reviews.length;
        }
    }, 5000);
    return () => clearInterval(interval);
  });
</script>

<section class="bg-[#121212] py-24 relative overflow-hidden" id="trust">
    
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <!-- COLUMN 1: STATS (Kani weli wuxuu ka imaanayaa file-ka translations.js sababtoo ah maanu badalin) -->
            <div>
              <FadeIn>
                <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-12">
                  {content.trust.titleStart[$lang]} <br />
                  <span class="text-[#FFC107]">{content.trust.titleHighlight[$lang]}</span>
                </h2>
              </FadeIn>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {#each content.trust.stats[$lang] as stat, idx}
                  <FadeIn delay={idx * 150}>
                    <div class="bg-[#181818] p-8 rounded-2xl border-l-4 border-[#FFC107] hover:bg-[#1f1f1f] transition-colors duration-300">
                      <div class="text-4xl font-extrabold text-white mb-2">
                        <Counter end={stat.end} suffix={stat.suffix} />
                      </div>
                      <div class="text-gray-400 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
                    </div>
                  </FadeIn>
                {/each}
              </div>
            </div>
    
            <!-- COLUMN 2: REVIEWS (KA IMANAYA SANITY CLOUD) -->
            <FadeIn delay={400} class="h-full">
                <div class="bg-[#181818] p-8 md:p-12 rounded-3xl relative h-full border border-gray-800 min-h-[400px] flex flex-col justify-center">
                
                <!-- LOADING STATE (Hadii xogtu soo socoto) -->
                {#if loading}
                    <div class="text-center text-gray-500 animate-pulse">
                        <p>Loading Reviews...</p>
                    </div>
                
                <!-- DISPLAY DATA (Markay timaado) -->
                {:else if reviews.length > 0}
                    
                    <div class="absolute top-8 left-8 opacity-20">
                        <Quote size={80} class="text-[#FFC107]" strokeWidth={1} />
                    </div>
                    
                    <div class="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <div class="flex gap-1 mb-8">
                                {#each Array(5) as _}
                                    <Star class="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                                {/each}
                            </div>
                            
                            <!-- LOGIC: Hadii Lang == 'en', tus 'quote_en', hadii kale 'quote_so' -->
                            {#key activeIndex}
                                <p class="text-xl md:text-2xl text-gray-200 italic font-light leading-relaxed mb-8 animate-[fadeIn_0.5s_ease-out]">
                                    "{ $lang === 'en' ? reviews[activeIndex].quote_en : reviews[activeIndex].quote_so }"
                                </p>
                            {/key}
                        </div>
        
                        <div class="flex items-center gap-4 mt-auto">
                            <!-- SAWIRKA (URL FOR) -->
                            {#if reviews[activeIndex].image}
                                <img 
                                    src={urlFor(reviews[activeIndex].image).width(200).url()} 
                                    alt={reviews[activeIndex].name} 
                                    class="w-14 h-14 rounded-full object-cover border-2 border-[#FFC107]"
                                />
                            {/if}
                            <div>
                                <h4 class="font-bold text-white text-lg">{reviews[activeIndex].name}</h4>
                                <p class="text-[#FFC107] text-sm font-medium">{reviews[activeIndex].role}</p>
                            </div>
                        </div>
        
                        <!-- Dots Indicators -->
                        <div class="absolute top-8 right-8 flex gap-2">
                        {#each reviews as _, idx}
                            <button
                                onclick={() => activeIndex = idx}
                                class={`transition-all duration-300 rounded-full ${idx === activeIndex ? 'bg-[#FFC107] w-8 h-2' : 'bg-gray-700 w-2 h-2 hover:bg-gray-500'}`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            ></button>
                        {/each}
                        </div>
                    </div>

                {:else}
                    <p class="text-gray-500">No reviews found in Dashboard.</p>
                {/if}

                </div>
            </FadeIn>
    
          </div>
    </div>
</section>

<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>