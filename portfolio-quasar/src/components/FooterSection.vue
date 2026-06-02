<template>
  <footer class="site-footer">
    <span class="f-copy">© 2026 Decar A. Sanchez. All rights reserved.</span>
    <q-btn
      flat no-caps dense
      class="f-top-btn"
      icon="arrow_upward"
      label="Back to top"
      @click="scrollToTop"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    />
    <span class="f-logo">DAS</span>
  </footer>
</template>

<script setup>
import { scroll } from 'quasar'
import { useCursor } from 'src/composables/useCursor'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const { onEnter, onLeave } = useCursor()

const scrollToTop = () => {
  const target = getScrollTarget(document.body)
  setVerticalScrollPosition(target, 0, 700)
}
</script>

<style lang="scss" scoped>
.site-footer {
  background: var(--bg);
  padding: 2rem 3rem;
  border-top: 1px solid var(--s2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.f-copy {
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: var(--gr);
  text-transform: uppercase;
}

.f-logo {
font-family: 'Cinzel', serif;
  font-size: 1.7rem;
  color: var(--c);
  letter-spacing: 0.1em;
}

.f-top-btn {
  font-family: 'Space Mono', monospace !important;
  font-size: 0.6rem !important;
  letter-spacing: 0.15em !important;
  text-transform: uppercase !important;
  color: var(--gr) !important;
  transition: color 0.3s !important;

  &:hover { color: var(--c) !important; }
}

@media (max-width: 768px) {
  .site-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 2rem 1.5rem;
  }
}
</style>
