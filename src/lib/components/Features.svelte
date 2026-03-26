<script lang="ts">
  import { Plane, Wrench, ShieldCheck, ArrowRight } from 'lucide-svelte';

  // Xogta Adeegyada (Based on Business Profile PDF)
  const features = [
    {
      title: "Safarrada Caafimaadka",
      description: "Waxaan kuu fududeynaynaa ballamada dhakhtarka, Viisada, iyo Hoteelada Hindiya iyo Itoobiya adiga oo gurigaaga jooga.",
      icon: Plane,
      color: "text-blue-400"
    },
    {
      title: "Adeegyada Farsamada",
      description: "Ma u baahan tahay dhisayaal, koronto-yaqaan, ama farsamo-yaqaan gaadiid? Hel xirfadlayaal la hubiyay hadda.",
      icon: Wrench,
      color: "text-yellow-400"
    },
    {
      title: "Aaminaad & Hufnaan",
      description: "Dhexdhexaadiye dambe ma jiro. Waxaan ku xireynaa toos adeeg-bixiyaha, innagoo ilaalinayna badbaadadaada.",
      icon: ShieldCheck,
      color: "text-green-400"
    }
  ];
</script>

<section class="bg-[#121212] py-24 relative" id="services">
  <!-- Xariiq yar oo qurux ah (Separator) -->
  <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    
    <!-- Cinwaanka Qaybta -->
    <div class="mx-auto max-w-2xl text-center mb-16">
      <h2 class="text-base font-semibold leading-7 text-[#FFC107]">Maxaan Qabannaa?</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Hal meel. Dhammaan <br class="hidden sm:block" /> Adeegyadaada Muhiimka ah.
      </p>
    </div>

    <!-- Saddexda Kaar (Cards) -->
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
      {#each features as feature}
        <div class="flex flex-col items-start p-8 rounded-2xl bg-[#181818] border border-gray-800 transition hover:border-[#FFC107]/50 hover:bg-[#1f1f1f] group">
          
            <!-- Icon Box -->
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2a2a2a] group-hover:bg-[#FFC107] transition-colors duration-300">
                <svelte:component 
                    this={feature.icon} 
                    class="h-8 w-8 text-gray-300 group-hover:text-black" 
                    strokeWidth={1.5} 
                />
            </div>
            
            <h3 class="text-xl font-bold text-white mb-3">
                {feature.title}
            </h3>
            
            <p class="text-base leading-7 text-gray-400 flex-grow">
                {feature.description}
            </p>

            <!-- Link beenaad (Read more) -->
            <div class="mt-6 flex items-center text-sm font-semibold text-[#FFC107]">
                Faahfaahin 
                <ArrowRight class="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>

        </div>
      {/each}
    </div>
  </div>
</section>