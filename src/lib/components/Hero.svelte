<script>
    import FadeIn from './FadeIn.svelte';
    import AppButtons from './AppButtons.svelte';
    
    // 1. Soo wac kaydka luqadaha
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
</script>

<section class="relative flex flex-col items-center justify-center bg-[#121212] overflow-hidden text-center px-4 py-28 sm:py-32 lg:h-screen lg:py-0">
    
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-[#121212] to-[#121212]"></div>
        <div class="absolute top-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#FFC107]/5 blur-[80px]"></div>
    </div>
  
    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      
      <FadeIn delay={100}>
          <div class="inline-block px-4 py-1.5 mb-6 border border-[#FFC107]/30 rounded-full bg-[#FFC107]/5 backdrop-blur-sm">
              <span class="text-[#FFC107] font-bold text-xs tracking-widest uppercase">
                  <!-- TURJUMAAD: Badge -->
                  {content.hero.badge[$lang]}
              </span>
          </div>
      </FadeIn>
      
      <FadeIn delay={300}>
          <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight pb-2">
            <!-- TURJUMAAD: Title (Simplify Your) -->
            {content.hero.titleStart[$lang]} 
            
            <span class="text-[#FFC107]">{content.hero.titleHighlight[$lang]}</span> <br />
            
            <span class="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] via-white to-[#FFC107] animate-text-shimmer bg-[length:200%_auto] pb-2">
              <!-- TURJUMAAD: Subtitle (One App...) -->
              {content.hero.subtitleStart[$lang]} {content.hero.subtitleEnd[$lang]}
            </span>
          </h1>
      </FadeIn>
      
      <FadeIn delay={500}>
          <p class="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            <!-- TURJUMAAD: Description -->
            {content.hero.desc[$lang]}
          </p>
      </FadeIn>
      
      <FadeIn delay={700}>
          <div class="w-full flex justify-center scale-90 sm:scale-100">
              <AppButtons />
          </div>
      </FadeIn>

    </div>
</section>