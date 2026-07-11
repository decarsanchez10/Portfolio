<template>
  <section id="skills" class="skills-sec" ref="secRef">
    <!-- Background decorations -->
    <div class="bg-orb orb-1" />
    <div class="bg-orb orb-2" />
    <div class="bg-orb orb-3" />
    <div class="bg-ring ring-1" />
    <div class="bg-ring ring-2" />
    <canvas class="particles-canvas" ref="canvas" />

    <div class="skills-in">
      <!-- Header -->
      <div class="skills-header">
        <p class="sec-label fi" ref="lbl">✦ Proficiency</p>
        <p class="sec-label-mono fi fi-d1" ref="mono">05 / Skills</p>
        <h2 class="sec-title">
          <div class="rev-line"><span ref="t1">TECHNICAL</span></div>
          <div class="rev-line"><span ref="t2">SKILLS</span></div>
        </h2>
        <p class="skills-sub">Tools, languages &amp; frameworks I wield to craft digital experiences.</p>
      </div>

      <!-- 2×2 Grid -->
      <div class="skills-grid">
        <div
          v-for="(cat, ci) in categories"
          :key="cat.label"
          class="skill-card"
          :ref="el => cardRefs[ci] = el"
          @mouseenter="onCardEnter($event, ci)"
          @mouseleave="onCardLeave($event, ci)"
        >
          <!-- Card glow blob that follows mouse -->
          <div class="card-glow" :ref="el => glowRefs[ci] = el" />

          <!-- Card header -->
          <div class="card-head">
            <div class="card-icon-wrap">
              <span class="card-icon" v-html="cat.icon" />
            </div>
            <div class="card-head-text">
              <h3 class="card-label">{{ cat.label }}</h3>
              <p class="card-sub">{{ cat.sub }}</p>
            </div>
          </div>

          <div class="card-divider" />

          <!-- Skills -->
          <div class="skill-list">
            <div
              v-for="(skill, si) in cat.skills"
              :key="skill.name"
              class="skill-row"
              :ref="el => rowRefs[`${ci}-${si}`] = el"
              @mouseenter="onEnter"
              @mouseleave="onLeave"
            >
              <div class="skill-top">
                <div class="skill-left">
                  <div class="skill-logo-wrap">
                    <img :src="skill.logo" :alt="skill.name" class="skill-logo" />
                  </div>
                  <span class="skill-name">{{ skill.name }}</span>
                </div>
                <div class="skill-right">
                  <span class="skill-badge" :class="badgeClass(skill.pct)">{{ badgeLabel(skill.pct) }}</span>
                  <span class="skill-pct" :ref="el => pctEls[`${ci}-${si}`] = el">0%</span>
                </div>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  :ref="el => barEls[`${ci}-${si}`] = el"
                  :data-pct="skill.pct"
                >
                  <div class="bar-shimmer" />
                  <div class="bar-tip" />
                </div>
              </div>
            </div>
          </div>
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

const secRef   = ref(null)
const canvas   = ref(null)
const lbl      = ref(null)
const mono     = ref(null)
const t1       = ref(null)
const t2       = ref(null)
const cardRefs = reactive([])
const glowRefs = reactive([])
const rowRefs  = reactive({})
const barEls   = reactive({})
const pctEls   = reactive({})

// ── Badge helpers ────────────────────────────────────────────────
const badgeLabel = (pct) => {
  if (pct >= 90) return 'Expert'
  if (pct >= 65) return 'Advanced'
  if (pct >= 35) return 'Intermediate'
  return 'Beginner'
}
const badgeClass = (pct) => {
  if (pct >= 90) return 'badge-expert'
  if (pct >= 65) return 'badge-advanced'
  if (pct >= 35) return 'badge-inter'
  return 'badge-beginner'
}

