<template>
  <section id="about" class="about-section">
    <div class="about-inner">

      <p class="sec-label fi" ref="labelEl">01 / About</p>

      <div class="about-grid">
        <!-- Left: text -->
        <div>
          <h2 class="sec-title">
            <div class="rev-line"><span ref="t1">WHO</span></div>
            <div class="rev-line"><span ref="t2">I AM</span></div>
          </h2>

          <!-- Typing text container -->
          <p class="about-body" ref="bodyEl">
            <span v-html="typedText" />
            <span v-if="showCursor" class="typing-cursor">|</span>
          </p>

          <div class="q-mt-xl fi fi-d2" ref="ctaEl">
            <q-btn
              outline no-caps unelevated
              class="btn-crimson"
              label="Get in Touch"
              icon-right="arrow_forward"
              href="mailto:sanchezdecar10@hotmail.com"
              @mouseenter="onEnter"
              @mouseleave="onLeave"
            />
          </div>
        </div>

        <!-- Right: stat cards -->
        <div class="stat-grid">
          <q-card
            v-for="(stat, i) in stats"
            :key="stat.label"
            flat dark
            class="stat-card fi"
            :class="`fi-d${i % 3 + 1}`"
            :ref="el => statRefs[i] = el"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
          >
            <q-card-section>
              <div class="stat-n">{{ stat.value }}</div>
              <div class="stat-l">{{ stat.label }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from 'src/composables/useCursor'

gsap.registerPlugin(ScrollTrigger)
const { onEnter, onLeave } = useCursor()

// ─── REFS ────────────────────────────────────────────────────────
const labelEl  = ref(null)
const bodyEl   = ref(null)
const ctaEl    = ref(null)
const t1       = ref(null)
const t2       = ref(null)
const statRefs = reactive([])

// ─── TYPING STATE ─────────────────────────────────────────────────
const typedText  = ref('')
const showCursor = ref(false)
let   typingTimer = null

const fullText = `Motivated <strong>Computer Engineering student</strong> at ESSU – Salcedo Campus with hands-on experience building real-world systems. From automating barangay governance to crafting <strong>immersive 3D experiences</strong> with Three.js, I write clean, purposeful code that makes an impact.<br/><br/>As a <strong>freelance developer</strong> since 2026, I've delivered full-stack solutions for real clients. Fluent in English, Tagalog, and Waray-waray — driven by adaptability, clear communication, and genuine passion for problem solving.`

// Strip HTML tags to get plain text length for typing
const plainText = fullText.replace(/<[^>]*>/g, '')

const startTyping = () => {
  typedText.value  = ''
  showCursor.value = true

  // Type character by character over the full string including HTML
  let i = 0
  const typeNext = () => {
    if (i < fullText.length) {
      typedText.value = fullText.slice(0, i + 1)
      i++
      // Skip ahead fast through HTML tags so they don't show char by char
      if (fullText[i] === '<') {
        const closeTag = fullText.indexOf('>', i)
        if (closeTag !== -1) {
          i = closeTag + 1
          typedText.value = fullText.slice(0, i)
        }
      }
      typingTimer = setTimeout(typeNext, 18)
    } else {
      // Done typing — blink cursor then hide
      setTimeout(() => { showCursor.value = false }, 2000)
    }
  }
  typeNext()
}

// ─── DATA ────────────────────────────────────────────────────────
const stats = [
  { value: '3+',  label: 'Projects Built'     },
  { value: '7+',  label: 'Languages & Tools'  },
  { value: '6+',  label: 'Certifications'      },
  { value: '2027',label: 'Expected Graduation' }
]

// ─── LIFECYCLE ───────────────────────────────────────────────────
onMounted(() => {
  // Title reveal
  gsap.set([t1.value, t2.value], { y: '110%' })
  ScrollTrigger.create({
    trigger: t1.value, start: 'top 87%',
    onEnter: () => {
      gsap.to(t1.value, { y: 0, duration: 0.95, ease: 'power3.out' })
      gsap.to(t2.value, { y: 0, duration: 0.95, ease: 'power3.out', delay: 0.09 })
    }
  })

  // Label + CTA fade in
  ;[labelEl.value, ctaEl.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => el.classList.add('vis')
    })
  })

  // Trigger typing when body comes into view
  if (bodyEl.value) {
    ScrollTrigger.create({
      trigger: bodyEl.value,
      start: 'top 80%',
      once: true,
      onEnter: () => startTyping()
    })
  }

  // Stat cards
  statRefs.forEach((card) => {
    if (!card?.$el) return
    ScrollTrigger.create({
      trigger: card.$el, start: 'top 88%',
      onEnter: () => card.$el.classList.add('vis')
    })
  })
})

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer)
})
</script>

<style lang="scss" scoped>
.about-section {
  padding: 9rem 0;
}
.about-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3rem;
}
.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 7rem;
  align-items: start;
}
.about-body {
  font-size: clamp(1.05rem, 1.4vw, 1.25rem);
  font-weight: 300;
  line-height: 1.9;
  color: var(--lgr);
  min-height: 12rem; /* prevent layout jump while typing */

  :deep(strong) { color: var(--wh); font-weight: 600; }
}
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}
.stat-card {
  background: var(--s1) !important;
  border-radius: 0 !important;
  position: relative;
  overflow: hidden !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;

  &::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--c); transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:hover { transform: translateY(-5px) !important; &::before { transform: scaleX(1); } }
  :deep(.q-card__section) { padding: 2.5rem 2rem; }
}
.stat-n {
  font-family: 'Cinzel', serif;
  font-size: 4rem;
  line-height: 1;
  color: var(--c);
  font-weight: 700;
}
.stat-l {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gr);
  margin-top: 0.5rem;
}
@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr; gap: 4rem; }
}
@media (max-width: 768px) {
  .about-inner { padding: 0 1.5rem; }
  .about-section { padding: 5.5rem 0; }
}
</style>