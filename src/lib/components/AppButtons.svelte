<script lang="ts">
    import { Play } from 'lucide-svelte';
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
    
    // SOO WAC LINIKI-YADA
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

<div class="flex flex-col sm:flex-row gap-4">
    <!-- App Store Button (Now shows popup) -->
    <button 
      onclick={openIosPopup}
      class="group flex items-center justify-center gap-3 bg-[#FFC107] text-[#121212] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-yellow-400 hover:scale-105 shadow-lg shadow-yellow-500/20 cursor-pointer"
      aria-label="Download on the App Store"
    >
      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.5 13.8c.8-1 1.7-1.4 1.7-1.4-2.8-4-3.7-4.4-4-4.5-.9-.2-2.3.6-2.9.6-.6 0-1.8-.7-2.9-.6-2.5.3-4.5 2.5-4.5 6 0 3.3 1.9 6.8 4.7 6.8 1.1 0 1.9-.8 3.1-.8 1.2 0 1.8.8 3 .8 2.8 0 4-3.5 4.7-6.2-.1 0-2.2-1-3-4.7zM15 6c1.1-1.3 1.5-3 1.2-4.2-1.3 0-2.8 1-3.7 2-.8 1.1-1.2 2.6-1 3.9 1.5.1 2.8-1 3.5-1.7z"/></svg>
      <span>{content.cta.appStore[$lang]}</span>
    </button>
  
    <!-- Google Play Button -->
    <a 
      href={appLinks.android} 
      target="_blank" 
      rel="noopener noreferrer"
      class="group flex items-center justify-center gap-3 bg-transparent border-2 border-[#FFC107] text-[#FFC107] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-[#FFC107] hover:text-[#121212] hover:scale-105"
      aria-label="Get it on Google Play"
    >
      <Play class="w-6 h-6 fill-current" />
      <span>{content.cta.googlePlay[$lang]}</span>
    </a>
</div>

<IosComingSoonModal open={showIosPopup} onClose={closeIosPopup} />

<!-- styles are in IosComingSoonModal -->