// ── Data ─────────────────────────────────────────────────────────
const DI = (p) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${p}`
const L  = (name, logo, pct) => ({ name, logo, pct })

const categories = [
  {
    label: 'Languages',
    sub: 'Programming languages I work with.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    skills: [
      L('JavaScript', DI('javascript/javascript-original.svg'), 50),
      L('Python',     DI('python/python-original.svg'),         20),
      L('PHP',        DI('php/php-original.svg'),               30),
      L('Java',       DI('java/java-original.svg'),             50),
      L('C++',        DI('cplusplus/cplusplus-original.svg'),   40),
    ]
  },
  {
    label: 'Frontend',
    sub: 'Building responsive and interactive interfaces.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    skills: [
      L('HTML5',  DI('html5/html5-original.svg'),                  100),
      L('CSS3',   DI('css3/css3-original.svg'),                    100),
      L('Vue.js', DI('vuejs/vuejs-original.svg'),                   60),
      L('Quasar', 'https://cdn.quasar.dev/logo-v2/svg/logo.svg',   90),
    ]
  },
  {
    label: 'Backend & DB',
    sub: 'Server, databases and backend technologies.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    skills: [
      L('Django',     DI('django/django-plain.svg'),            30),
      L('PostgreSQL', DI('postgresql/postgresql-original.svg'), 40),
      L('MySQL',      DI('mysql/mysql-original.svg'),           60),
    ]
  },
  {
    label: 'Tools & 3D',
    sub: 'Development tools and 3D workflow technologies.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
    skills: [
      L('Docker',   DI('docker/docker-original.svg'),                50),
      L('Git',      DI('git/git-original.svg'),                      70),
      L('GSAP',     'https://cdn.simpleicons.org/greensock/88ce02',  50),
      L('Three.js', DI('threejs/threejs-original.svg'),              40),
    ]
  }
]

// ── Mouse-follow glow on card ────────────────────────────────────
const onCardEnter = (e, i) => {
  onEnter()
  gsap.to(glowRefs[i], { opacity: 1, duration: .4 })
}
const onCardLeave = (e, i) => {
  onLeave()
  gsap.to(glowRefs[i], { opacity: 0, duration: .6 })
}
const handleCardMouse = (e, i) => {
  const card = cardRefs[i]
  const glow = glowRefs[i]
  if (!card || !glow) return
  const r = card.getBoundingClientRect()
  gsap.set(glow, { x: e.clientX - r.left - 150, y: e.clientY - r.top - 150 })
}

// ── Particle canvas ──────────────────────────────────────────────
let animFrame = null
const initParticles = () => {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
  resize()
  window.addEventListener('resize', resize)

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 1.5 + .5,
    dx: (Math.random() - .5) * .3,
    dy: -Math.random() * .4 - .1,
    a: Math.random(),
  }))

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212,146,10,${p.a * .6})`
      ctx.shadowBlur = 6
      ctx.shadowColor = 'rgba(212,146,10,.5)'
      ctx.fill()
      p.x += p.dx; p.y += p.dy; p.a -= .002
      if (p.a <= 0 || p.y < 0) {
        p.x = Math.random() * c.width
        p.y = c.height + 5
        p.a = Math.random()
      }
    })
    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

// ── Mount ────────────────────────────────────────────────────────
onMounted(() => {
  initParticles()
  gsap.set([t1.value, t2.value], { y: '110%' })

  ;[lbl.value, mono.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => el.classList.add('vis') })
  })
  ScrollTrigger.create({
    trigger: t1.value, start: 'top 87%',
    onEnter: () => {
      gsap.to(t1.value, { y: 0, duration: .95, ease: 'power3.out' })
      gsap.to(t2.value, { y: 0, duration: .95, ease: 'power3.out', delay: .09 })
    }
  })

  // Attach mouse-move to each card
  cardRefs.forEach((card, i) => {
    if (!card) return
    card.addEventListener('mousemove', e => handleCardMouse(e, i))
  })

  // Animate cards + bars on scroll
  cardRefs.forEach((card, ci) => {
    if (!card) return
    ScrollTrigger.create({
      trigger: card, start: 'top 82%', once: true,
      onEnter: () => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: .97 },
          { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'power3.out', delay: ci * .1 }
        )
        const bars = card.querySelectorAll('.bar-fill')
        const pcts = card.querySelectorAll('.skill-pct')
        bars.forEach((bar, si) => {
          const target = parseInt(bar.dataset.pct)
          const pEl = pcts[si]
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: target + '%', duration: 1.6, ease: 'power3.out', delay: .3 + si * .1,
              onUpdate() {
                if (pEl) pEl.textContent = Math.round(parseFloat(bar.style.width)) + '%'
              },
              onComplete() { if (pEl) pEl.textContent = target + '%' }
            }
          )
        })
        // Row fade-in stagger
        card.querySelectorAll('.skill-row').forEach((row, ri) => {
          gsap.fromTo(row,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: .55, ease: 'power2.out', delay: .25 + ri * .08 }
          )
        })
      }
    })
  })
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>

