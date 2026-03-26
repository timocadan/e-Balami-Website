<script>
    import FadeIn from './FadeIn.svelte';
    import { Plus, Minus, HelpCircle } from 'lucide-svelte';
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    // SOO WAC: Lang Store, Translations (Titles-ka) iyo Sanity (Xogta)
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
    import { client } from '$lib/sanity';

    let openIndex = 0;
    let faqs = []; // Weelka xogta ka imaanaysa Sanity
    let loading = true;

    function toggle(index) {
        openIndex = openIndex === index ? -1 : index;
    }

    onMount(async () => {
        // Halkan waxaan ka soo dejisanaynaa daruurta
        const query = `*[_type == "faq"]`;
        try {
            faqs = await client.fetch(query);
            loading = false;
        } catch (e) {
            console.error("FAQ Error:", e);
        }
    });
</script>

<section class="bg-[#0f0f0f] py-24 relative" id="faq">
    <div class="max-w-4xl mx-auto px-6">
        
        <div class="text-center mb-16">
            <FadeIn>
                <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#FFC107]/30 rounded-full bg-[#FFC107]/5">
                    <HelpCircle size={16} class="text-[#FFC107]" />
                    <span class="text-[#FFC107] font-bold text-xs tracking-widest uppercase">
                        {content.faq.badge[$lang]}
                    </span>
                </div>
                <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    {content.faq.titleStart[$lang]} <span class="text-[#FFC107]">{content.faq.titleHighlight[$lang]}</span>
                </h2>
                <p class="text-gray-400">
                    {content.faq.subtitle[$lang]}
                </p>
            </FadeIn>
        </div>

        <div class="space-y-4">
            
            <!-- HADDII UU SOO DAJINAYO -->
            {#if loading}
                <div class="text-center py-10 text-gray-500 animate-pulse">Loading questions...</div>
            
            <!-- HADDII XOG LA HELAY -->
            {:else if faqs.length > 0}
                {#each faqs as faq, i}
                    <FadeIn delay={i * 100}>
                        <button 
                            class="w-full text-left bg-[#181818] rounded-2xl overflow-hidden border transition-all duration-300 group {openIndex === i ? 'border-[#FFC107] shadow-[0_0_15px_rgba(255,193,7,0.1)]' : 'border-gray-800 hover:border-gray-700'}"
                            onclick={() => toggle(i)}
                        >
                            <div class="p-6 flex justify-between items-center gap-4">
                                <h3 class="text-lg font-bold text-white group-hover:text-[#FFC107] transition-colors">
                                    <!-- LOGIC: Eeg luqadda furan (en vs so) -->
                                    { $lang === 'en' ? faq.question_en : faq.question_so }
                                </h3>
                                <div class="shrink-0 text-[#FFC107]">
                                    {#if openIndex === i}
                                        <Minus size={24} />
                                    {:else}
                                        <Plus size={24} />
                                    {/if}
                                </div>
                            </div>

                            {#if openIndex === i}
                                <div transition:slide={{ duration: 300 }} class="px-6 pb-6 text-gray-400 text-base leading-relaxed border-t border-gray-800/50 pt-4 mt-2">
                                    { $lang === 'en' ? faq.answer_en : faq.answer_so }
                                </div>
                            {/if}
                        </button>
                    </FadeIn>
                {/each}
            
            {:else}
                <p class="text-center text-gray-500">No questions found yet.</p>
            {/if}

        </div>

    </div>
</section>