<template>
  <section class="hero" id="home">
    <div class="hero-bg" />
    <div class="hero-grid" />

    <p class="hero-badge">
      <span ref="badge">— Computer Engineer &amp; Web Developer</span>
    </p>

    <h1 class="hero-name">
      <span class="rev-line"><span ref="line1">DECAR</span></span>
      <span class="rev-line"><span ref="line2">A. SANCHEZ</span></span>
    </h1>

    <div class="hero-rule" ref="rule" />

    <div class="hero-bottom" ref="bottom">
      <p class="hero-sub">
        BS Computer Engineering · ESSU Salcedo Campus · Eastern Samar, PH<br />
      </p>
      <q-btn
        outline no-caps unelevated
        class="btn-crimson"
        label="View Work"
        icon-right="arrow_downward"
        @click="emit('scroll-to', 'projects')"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      />
    </div>

    <div class="scroll-ind" ref="scrollInd">
      <span>Scroll</span>
      <div class="s-line" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useCursor } from 'src/composables/useCursor'

const emit = defineEmits(['scroll-to'])
const { onEnter, onLeave } = useCursor()

const badge     = ref(null)
const line1     = ref(null)
const line2     = ref(null)
const rule      = ref(null)
const bottom    = ref(null)
const scrollInd = ref(null)

onMounted(() => {
  gsap.set([badge.value, line1.value, line2.value], { y: '110%' })
  gsap.set(rule.value,   { scaleX: 0, transformOrigin: 'left' })
  gsap.set(bottom.value, { opacity: 0, y: 30 })
  gsap.set(scrollInd.value, { opacity: 0 })

  gsap.timeline({ delay: 1.4 })
    .to(badge.value,     { y: 0,       duration: 0.8,  ease: 'power3.out' })
    .to(line1.value,     { y: 0,       duration: 1.0,  ease: 'power3.out' }, '-=0.5')
    .to(line2.value,     { y: 0,       duration: 1.0,  ease: 'power3.out' }, '-=0.75')
    .to(rule.value,      { scaleX: 1,  duration: 0.8,  ease: 'power3.out' }, '-=0.45')
    .to(bottom.value,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to(scrollInd.value, { opacity: 1, duration: 0.6,  ease: 'power2.out' }, '-=0.3')
})
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 3rem 5.5rem;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 65% 60% at 75% 50%, rgba(139, 0, 0, 0.16), transparent 65%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
}

.hero-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--c);
  margin-bottom: 1.75rem;
  overflow: hidden;

  span { display: inline-block; }
}

.hero-name {
font-family: 'Cinzel', serif;
  font-size: clamp(3rem, 13vw, 15rem);
  line-height: 0.88;
  letter-spacing: -0.01em;
  margin: 0;
}

.hero-rule {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, var(--c), transparent);
  margin: 2.5rem 0;
}

.hero-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.hero-sub {
  font-size: clamp(1rem, 1.7vw, 1.25rem);
  font-weight: 300;
  font-style: italic;
  color: var(--off);
  max-width: 480px;
  line-height: 1.75;
  margin: 0;
}

@media (max-width: 768px) {
  .hero { padding: 0 1.5rem 4.5rem; }
  .hero-bottom { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}
</style>
