<template>
  <section id="projects" class="proj-section">
    <div class="proj-inner">
      <p class="sec-label fi" ref="labelEl">✦ Featured Work</p>
      <p class="sec-label-mono fi fi-d1" ref="monoEl">04 / Projects</p>
      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">FEATURED</span></div>
        <div class="rev-line"><span ref="t2">PROJECTS</span></div>
      </h2>
      <div class="proj-grid">
        <q-card v-for="(p,i) in projects" :key="p.title" flat dark
          class="proj-card fi" :class="`fi-d${i+1}`"
          :ref="el => cardRefs[i]=el"
          @mouseenter="onEnter" @mouseleave="onLeave">
          <div class="proj-overlay" />
          <div class="proj-content">
            <div class="proj-top">
              <div class="proj-num shimmer-text">0{{ i+1 }}</div>
              <span class="proj-badge" v-if="p.badge">{{ p.badge }}</span>
            </div>
            <div>
              <span class="proj-arr">↗</span>
              <h3 class="proj-title">{{ p.title }}</h3>
              <p class="proj-desc">{{ p.desc }}</p>
              <div class="proj-tags row q-gutter-xs">
                <q-chip v-for="t in p.tags" :key="t" dense dark class="proj-chip">{{ t }}</q-chip>
              </div>
            </div>
          </div>
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
const monoEl   = ref(null)
const t1       = ref(null)
const t2       = ref(null)
const cardRefs = reactive([])

const projects = [
  {
    title: 'Blockchain Web Project',
    badge: '🌐 Internship',
    desc:  'Developed during my internship at SciBiz Informatics. A modern web application leveraging secure decentralized concepts and seamless data presentation with optimized front-end performance.',
    tags:  ['Vue.js','Quasar','Blockchain','JavaScript','CSS3']
  },
  {
    title: 'Barangay Information System',
    desc:  'A comprehensive digital management system automating resident profiling, blotter record tracking, and automated issuance of local certificates — eliminating manual paperwork delays.',
    tags:  ['PHP','MySQL','HTML5','CSS','JavaScript']
  },
  {
    title: 'Attendance Enforcement & Penalty System',
    desc:  'Automated compliance tracker for university events. Custom backend logic tracks real-time attendance and auto-calculates penalties, minimizing human error and admin overhead.',
    tags:  ['PHP','SQL','JavaScript','HTML5','CSS']
  },
  {
    title: '"Raced" Landing Page',
    badge: '🏎️ 3D',
    desc:  'Lead Developer on a high-performance 3D interactive landing page for a Cognate Elective project, emphasizing modern UI/UX design, immersive Three.js visuals, and fast loading speeds.',
    tags:  ['Three.js','HTML5','CSS','JavaScript']
  }
]

onMounted(() => {
  gsap.set([t1.value, t2.value], { y: '110%' })
  ;[labelEl.value, monoEl.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => el.classList.add('vis') })
  })
  ScrollTrigger.create({
    trigger: t1.value, start: 'top 87%',
    onEnter: () => {
      gsap.to(t1.value, { y: 0, duration: 0.95, ease: 'power3.out' })
      gsap.to(t2.value, { y: 0, duration: 0.95, ease: 'power3.out', delay: 0.09 })
    }
  })
  cardRefs.forEach(card => {
    if (!card?.$el) return
    ScrollTrigger.create({ trigger: card.$el, start: 'top 88%', onEnter: () => card.$el.classList.add('vis') })
  })
})
</script>

<style lang="scss" scoped>
.proj-section { background: var(--s1); padding: 9rem 0; position: relative;
  &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, var(--gold), transparent); opacity: .25; }
}
.proj-inner { max-width: 1440px; margin: 0 auto; padding: 0 3rem; }
.proj-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2px; }

.proj-card {
  background: var(--bg) !important; border-radius: 0 !important;
  overflow: hidden !important; position: relative;
  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--burg), rgba(114,47,55,.9));
    transform: translateY(101%); transition: transform .65s cubic-bezier(.16,1,.3,1); z-index: 0;
  }
  &:hover {
    &::after { transform: translateY(0); }
    .proj-num { color: rgba(255,245,230,.12); }
    .proj-desc { color: rgba(255,245,230,.82); }
    .proj-arr { transform: translate(5px,-5px); color: var(--gold-lt); }
    :deep(.proj-chip) { background: rgba(201,168,76,.2) !important; color: var(--gold-lt) !important; border-color: rgba(201,168,76,.4) !important; }
  }
}
.proj-content {
  position: relative; z-index: 1;
  min-height: 380px; display: flex; flex-direction: column;
  justify-content: space-between; padding: 3rem 2.5rem;
}
.proj-top { display: flex; justify-content: space-between; align-items: flex-start; }
.proj-num {
  font-family: var(--font-display); font-size: 5.5rem;
  line-height: 1; color: var(--s2); transition: color .4s; font-weight: 900;
}
.proj-badge {
  font-family: var(--font-mono); font-size: .58rem; letter-spacing: .15em;
  text-transform: uppercase; padding: .3rem .8rem;
  border: 1px solid rgba(201,168,76,.3); color: var(--gold);
  white-space: nowrap;
}
.proj-arr {
  position: absolute; top: 2.5rem; right: 2.5rem; font-size: 1.3rem;
  color: var(--gold); transition: transform .4s cubic-bezier(.16,1,.3,1), color .3s;
}
.proj-title {
  font-family: var(--font-display); font-size: 1.6rem;
  letter-spacing: .06em; margin: 0 0 .9rem; line-height: 1.2;
  color: var(--cream);
}
.proj-desc { font-size: .95rem; line-height: 1.75; color: var(--gr); flex: 1; margin-bottom: 1.5rem; transition: color .4s; }

:deep(.proj-chip) {
  border-radius: 0 !important; font-family: var(--font-mono) !important;
  font-size: .56rem !important; letter-spacing: .12em !important;
  text-transform: uppercase !important; background: transparent !important;
  border: 1px solid rgba(201,168,76,.25) !important; color: var(--gold) !important;
  transition: all .3s !important;
}

@media (max-width: 1024px) { .proj-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .proj-inner { padding: 0 1.5rem; } .proj-section { padding: 5.5rem 0; } }
</style>