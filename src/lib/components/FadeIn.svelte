<script lang="ts">
  import { onMount } from 'svelte';
  
  // Waxaanu soo qaadanaynaa props-kii React: delay, threshold, className
  export let delay = 0;
  export let threshold = 0.1;
  let clazz = '';
  export { clazz as class }; // "class" is reserved keyword, so we alias it

  let isVisible = false;
  let element: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  });
</script>

<div
  bind:this={element}
  class={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${clazz}`}
  style="transition-delay: {delay}ms;"
>
  <slot />
</div>