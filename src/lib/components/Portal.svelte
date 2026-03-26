<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let target: string = 'body';

  let hostEl: HTMLDivElement | null = null;

  onMount(() => {
    if (!hostEl) return;

    const targetEl = document.querySelector(target);
    if (targetEl) {
      targetEl.appendChild(hostEl);
    }
  });

  onDestroy(() => {
    if (!hostEl) return;
    hostEl.remove();
  });
</script>

<div bind:this={hostEl} style="display: contents;">
  <slot />
</div>