<style lang="scss" scoped>
/* ── Section shell ── */
.skills-sec {
  padding: 10rem 0 9rem;
  position: relative;
  background:
    radial-gradient(ellipse 80% 60% at 15% 40%, rgba(155,16,32,0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 85% 70%, rgba(155,16,32,0.12), transparent 55%),
    var(--bg);
  overflow: hidden;

  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), transparent); opacity: .3;
  }
}

/* ── Background elements ── */
.bg-orb {
  position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px);
}
.orb-1 { width: 500px; height: 500px; top: -10%; left: -10%; background: rgba(155,16,32,.12); }
.orb-2 { width: 400px; height: 400px; bottom: -5%; right: -8%; background: rgba(212,146,10,.07); }
.orb-3 { width: 300px; height: 300px; top: 40%; left: 60%; background: rgba(155,16,32,.08); }

.bg-ring {
  position: absolute; border-radius: 50%; pointer-events: none;
  border: 1px solid rgba(212,146,10,.07);
}
.ring-1 { width: 600px; height: 600px; top: -150px; left: -200px; }
.ring-2 { width: 800px; height: 800px; bottom: -250px; right: -300px; }

.particles-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;
}

/* ── Content ── */
.skills-in {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto; padding: 0 3rem;
}

.skills-header { margin-bottom: 5rem; }
.skills-sub {
  font-size: clamp(.9rem, 1.2vw, 1.05rem); color: var(--gr);
  font-weight: 300; margin-top: 1.25rem; max-width: 480px;
}

/* ── 2×2 Grid ── */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* ── Glass Card ── */
.skill-card {
  position: relative; overflow: hidden;
  border-radius: 18px;
  background: rgba(18, 0, 8, 0.7);
  border: 1px solid rgba(212,146,10,.18);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  padding: 2.5rem 2.5rem 2rem;
  opacity: 0; /* animated in by GSAP */
  box-shadow:
    0 0 0 1px rgba(212,146,10,.06) inset,
    0 20px 60px rgba(0,0,0,.5),
    0 1px 0 rgba(212,146,10,.12) inset;
  transition: border-color .4s, box-shadow .4s;

  &::before {
    content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(to right, transparent, rgba(212,146,10,.5), transparent);
  }
  &::after {
    content: ''; position: absolute; inset: 0; border-radius: 18px;
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,146,10,.04), transparent 70%);
    pointer-events: none;
  }
  &:hover {
    border-color: rgba(212,146,10,.4);
    box-shadow:
      0 0 0 1px rgba(212,146,10,.15) inset,
      0 30px 80px rgba(0,0,0,.6),
      0 0 40px rgba(212,146,10,.06);
  }
}

/* Mouse-follow glow */
.card-glow {
  position: absolute; width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(212,146,10,.12), transparent 70%);
  pointer-events: none; opacity: 0; top: 0; left: 0;
  transform: translate(0,0); z-index: 0;
}

/* ── Card Header ── */
.card-head {
  display: flex; align-items: center; gap: 1.1rem; margin-bottom: 1.5rem;
  position: relative; z-index: 1;
}
.card-icon-wrap {
  width: 50px; height: 50px; flex-shrink: 0;
  border-radius: 12px;
  background: rgba(212,146,10,.08);
  border: 1px solid rgba(212,146,10,.25);
  display: flex; align-items: center; justify-content: center;
  color: var(--gold);
  box-shadow: 0 0 20px rgba(212,146,10,.1) inset;
}
.card-label {
  font-family: var(--font-d); font-size: 1.05rem; letter-spacing: .1em;
  color: var(--cream); margin: 0 0 .2rem; text-transform: uppercase;
}
.card-sub {
  font-family: var(--font-m); font-size: .52rem; letter-spacing: .1em;
  color: var(--gr); margin: 0; line-height: 1.5;
}

