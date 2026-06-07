<template>
  <section id="contact" class="contact-section">
    <div class="contact-inner">

      <p class="sec-label fi" ref="labelEl">05 / Contact</p>

      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">LET'S</span></div>
        <div class="rev-line"><span ref="t2">CONNECT</span></div>
      </h2>

      <p class="contact-sub fi fi-d1" ref="subEl">
        Open to OJT opportunities, freelance projects, and meaningful collaborations.<br />
        Let's build something impactful together.
      </p>

      <a
        href="mailto:sanchezdecar10@hotmail.com"
        class="contact-email fi fi-d2"
        ref="emailEl"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      >
        sanchezdecar10@hotmail.com
      </a>

      <div class="contact-links fi fi-d3" ref="linksEl">
        <a
          href="https://www.linkedin.com/in/decar-sanchez-0858b7313"
          target="_blank"
          class="c-link"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >LinkedIn</a>

        <a
          href="tel:09264534351"
          class="c-link"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >+63 926 453 4351</a>

        <span class="c-link no-link">Guiuan, Eastern Samar</span>
      </div>

    </div>
  </section>

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
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from 'src/composables/useCursor'
import { scroll } from 'quasar'

gsap.registerPlugin(ScrollTrigger)
const { onEnter, onLeave } = useCursor()
const { getScrollTarget, setVerticalScrollPosition } = scroll


const labelEl = ref(null)
const t1      = ref(null)
const t2      = ref(null)
const subEl   = ref(null)
const emailEl = ref(null)
const linksEl = ref(null)

onMounted(() => {
  gsap.set([t1.value, t2.value], { y: '110%' })

  ScrollTrigger.create({
    trigger: t1.value, start: 'top 87%',
    onEnter: () => {
      gsap.to(t1.value, { y: 0, duration: 0.95, ease: 'power3.out' })
      gsap.to(t2.value, { y: 0, duration: 0.95, ease: 'power3.out', delay: 0.09 })
    }
  })

  ;[labelEl.value, subEl.value, emailEl.value, linksEl.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({
      trigger: el, start: 'top 90%',
      onEnter: () => el.classList.add('vis')
    })
  })

  // Magnetic effect on email
  const email = emailEl.value
  if (email) {
    email.addEventListener('mousemove', (e) => {
      const r  = email.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width  / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      gsap.to(email, { x: dx * 0.18, y: dy * 0.18, duration: 0.4, ease: 'power2.out' })
    })
    email.addEventListener('mouseleave', () => {
      gsap.to(email, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.5)' })
    })
  }
})

const scrollToTop = () => {
  const target = getScrollTarget(document.body)
  setVerticalScrollPosition(target, 0, 700)
}
</script>

<style lang="scss" scoped>
.contact-section {
  background: var(--s1);
  padding: 9rem 0;
}

.contact-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3rem;
}

.contact-sub {
  font-size: 1.2rem;
  color: var(--gr);
  margin-bottom: 2.5rem;
  max-width: 520px;
  line-height: 1.85;
  font-weight: 300;
}

.contact-email {
font-family: 'Cinzel', serif;
  font-size: clamp(1rem, 3.3vw, 3.3rem);
  color: var(--wh);
  display: inline-block;
  position: relative;
  line-height: 1.1;
  letter-spacing: 0.02em;
  transition: color 0.35s;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--c);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    color: var(--c);
    &::after { transform: scaleX(1); transform-origin: left; }
  }
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 3rem;
}

.c-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gr);
  text-decoration: none;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before { content: '↗'; color: var(--c); }
  &:hover { color: var(--wh); }
  &.no-link::before { content: '◦'; }
}

@media (max-width: 768px) {
  .contact-inner { padding: 0 1.5rem; }
  .contact-section { padding: 5.5rem 0; }
  .contact-links { gap: 1.5rem; }
}
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
