<script>
    import { CalendarCheck, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Download, FileText, ChevronUp } from 'lucide-svelte';
    import { fade, fly } from 'svelte/transition';
    
    // Translation imports
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
    import { appLinks } from '$lib/appLinks';

    // State for the popup menu
    let showDownloadOptions = false;
</script>

<footer class="bg-[#050505] border-t border-gray-900 pt-20 pb-10 px-6 font-manrope">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        
        <!-- COLUMN 1: BRAND -->
        <div class="flex flex-col">
             <!-- Logo Image -->
            <a href="/" class="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="e-Balami Logo" class="h-12 w-auto object-contain" />
                <span class="text-2xl font-bold tracking-tight text-white">e-Balami</span>
            </a>

            <p class="text-gray-400 mb-8 max-w-sm leading-relaxed">
                {content.footer.tagline[$lang]}
            </p>

            <div class="flex gap-4">
                <a href="https://web.facebook.com/myebalami" aria-label="Facebook" class="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center text-gray-400 hover:bg-[#FFC107] hover:text-black transition-all duration-300"><Facebook size={20} /></a>
                <a href="https://www.instagram.com/e_balami1/" aria-label="Instagram" class="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center text-gray-400 hover:bg-[#FFC107] hover:text-black transition-all duration-300"><Instagram size={20} /></a>
                <a href="https://www.linkedin.com/company/e-balami/" aria-label="LinkedIn" class="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center text-gray-400 hover:bg-[#FFC107] hover:text-black transition-all duration-300"><Linkedin size={20} /></a>
                <a href="https://www.tiktok.com/@e.balami" aria-label="TikTok" class="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center text-gray-400 hover:bg-[#FFC107] hover:text-black transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                    </svg>
                </a>
            </div>
        </div>

        <!-- COLUMN 2: LINKS -->
        <div>
            <h4 class="text-white font-bold text-lg mb-8">{content.footer.headings.nav[$lang]}</h4>
            <ul class="space-y-4">
                <li><a href={appLinks.navbarTarget} class="text-gray-400 hover:text-[#FFC107] transition-colors">{content.navbar.download[$lang]}</a></li> 
                <li><a href="/#services" class="text-gray-400 hover:text-[#FFC107] transition-colors">{content.navbar.services[$lang]}</a></li>
                <li><a href="/#story" class="text-gray-400 hover:text-[#FFC107] transition-colors">{content.navbar.story[$lang]}</a></li>
                <li><a href="/#faq" class="text-gray-400 hover:text-[#FFC107] transition-colors">{content.navbar.faq[$lang]}</a></li>
            </ul>
        </div>

        <!-- COLUMN 3: CONTACT -->
        <div>
            <h4 class="text-white font-bold text-lg mb-8">{content.footer.headings.contact[$lang]}</h4>
            <ul class="space-y-5">
                <li><a href="mailto:ebalamiservices@gmail.com" class="flex items-center gap-3 text-gray-400 hover:text-[#FFC107] transition-colors group"><Mail class="w-5 h-5 text-[#FFC107]" /> <span>ebalamiservices@gmail.com</span></a></li>
                <li><a href="tel:0252788887" class="flex items-center gap-3 text-gray-400 hover:text-[#FFC107] transition-colors group"><Phone class="w-5 h-5 text-[#FFC107]" /> <span>025 278 8887</span></a></li>
                <li>
                    <a href="https://wa.me/251991301950" target="_blank" class="flex items-center gap-3 text-gray-400 hover:text-[#FFC107] transition-colors group">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" class="text-[#FFC107] group-hover:text-white transition-colors">
                             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>+251 99 130 1950</span>
                    </a>
                </li>
                <li class="flex items-center gap-3 text-gray-400">
                    <MapPin class="w-5 h-5 text-[#FFC107]" />
                    <span>Jigjiga, Somali Region.</span>
                </li>
            </ul>
        </div>
    </div>

    <!-- PROFILE DOWNLOAD AREA (NEW DROPDOWN LOGIC) -->
    <div class="flex flex-col items-center justify-center text-center mb-16 pt-12 border-t border-gray-900/50">
        <p class="text-white text-lg md:text-xl font-semibold mb-8 max-w-2xl leading-relaxed">
           {content.footer.profileText[$lang]}
        </p>
        
        <!-- Parent Container for Relative Positioning -->
        <div class="relative">
            
            <!-- POPUP OPTIONS (Show only if showDownloadOptions is true) -->
            {#if showDownloadOptions}
                <div 
                    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-[#181818] border border-gray-800 rounded-xl shadow-2xl p-2 z-20 flex flex-col gap-2"
                    in:fly={{ y: 10, duration: 200 }} 
                    out:fade={{ duration: 150 }}
                >
                    <!-- English Option -->
                    <a href="/profile-en.pdf" download class="block w-full text-center px-4 py-3 bg-[#121212] rounded-lg text-sm font-medium text-white hover:bg-[#FFC107] hover:text-black transition-colors" onclick={() => showDownloadOptions = false}>
                        English Version
                    </a>
                    
                    <!-- Somali Option -->
                    <a href="/profile-so.pdf" download class="block w-full text-center px-4 py-3 bg-[#121212] rounded-lg text-sm font-medium text-white hover:bg-[#FFC107] hover:text-black transition-colors" onclick={() => showDownloadOptions = false}>
                        Nuqulka Soomaaliga
                    </a>

                    <!-- Little arrow at the bottom -->
                    <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#181818] border-b border-r border-gray-800 rotate-45"></div>
                </div>
            {/if}

            <!-- Main Button (Toggles the menu instead of downloading directly) -->
            <button 
                onclick={() => showDownloadOptions = !showDownloadOptions}
                class="inline-flex items-center gap-3 text-sm font-bold text-[#FFC107] uppercase tracking-widest border-2 border-[#FFC107]/30 rounded-full px-8 py-4 hover:bg-[#FFC107] hover:text-black transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] cursor-pointer"
            >
                <FileText class="w-5 h-5" />
                <span>{content.footer.profileButton[$lang]}</span>
                {#if showDownloadOptions}
                    <ChevronUp class="w-5 h-5 ml-1 animate-bounce" />
                {:else}
                    <Download class="w-5 h-5 ml-1 group-hover:translate-y-1 transition-transform" />
                {/if}
            </button>
        </div>
     </div>

    <!-- COPYRIGHT -->
    <div class="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <p>&copy; 2025 e-Balami Technologies. All rights reserved.</p>
        <div class="flex gap-6">
            <a href="/privacy" class="hover:text-gray-400">Privacy Policy</a>
            <a href="/terms" class="hover:text-gray-400">Terms of Service</a>
        </div>
    </div>
</footer>