.card-divider {
  height: 1px; margin-bottom: 1.75rem;
  background: linear-gradient(to right, rgba(212,146,10,.2), rgba(212,146,10,.05), transparent);
  position: relative; z-index: 1;
}

/* ── Skill rows ── */
.skill-list { display: flex; flex-direction: column; gap: 1.2rem; position: relative; z-index: 1; }

.skill-row { opacity: 0; } /* animated in by GSAP */

.skill-top {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: .55rem;
}
.skill-left { display: flex; align-items: center; gap: .65rem; }

.skill-logo-wrap {
  width: 26px; height: 26px; flex-shrink: 0;
  border-radius: 6px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  transition: background .3s, border-color .3s, box-shadow .3s;
  .skill-row:hover & {
    background: rgba(212,146,10,.12);
    border-color: rgba(212,146,10,.3);
    box-shadow: 0 0 10px rgba(212,146,10,.2);
  }
}
.skill-logo {
  width: 17px; height: 17px; object-fit: contain;
  filter: brightness(.8) saturate(.6);
  transition: filter .3s;
  .skill-row:hover & { filter: brightness(1.1) saturate(1); }
}
.skill-name {
  font-family: var(--font-m); font-size: .6rem; letter-spacing: .14em;
  text-transform: uppercase; color: var(--lgr);
  transition: color .3s;
  .skill-row:hover & { color: var(--cream); }
}

.skill-right { display: flex; align-items: center; gap: .55rem; }

/* Proficiency badge */
.skill-badge {
  font-family: var(--font-m); font-size: .45rem; letter-spacing: .15em;
  text-transform: uppercase; padding: .2rem .55rem; border-radius: 20px;
  white-space: nowrap;
  &.badge-expert   { background: rgba(240,184,48,.15); color: #F0B830; border: 1px solid rgba(240,184,48,.4); }
  &.badge-advanced { background: rgba(155,16,32,.2);   color: #C41E3A; border: 1px solid rgba(155,16,32,.4); }
  &.badge-inter    { background: rgba(192,144,96,.12); color: #C09060; border: 1px solid rgba(192,144,96,.3); }
  &.badge-beginner { background: rgba(122,75,58,.12);  color: #7A4B3A; border: 1px solid rgba(122,75,58,.25); }
}

.skill-pct {
  font-family: var(--font-d); font-size: .75rem; color: var(--gold-lt);
  font-weight: 700; min-width: 2.6rem; text-align: right;
  text-shadow: 0 0 12px rgba(212,146,10,.5);
}

/* ── Progress bar ── */
.bar-track {
  width: 100%; height: 5px;
  background: rgba(255,255,255,.05);
  border-radius: 20px; overflow: hidden;
  position: relative;
  border: 1px solid rgba(255,255,255,.04);
}
.bar-fill {
  height: 100%; width: 0; border-radius: 20px;
  background: linear-gradient(to right, rgba(139,94,0,.9), var(--gold-dk), var(--gold), var(--gold-lt));
  position: relative; overflow: hidden;
  box-shadow: 0 0 12px rgba(212,146,10,.5);
  transition: box-shadow .3s;
  .skill-row:hover & { box-shadow: 0 0 20px rgba(212,146,10,.8); }
}
/* shimmer sweep */
.bar-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmerBar 2.5s linear infinite;
}
@keyframes shimmerBar {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
/* glowing tip dot */
.bar-tip {
  position: absolute; right: -1px; top: 50%;
  transform: translateY(-50%);
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--gold-lt);
  box-shadow: 0 0 8px 2px rgba(240,184,48,.9), 0 0 18px rgba(240,184,48,.4);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .skills-grid { grid-template-columns: 1fr; gap: 16px; }
}
@media (max-width: 768px) {
  .skills-sec { padding: 6rem 0 5rem; }
  .skills-in { padding: 0 1.25rem; }
  .skill-card { padding: 2rem 1.5rem 1.75rem; border-radius: 14px; }
}
</style>
