<script lang="ts">
  import { Menu, X, CalendarCheck, Globe } from 'lucide-svelte';
  
  // SOO WAC XOGTA MUHIIMKA AH
  import { lang, toggleLang } from '$lib/stores/lang';     // Luqadaha
  import { content } from '$lib/data/translations';       // Qaamuuska
  import { appLinks } from '$lib/appLinks';               // Central Link System

  let isMenuOpen = false;
</script>

<nav class="fixed top-0 z-50 w-full border-b border-gray-800 bg-[#0a0a0a]/90 backdrop-blur-md transition-all">
  <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
    
    <!-- 1. LOGO -->
    <a href="/" class="flex items-center gap-2">
      <!-- Sawirkaaga Logada -->
      <img src="/logo.png" alt="e-Balami Logo" class="h-10 w-auto object-contain" />
      
      <!-- Magaca (Hadii sawirku qoraal wato, qeybtan 'span' waad tirtiri kartaa) -->
      <span class="text-2xl font-bold tracking-tight text-white">
        e-Balami
      </span>
    </a>

    <!-- 2. DESKTOP LINKS (LINKSIGA DHEXE) -->
    <div class="hidden lg:flex lg:items-center lg:gap-8">
        <!-- Adeegyada -->
        <a href="/#services" class="text-sm font-medium text-gray-300 hover:text-[#FFC107] transition-colors">
            {content.navbar.services[$lang]}
        </a>
        <!-- Hadafka -->
        <a href="/#story" class="text-sm font-medium text-gray-300 hover:text-[#FFC107] transition-colors">
            {content.navbar.story[$lang]}
        </a>
        <!-- FAQ -->
        <a href="/#faq" class="text-sm font-medium text-gray-300 hover:text-[#FFC107] transition-colors">
            {content.navbar.faq[$lang]}
        </a>
    </div>

    <!-- 3. BUTTONS & SWITCHER (DHINACA MIDIG) -->
    <div class="hidden lg:flex lg:items-center lg:gap-4">
        
        <!-- BADHANKA LUQADDA (EN/SO) -->
        <button 
            onclick={() => toggleLang($lang)}
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-800 transition-all border border-transparent hover:border-gray-700 cursor-pointer"
            aria-label="Switch Language"
        >
            <Globe size={18} class="text-[#FFC107]" />
            <span>{$lang === 'en' ? 'EN' : 'SO'}</span>
        </button>

        <!-- CONTACT BUTTON -->
        <a 
            href="/contact" 
            class="rounded-full border border-[#FFC107] px-5 py-2.5 text-sm font-bold text-[#FFC107] transition-all hover:bg-[#FFC107] hover:text-black"
        >
            {content.navbar.contact[$lang]}
        </a>
        
        <!-- GET THE APP BUTTON (LINKIGA DHABTA AH AYUU ISTICMAALAYA) -->
        <a 
            href={appLinks.navbarTarget}
            class="rounded-full bg-[#FFC107] px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(255,193,7,0.4)] transition-all transform hover:scale-105 hover:bg-yellow-400"
        >
            {content.navbar.download[$lang]}
        </a>
    </div>
    
    <!-- 4. MOBILE MENU ICON (TOGGLE) -->
    <button class="lg:hidden text-gray-300 hover:text-[#FFC107]" onclick={() => isMenuOpen = !isMenuOpen}>
        {#if isMenuOpen} <X size={28} /> {:else} <Menu size={28} /> {/if}
    </button>
  </div>

  <!-- 5. MOBILE MENU DROPDOWN -->
  {#if isMenuOpen}
    <div class="lg:hidden border-t border-gray-800 bg-[#0a0a0a] absolute w-full left-0 h-screen sm:h-auto bg-opacity-95 backdrop-blur-xl">
        <div class="space-y-2 px-4 pb-6 pt-4 shadow-2xl">
            
            <!-- Mobile Links -->
            <a href="/#services" class="block rounded-md px-3 py-4 text-base font-medium text-gray-300 hover:text-[#FFC107] hover:bg-gray-800/50" onclick={() => isMenuOpen = false}>
                {content.navbar.services[$lang]}
            </a>
            <a href="/#story" class="block rounded-md px-3 py-4 text-base font-medium text-gray-300 hover:text-[#FFC107] hover:bg-gray-800/50" onclick={() => isMenuOpen = false}>
                {content.navbar.story[$lang]}
            </a>
            <a href="/#faq" class="block rounded-md px-3 py-4 text-base font-medium text-gray-300 hover:text-[#FFC107] hover:bg-gray-800/50" onclick={() => isMenuOpen = false}>
                {content.navbar.faq[$lang]}
            </a>

            <!-- Mobile Language Switcher -->
            <div class="border-t border-gray-800 my-2 pt-2"></div>
            <button onclick={() => toggleLang($lang)} class="w-full flex items-center justify-between rounded-md px-3 py-4 text-base font-medium text-gray-300 hover:bg-gray-800">
                <span class="flex items-center gap-3">
                    <Globe size={20} class="text-[#FFC107]" />
                    Switch Language
                </span>
                <span class="bg-gray-700 px-3 py-1 rounded text-white font-bold text-sm">{$lang === 'en' ? 'English' : 'Somali'}</span>
            </button>
            
            <!-- Mobile Buttons -->
            <div class="mt-6 flex flex-col gap-3 px-1">
                <a href="/contact" class="block w-full text-center rounded-full border border-[#FFC107] px-4 py-3.5 font-semibold text-[#FFC107] hover:bg-[#FFC107] hover:text-black transition-colors" onclick={() => isMenuOpen = false}>
                    {content.navbar.contact[$lang]}
                </a>
                <a href={appLinks.navbarTarget} class="block w-full text-center rounded-full bg-[#FFC107] px-4 py-3.5 font-bold text-black hover:bg-yellow-400 transition-colors" onclick={() => isMenuOpen = false}>
                    {content.navbar.download[$lang]}
                </a>
            </div>
        </div>
    </div>
  {/if}
</nav>