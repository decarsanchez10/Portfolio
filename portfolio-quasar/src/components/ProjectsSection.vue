<template>
  <section id="projects" class="projects-section">
    <div class="projects-inner">

      <p class="sec-label fi" ref="labelEl">02 / Work</p>

      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">SELECTED</span></div>
        <div class="rev-line"><span ref="t2">PROJECTS</span></div>
      </h2>

      <div class="proj-grid">
        <q-card
          v-for="(project, i) in projects"
          :key="project.title"
          flat dark
          class="proj-card fi"
          :class="`fi-d${i + 1}`"
          :ref="el => cardRefs[i] = el"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >
          <!-- Red overlay (CSS :after handles this) -->
          <q-card-section class="proj-content">
            <div class="proj-num">0{{ i + 1 }}</div>
            <div>
              <span class="proj-arr">↗</span>
              <h3 class="proj-title">{{ project.title }}</h3>
              <p class="proj-desc">{{ project.desc }}</p>
              <div class="proj-tags row q-gutter-xs">
                <q-chip
                  v-for="tag in project.tags"
                  :key="tag"
                  dense dark
                  class="proj-chip"
                >{{ tag }}</q-chip>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from 'src/composables/useCursor'

gsap.registerPlugin(ScrollTrigger)
const { onEnter, onLeave } = useCursor()

const labelEl  = ref(null)
const t1       = ref(null)
const t2       = ref(null)
const cardRefs = reactive([])

const projects = [
  {
    title: 'Barangay Information System',
    desc:  'A comprehensive digital management platform automating resident profiling, blotter record tracking, and automated issuance of local certificates for local governance.',
    tags:  ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Attendance Enforcement & Penalty System',
    desc:  'Automated logic engine tracking student attendance during campus events and calculating penalties for non-compliance — replacing manual processes with smart automation.',
    tags:  ['PHP', 'SQL', 'JavaScript', 'HTML', 'CSS']
  },
  {
    title: '"Raced" Landing Page',
    desc:  'A high-performance 3D modern landing page built as a Cognate Elective project, featuring immersive Three.js visuals, clean UI/UX principles, and fast load times.',
    tags:  ['HTML', 'CSS', 'Three.js']
  }
]

onMounted(() => {
  gsap.set([t1.value, t2.value], { y: '110%' })

  ScrollTrigger.create({
    trigger: t1.value, start: 'top 87%',
    onEnter: () => {
      gsap.to(t1.value, { y: 0, duration: 0.95, ease: 'power3.out' })
      gsap.to(t2.value, { y: 0, duration: 0.95, ease: 'power3.out', delay: 0.09 })
    }
  })

  if (labelEl.value) {
    ScrollTrigger.create({
      trigger: labelEl.value, start: 'top 88%',
      onEnter: () => labelEl.value.classList.add('vis')
    })
  }

  cardRefs.forEach((card, i) => {
    if (!card?.$el) return
    ScrollTrigger.create({
      trigger: card.$el, start: 'top 88%',
      onEnter: () => card.$el.classList.add('vis')
    })
  })
})
</script>

<style lang="scss" scoped>
.projects-section {
  background: var(--s1);
  padding: 9rem 0;
}

.projects-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3rem;
}

.proj-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 0;
}

.proj-card {
  background: var(--bg) !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  position: relative;

  // Crimson overlay slides up on hover
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--c);
    transform: translateY(101%);
    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 0;
  }

  &:hover {
    &::after { transform: translateY(0); }
    .proj-num  { color: rgba(255, 255, 255, 0.12); }
    .proj-desc { color: rgba(255, 255, 255, 0.82); }
    .proj-arr  { transform: translate(5px, -5px); color: var(--wh); }

    :deep(.proj-chip) {
      background: rgba(255, 255, 255, 0.15) !important;
      color: var(--wh) !important;
      border-color: rgba(255, 255, 255, 0.35) !important;
    }
  }
}

.proj-content {
  position: relative;
  z-index: 1;
  min-height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 2.5rem !important;
}

.proj-num {
font-family: 'Cinzel', serif;
  font-size: 6rem;
  line-height: 1;
  color: var(--s2);
  transition: color 0.4s;
}

.proj-arr {
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  font-size: 1.3rem;
  color: var(--c);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
}

.proj-title {
  font-family: 'Cinzel', serif;
  font-size: 2.1rem;
  letter-spacing: 0.04em;
  margin: 0 0 0.9rem;
  line-height: 1.05;
}

.proj-desc {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--gr);
  flex: 1;
  margin-bottom: 1.75rem;
  transition: color 0.4s;
}

:deep(.proj-chip) {
  border-radius: 0 !important;
  font-family: 'Space Mono', monospace !important;
  font-size: 0.58rem !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  background: transparent !important;
  border: 1px solid rgba(200, 16, 46, 0.35) !important;
  color: var(--c) !important;
  transition: background 0.3s, color 0.3s, border-color 0.3s !important;
}

@media (max-width: 1100px) {
  .proj-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .projects-inner { padding: 0 1.5rem; }
  .projects-section { padding: 5.5rem 0; }
  .proj-grid { grid-template-columns: 1fr; }
}
</style>
