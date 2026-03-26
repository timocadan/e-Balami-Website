<script lang="ts">
  import { onMount } from 'svelte';

  export let end = 0;
  export let duration = 2000;
  export let suffix = '';
  
  let count = 0;
  let element;
  let hasStarted = false;

  onMount(() => {
    // Waxaan isticmaalaynaa IntersectionObserver si tirintu u bilaabato marka qofku arko oo kaliya
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        hasStarted = true;
        startCounting();
      }
    }, { threshold: 0.1 });

    if (element) observer.observe(element);

    return () => observer.disconnect();
  });

  function startCounting() {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Xisaabta "EaseOut" si ay u tartiibeyso dhamaadka
      count = Math.floor(progress * end); // Linear for simplicity here, or use logic from react

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        count = end;
      }
    };
    window.requestAnimationFrame(step);
  }
</script>

<span bind:this={element} class="tabular-nums">
  {count}{suffix}
</span>