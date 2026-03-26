<script lang="ts">
    import FadeIn from './FadeIn.svelte';
    import { Play } from 'lucide-svelte';
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
    
    // SOO WAC LINKIYADA
    import { appLinks } from '$lib/appLinks';
    import IosComingSoonModal from '$lib/components/IosComingSoonModal.svelte';

    let showIosPopup = false;

    function openIosPopup() {
        showIosPopup = true;
    }

    function closeIosPopup() {
        showIosPopup = false;
    }
</script>

<!-- Halkan waxaan ku darnay id="download" -->
<section class="bg-[#FFC107] py-24 px-6 overflow-hidden relative" id="download">
    
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#000" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
    </div>

    <div class="max-w-5xl mx-auto text-center relative z-10">
        <FadeIn>
            <h2 class="text-4xl md:text-6xl font-extrabold text-[#121212] mb-6 tracking-tight">
                {content.cta.title[$lang]}
            </h2>
            <p class="text-xl text-[#121212]/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                {content.cta.desc[$lang]}
            </p>
        </FadeIn>

        <FadeIn delay={200}>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                
                <!-- App Store Link -->
                <button 
                    type="button"
                    onclick={openIosPopup}
                    class="flex items-center gap-3 bg-[#121212] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:bg-black transition-transform duration-300 cursor-pointer"
                    aria-label="Download on the App Store"
                >
                     <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.5 13.8c.8-1 1.7-1.4 1.7-1.4-2.8-4-3.7-4.4-4-4.5-.9-.2-2.3.6-2.9.6-.6 0-1.8-.7-2.9-.6-2.5.3-4.5 2.5-4.5 6 0 3.3 1.9 6.8 4.7 6.8 1.1 0 1.9-.8 3.1-.8 1.2 0 1.8.8 3 .8 2.8 0 4-3.5 4.7-6.2-.1 0-2.2-1-3-4.7zM15 6c1.1-1.3 1.5-3 1.2-4.2-1.3 0-2.8 1-3.7 2-.8 1.1-1.2 2.6-1 3.9 1.5.1 2.8-1 3.5-1.7z"/></svg>
                     <span>{content.cta.appStore[$lang]}</span>
                </button>

                <!-- Google Play Link -->
                <a 
                    href={appLinks.android} 
                    target="_blank"
                    class="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
                >
                    <Play class="w-6 h-6 fill-current" />
                    <span>{content.cta.googlePlay[$lang]}</span>
               </a>

            </div>
        </FadeIn>
    </div>
</section>

<IosComingSoonModal open={showIosPopup} onClose={closeIosPopup} />