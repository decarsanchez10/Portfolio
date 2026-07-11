<template>
  <section id="experience" class="exp-sec">
    <div class="exp-in">
      <p class="sec-label fi" ref="lbl">✦ My Journey</p>
      <p class="sec-label-mono fi fi-d1" ref="mono">02 / Experience</p>
      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">EXPERIENCE &amp;</span></div>
        <div class="rev-line"><span ref="t2">EDUCATION</span></div>
      </h2>

      <div class="timeline">
        <!-- Central line -->
        <div class="tl-line" ref="tlLine" />

        <div
          v-for="(item, i) in experiences"
          :key="item.title"
          class="tl-item"
          :class="i % 2 === 0 ? 'tl-left' : 'tl-right'"
          :ref="el => itemRefs[i] = el"
        >
          <!-- Dot on the line -->
          <div class="tl-dot">
            <div class="tl-dot-inner" />
          </div>

          <!-- Card -->
          <div class="tl-card" @mouseenter="onEnter" @mouseleave="onLeave">
            <div class="tl-card-top">
              <div class="tl-icon-wrap">
                <img v-if="item.logo" :src="item.logo" :alt="item.company" class="tl-logo" />
                <span v-else class="tl-icon-letter">{{ item.company[0] }}</span>
              </div>
              <div class="tl-meta">
                <span class="tl-badge" v-if="item.type">{{ item.type }}</span>
                <h3 class="tl-title">{{ item.title }}</h3>
                <p class="tl-company">{{ item.company }}</p>
              </div>
            </div>

            <div class="tl-details">
              <span class="tl-period">
                <span class="tl-period-icon">⏱</span> {{ item.period }}
              </span>
              <span class="tl-loc" v-if="item.location">
                <span class="tl-period-icon">📍</span> {{ item.location }}
              </span>
            </div>

            <p class="tl-desc" v-if="item.desc">{{ item.desc }}</p>

            <div class="tl-skills">
              <span class="tl-skill" v-for="skill in item.skills" :key="skill">{{ skill }}</span>
            </div>
          </div>
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

const lbl      = ref(null)
const mono     = ref(null)
const t1       = ref(null)
const t2       = ref(null)
const tlLine   = ref(null)
const itemRefs = reactive([])

const experiences = [
  {
    title: 'Web Developer Intern',
    company: 'Certicode',
    type: 'Internship',
    period: 'July 2026 – Present',
    location: 'Remote',
    logo: '/src/assets/certicode-logo.png',
    desc: 'Contributing to web development projects, building responsive user interfaces, and actively learning modern web technologies.',
    skills: ['Web Development', 'Front-End Development']
  },
  {
    title: 'Software Developer Intern',
    company: 'SciBiz Informatics',
    type: 'Internship',
    period: 'May 2026 – July 2026 · 3 mos',
    location: 'Tacloban, Eastern Visayas, Philippines · On-site',
    logo: '/src/assets/scibizinformatics-logo.png',
    desc: 'Building high-performance web applications at the intersection of blockchain and governance technology. Contributing to full-stack features across the Vue 3 + Django stack.',
    skills: ['Full-Stack Development', 'Front-End Development', 'Vue 3', 'Django', 'Blockchain']
  },
  {
    title: 'Student',
    company: 'Eastern Samar State University',
    type: 'Education',
    period: 'Jul 2026',
    location: 'Salcedo Campus, Eastern Samar, Philippines',
    logo: '/src/assets/ESSU-logo.png',
    desc: 'Bachelor of Science in Computer Engineering. Actively honing skills in web development, algorithms, and emerging technologies.',
    skills: ['HTML5', 'Creative Problem Solving', 'JavaScript', 'CSS3', 'PHP', 'MySQL', 'Python', 'Git']
  }
]

onMounted(() => {
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

  // Animate the central timeline line drawing down
  ScrollTrigger.create({
    trigger: tlLine.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(tlLine.value,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.4, ease: 'power3.out' }
      )
    }
  })

  // Animate each card sliding in from alternating sides
  itemRefs.forEach((el, i) => {
    if (!el) return
    const card = el.querySelector('.tl-card')
    const dot  = el.querySelector('.tl-dot')
    const fromX = i % 2 === 0 ? -60 : 60

    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: .5, ease: 'back.out(2)', delay: .1 }
        )
        gsap.fromTo(card,
          { opacity: 0, x: fromX, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: .85, ease: 'power3.out', delay: .2 }
        )
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.exp-sec {
  padding: 9rem 0;
  position: relative;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), transparent); opacity: .25;
  }
}
.exp-in { max-width: 1200px; margin: 0 auto; padding: 0 3rem; }

/* ── Timeline ── */
.timeline {
  position: relative;
  margin-top: 5rem;
  padding-bottom: 2rem;
}

