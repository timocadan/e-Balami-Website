<script lang="ts">
  import FadeIn from './FadeIn.svelte';
  import { CheckCircle2, Shield, Lightbulb, Users } from 'lucide-svelte';
  
  // IMPORT Translation
  import { lang } from '$lib/stores/lang';
  import { content } from '$lib/data/translations';
</script>

<section class="bg-[#0a0a0a] py-24 relative overflow-hidden" id="story">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div class="text-center mb-16">
            <FadeIn>
                <h2 class="text-3xl md:text-5xl font-extrabold text-white">
                {content.mission.titleStart[$lang]} <span class="text-[#FFC107]">{content.mission.titleHighlight[$lang]}</span>
                </h2>
                <div class="w-24 h-1 bg-[#FFC107] mx-auto mt-6 rounded-full opacity-70"></div>
            </FadeIn>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <!-- LEFT: OUR MISSION -->
            <div class="flex flex-col justify-center">
            <FadeIn>
                <div class="bg-[#121212] border border-gray-800 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-[#FFC107]/30 transition-colors duration-500">
                    <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FFC107]/5 rounded-full blur-3xl group-hover:bg-[#FFC107]/10 transition-colors duration-500"></div>

                    <h3 class="text-3xl font-bold text-white mb-6 relative z-10">
                    {content.mission.leftCardTitle[$lang]} <br />
                    <span class="text-[#FFC107]">{content.mission.leftCardHighlight[$lang]}</span>
                    </h3>
                    
                    <p class="text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
                    {content.mission.leftCardDesc[$lang]}
                    </p>

                    <div class="space-y-4 relative z-10">
                    {#each content.mission.points[$lang] as point}
                        <div class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded-full bg-[#FFC107]/10 flex items-center justify-center shrink-0 border border-[#FFC107]/20">
                            <CheckCircle2 class="text-[#FFC107]" size={14} />
                        </div>
                        <span class="text-gray-200 font-medium">{point}</span>
                        </div>
                    {/each}
                    </div>
                </div>
            </FadeIn>
            </div>

            <!-- RIGHT: VALUES -->
            <div>
            <FadeIn delay={200}>
                <div class="mb-8 flex items-center gap-4">
                    <h3 class="text-2xl font-bold text-white">{content.mission.rightTitle[$lang]}</h3>
                    <div class="h-px bg-gray-800 flex-grow"></div>
                </div>
                
                <div class="space-y-5">
                    {#each content.mission.values[$lang] as value, i}
                    <div class="flex items-start gap-5 p-5 bg-[#121212] rounded-2xl border border-gray-800/50 hover:border-[#FFC107]/30 transition-all duration-300 group hover:-translate-x-1">
                        <div class="w-12 h-12 rounded-full bg-black border border-[#FFC107]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FFC107] group-hover:text-black transition-colors duration-300 text-[#FFC107]">
                            <svelte:component this={value.icon} size={24} />
                        </div>
                        <div>
                        <h4 class="text-lg font-bold text-white mb-1 group-hover:text-[#FFC107] transition-colors">{value.title}</h4>
                        <p class="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                        </div>
                    </div>
                    {/each}
                </div>
            </FadeIn>
            </div>

        </div>
    </div>
</section>