<template>
  <div ref="sectionRef" class="reveal-section">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    // Start state: hidden and slightly lower
    gsap.set(sectionRef.value, { opacity: 0, y: 30 });

    gsap.to(sectionRef.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 85%', // Trigger when section top hits 85% of viewport
        toggleActions: 'play none none none',
      },
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.reveal-section {
  will-change: opacity, transform;
  width: 100%;
}
</style>