/* Central vertical line */
.tl-line {
  position: absolute;
  left: 50%; transform: translateX(-50%);
  width: 1px;
  top: 0; bottom: 0;
  background: linear-gradient(to bottom, var(--gold), rgba(212,146,10,.1));
  transform-origin: top center;
}

/* Each row */
.tl-item {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  gap: 0;
  align-items: start;
  margin-bottom: 4rem;
  position: relative;

  /* Dot sits in the centre column */
  .tl-dot {
    grid-column: 2;
    display: flex; justify-content: center; align-items: flex-start;
    padding-top: 1.8rem;
    position: relative; z-index: 2;
  }

  /* Left-side card */
  &.tl-left {
    .tl-card { grid-column: 1; margin-right: 2rem; }
    .tl-dot  { grid-row: 1; }
    /* empty right */
    &::after { content: ''; grid-column: 3; }
  }

  /* Right-side card */
  &.tl-right {
    .tl-card { grid-column: 3; margin-left: 2rem; grid-row: 1; }
    .tl-dot  { grid-column: 2; grid-row: 1; }
    /* empty left */
    &::before { content: ''; grid-column: 1; display: block; }
  }
}

.tl-dot-inner {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--gold);
  border: 2px solid var(--bg);
  box-shadow: 0 0 12px rgba(212,146,10,.7), 0 0 28px rgba(212,146,10,.3);
}

/* Card */
.tl-card {
  background: var(--s1);
  border: 1px solid rgba(212,146,10,.12);
  padding: 2rem 2rem 1.75rem;
  position: relative; overflow: hidden;
  transition: border-color .4s, transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s;

  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, var(--gold-dk), var(--gold-lt));
    transform: scaleX(0); transform-origin: left;
    transition: transform .5s cubic-bezier(.16,1,.3,1);
  }
  &:hover {
    border-color: rgba(212,146,10,.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0,0,0,.4), 0 0 30px rgba(212,146,10,.08);
    &::before { transform: scaleX(1); }
  }
}

.tl-card-top {
  display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;
}

.tl-icon-wrap {
  width: 48px; height: 48px; flex-shrink: 0;
  background: var(--s2); border: 1px solid rgba(212,146,10,.2);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.tl-logo { width: 100%; height: 100%; object-fit: contain; }
.tl-icon-letter {
  font-family: var(--font-d); font-size: 1.4rem; color: var(--gold); font-weight: 700;
}

.tl-meta { flex: 1; }
.tl-badge {
  display: inline-block;
  font-family: var(--font-m); font-size: .5rem; letter-spacing: .2em; text-transform: uppercase;
  padding: .2rem .65rem; border: 1px solid rgba(212,146,10,.35); color: var(--gold);
  margin-bottom: .4rem;
}
.tl-title {
  font-family: var(--font-d); font-size: 1.15rem; letter-spacing: .06em;
  color: var(--cream); margin: 0 0 .2rem; line-height: 1.25;
}
.tl-company {
  font-family: var(--font-m); font-size: .62rem; letter-spacing: .14em;
  text-transform: uppercase; color: var(--gold); margin: 0;
}

.tl-details {
  display: flex; flex-wrap: wrap; gap: .5rem 1.5rem;
  margin-bottom: .9rem;
}
.tl-period, .tl-loc {
  font-family: var(--font-m); font-size: .58rem; letter-spacing: .1em;
  color: var(--gr); display: flex; align-items: center; gap: .35rem;
}
.tl-period-icon { font-size: .7rem; }

.tl-desc {
  font-size: .92rem; line-height: 1.75; color: var(--lgr); margin: 0 0 1.1rem;
  font-weight: 300;
}

.tl-skills { display: flex; flex-wrap: wrap; gap: .4rem; }
.tl-skill {
  font-family: var(--font-m); font-size: .5rem; letter-spacing: .12em; text-transform: uppercase;
  padding: .25rem .65rem;
  border: 1px solid rgba(212,146,10,.2); color: var(--gold-lt);
  transition: background .3s, border-color .3s;
  .tl-card:hover & { background: rgba(212,146,10,.08); border-color: rgba(212,146,10,.4); }
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .tl-line { left: 20px; transform: none; }

  .tl-item {
    grid-template-columns: 40px 1fr;
    .tl-dot { grid-column: 1; }

    &.tl-left,
    &.tl-right {
      .tl-card { grid-column: 2; margin-left: 1.5rem; margin-right: 0; grid-row: 1; }
      .tl-dot  { grid-column: 1; grid-row: 1; }
      &::before, &::after { display: none; }
    }
  }
}
@media (max-width: 768px) {
  .exp-sec { padding: 5.5rem 0; }
  .exp-in { padding: 0 1.5rem; }
  .tl-line { left: 16px; }
}
</style>
