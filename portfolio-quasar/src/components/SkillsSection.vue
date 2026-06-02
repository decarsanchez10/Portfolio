<template>
  <section id="skills" class="skills-section">
    <div class="skills-inner">

      <p class="sec-label fi" ref="labelEl">03 / Skills</p>

      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">TECHNICAL</span></div>
        <div class="rev-line"><span ref="t2">ARSENAL</span></div>
      </h2>

      <div class="skill-cats">
        <div
          v-for="(cat, i) in skillCats"
          :key="cat.title"
          class="fi"
          :class="`fi-d${(i % 3) + 1}`"
          :ref="el => catRefs[i] = el"
        >
          <p class="cat-title">{{ cat.title }}</p>
          <div class="tags-row">
            <q-chip
              v-for="sk in cat.skills"
              :key="sk"
              dense dark
              class="sk-chip"
              @mouseenter="onEnter"
              @mouseleave="onLeave"
            >{{ sk }}</q-chip>
          </div>
        </div>
      </div>

      <!-- Soft Skills -->
      <div class="q-mt-xl fi fi-d2" ref="softEl">
        <p class="cat-title">Soft Skills</p>
        <div class="tags-row">
          <q-chip
            v-for="s in softSkills"
            :key="s"
            dense dark
            class="soft-chip"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
          >{{ s }}</q-chip>
        </div>
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

const labelEl = ref(null)
const softEl  = ref(null)
const t1      = ref(null)
const t2      = ref(null)
const catRefs = reactive([])

const skillCats = [
  {
    title:  'Languages',
    skills: ['PHP', 'Python', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML5', 'CSS3']
  },
  {
    title:  'Technologies',
    skills: ['MySQL', 'Three.js', 'Networking', 'Security', 'Breadboarding']
  },
  {
    title:  'Languages Spoken',
    skills: ['English', 'Tagalog', 'Waray-waray']
  }
]

const softSkills = ['Problem Solving', 'Adaptability', 'Communication', 'Team Collaboration']

onMounted(() => {
  gsap.set([t1.value, t2.value], { y: '110%' })

  ScrollTrigger.create({
    trigger: t1.value, start: 'top 87%',
    onEnter: () => {
      gsap.to(t1.value, { y: 0, duration: 0.95, ease: 'power3.out' })
      gsap.to(t2.value, { y: 0, duration: 0.95, ease: 'power3.out', delay: 0.09 })
    }
  })

  ;[labelEl.value, softEl.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => el.classList.add('vis')
    })
  })

  catRefs.forEach(el => {
    if (!el) return
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => el.classList.add('vis')
    })
  })
})
</script>

<style lang="scss" scoped>
.skills-section {
  padding: 9rem 0;
}

.skills-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3rem;
}

.skill-cats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 3.5rem;
  margin-top: 0;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

:deep(.sk-chip) {
  border-radius: 0 !important;
  font-family: 'Space Mono', monospace !important;
  font-size: 0.68rem !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  background: transparent !important;
  border: 1px solid var(--s2) !important;
  color: var(--lgr) !important;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;

  &:hover {
    background: var(--c) !important;
    color: var(--wh) !important;
    border-color: var(--c) !important;
  }
}

:deep(.soft-chip) {
  border-radius: 0 !important;
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 1.1rem !important;
  font-style: italic !important;
  background: transparent !important;
  border: 1px solid var(--s2) !important;
  color: var(--gr) !important;
  transition: color 0.3s, border-color 0.3s !important;

  &:hover {
    color: var(--c) !important;
    border-color: var(--c) !important;
  }
}

@media (max-width: 768px) {
  .skills-inner { padding: 0 1.5rem; }
  .skills-section { padding: 5.5rem 0; }
}
</style>
