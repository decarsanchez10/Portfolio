<template>
  <section id="education" class="education-section">
    <div class="education-inner">

      <p class="sec-label fi" ref="labelEl">04 / Education</p>

      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">ACADEMIC</span></div>
        <div class="rev-line"><span ref="t2">JOURNEY</span></div>
      </h2>

      <div class="edu-grid">

        <!-- Quasar q-timeline -->
        <div class="fi" ref="timelineEl">
          <q-timeline color="red-8" layout="comfortable" dark>
            <q-timeline-entry
              v-for="e in education"
              :key="e.school"
              :subtitle="e.year"
              :title="e.school"
              icon="school"
              color="red-8"
            >
              <span class="edu-deg">{{ e.deg }}</span>
            </q-timeline-entry>
          </q-timeline>
        </div>

        <!-- Certifications -->
        <div class="fi fi-d2" ref="certEl">
          <p class="cat-title">Certifications</p>
          <div class="cert-list q-mt-md">
            <div
              v-for="cert in certs"
              :key="cert.name"
              class="cert-item"
              @mouseenter="onEnter"
              @mouseleave="onLeave"
            >
              <p class="cert-iss">{{ cert.issuer }}</p>
              <p class="cert-name">{{ cert.name }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from 'src/composables/useCursor'

gsap.registerPlugin(ScrollTrigger)
const { onEnter, onLeave } = useCursor()

const labelEl    = ref(null)
const t1         = ref(null)
const t2         = ref(null)
const timelineEl = ref(null)
const certEl     = ref(null)

const education = [
  { year: '2011 – 2016',    school: 'Cogon Elementary School',               deg: 'Primary Education'                      },
  { year: '2016 – 2020',    school: 'Guiuan National High School',            deg: 'Secondary Education'                    },
  { year: '2020 – 2022',    school: 'Immaculate Conception School of Guiuan', deg: 'Senior High School'                     },
  { year: '2022 – Present', school: 'ESSU – Salcedo Campus',                 deg: 'BS Computer Engineering (Expected 2027)' }
]

const certs = [
  { name: 'Introduction to Java Programming',          issuer: 'Programmiz'       },
  { name: 'Introduction to C++ Programming',           issuer: 'Programmiz'       },
  { name: 'Prompt Engineering',                        issuer: 'Programming Hero' },
  { name: 'Introduction to HTML and CSS',              issuer: 'IBM SkillBuild'   },
  { name: 'Developing Sites for the Web',              issuer: 'IBM SkillBuild'   },
  { name: 'Bringing Websites to Life with JavaScript', issuer: 'IBM SkillBuild'   }
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

  ;[labelEl.value, timelineEl.value, certEl.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => el.classList.add('vis')
    })
  })
})
</script>

<style lang="scss" scoped>
.education-section {
  padding: 9rem 0;
}

.education-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3rem;
}

.edu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem;
}

.edu-deg {
  font-size: 0.9rem;
  color: var(--gr);
  font-style: italic;
}

// ─── q-timeline overrides ───────────────────────────────────────
:deep(.q-timeline__subtitle) {
  font-family: 'Space Mono', monospace !important;
  font-size: 0.62rem !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: var(--c) !important;
}

:deep(.q-timeline__title) {
font-family: 'Cinzel', serif;
  font-size: 1.75rem !important;
  letter-spacing: 0.04em !important;
  color: var(--wh) !important;
  margin-bottom: 0.3rem !important;
}

:deep(.q-timeline__line) {
  background: var(--s2) !important;
}

// ─── CERTIFICATIONS ─────────────────────────────────────────────
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.cert-item {
  padding: 0.8rem 1rem;
  border-left: 2px solid var(--s2);
  transition:
    border-color 0.3s,
    padding-left 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-left-color: var(--c);
    padding-left: 1.5rem;

    .cert-name { color: var(--wh); }
  }
}

.cert-iss {
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: var(--c);
  text-transform: uppercase;
  margin: 0 0 0.25rem;
}

.cert-name {
  font-size: 0.92rem;
  color: var(--lgr);
  margin: 0;
  transition: color 0.3s;
}

@media (max-width: 1024px) {
  .edu-grid { grid-template-columns: 1fr; gap: 4rem; }
}

@media (max-width: 768px) {
  .education-inner { padding: 0 1.5rem; }
  .education-section { padding: 5.5rem 0; }
}
</style>
