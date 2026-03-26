<script lang="ts">
  import { Play, X } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';

  import { lang } from '$lib/stores/lang';
  import { content } from '$lib/data/translations';
  import { appLinks } from '$lib/appLinks';

  import Portal from '$lib/components/Portal.svelte';

  export let open = false;
  export let onClose: () => void;

  function close() {
    onClose?.();
  }

  function onBackdropKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      close();
    }
  }
</script>

{#if open}
  <Portal target="body">
    <div
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="button"
      tabindex="0"
      aria-label="Close dialog"
      onclick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onkeydown={onBackdropKeydown}
      transition:fade={{ duration: 200 }}
    >
      <div
        class="popup-glow bg-[#121212] border-2 border-[#FFC107]/50 rounded-3xl max-w-xs w-full p-5 relative"
        transition:fly={{ y: 20, duration: 300 }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onclick={close}
          class="absolute top-2.5 right-2.5 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full"
          aria-label="Close"
        >
          <X class="w-3.5 h-3.5" />
        </button>

        <div class="text-center">
          <div class="mb-3 flex justify-center">
            <div class="w-12 h-12 bg-[#FFC107]/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.3)]">
              <svg class="w-7 h-7 text-[#FFC107]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 13.8c.8-1 1.7-1.4 1.7-1.4-2.8-4-3.7-4.4-4-4.5-.9-.2-2.3.6-2.9.6-.6 0-1.8-.7-2.9-.6-2.5.3-4.5 2.5-4.5 6 0 3.3 1.9 6.8 4.7 6.8 1.1 0 1.9-.8 3.1-.8 1.2 0 1.8.8 3 .8 2.8 0 4-3.5 4.7-6.2-.1 0-2.2-1-3-4.7zM15 6c1.1-1.3 1.5-3 1.2-4.2-1.3 0-2.8 1-3.7 2-.8 1.1-1.2 2.6-1 3.9 1.5.1 2.8-1 3.5-1.7z" />
              </svg>
            </div>
          </div>

          <h3 class="text-lg font-bold text-white mb-1.5">
            {content.cta.iosComingSoon[$lang]}
          </h3>

          <p class="text-xs text-gray-300 mb-4 leading-relaxed px-1">
            {content.cta.iosComingSoonDesc[$lang]}
          </p>

          <div class="flex flex-col gap-2">
            <a
              href={appLinks.android}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex items-center justify-center gap-1.5 bg-[#FFC107] text-[#121212] px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 hover:bg-yellow-400 hover:scale-105 shadow-lg shadow-yellow-500/30"
            >
              <Play class="w-3.5 h-3.5" />
              <span>{content.cta.getPlayStore[$lang]}</span>
            </a>

            <button
              onclick={close}
              class="w-full px-4 py-2 rounded-full font-bold text-xs border-2 border-gray-700 text-gray-300 hover:border-[#FFC107]/50 hover:text-[#FFC107] transition-all duration-300"
              type="button"
            >
              {content.cta.close[$lang]}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Portal>
{/if}

<style>
  @keyframes pulse-glow {
    0%,
    100% {
      box-shadow:
        0 0 20px rgba(255, 193, 7, 0.3),
        0 0 40px rgba(255, 193, 7, 0.2),
        0 0 60px rgba(255, 193, 7, 0.1),
        inset 0 0 20px rgba(255, 193, 7, 0.05);
    }
    50% {
      box-shadow:
        0 0 30px rgba(255, 193, 7, 0.5),
        0 0 60px rgba(255, 193, 7, 0.3),
        0 0 90px rgba(255, 193, 7, 0.15),
        inset 0 0 30px rgba(255, 193, 7, 0.08);
    }
  }

  .popup-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
</style>


