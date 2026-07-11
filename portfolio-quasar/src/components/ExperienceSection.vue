<template>
  <section id="projects" class="proj-sec" ref="secRef">
    <div class="proj-header">
      <p class="sec-label fi" ref="lbl">✦ Featured Work</p>
      <p class="sec-label-mono fi fi-d1" ref="mono">04 / Projects</p>
      <h2 class="sec-title">
        <div class="rev-line"><span ref="t1">FEATURED</span></div>
        <div class="rev-line"><span ref="t2">PROJECTS</span></div>
      </h2>
    </div>

    <!-- Horizontal scroll track -->
    <div class="h-container" ref="hContainer">
      <div class="h-track" ref="hTrack">
        <div class="h-slide" v-for="(p,i) in projects" :key="p.title"
          @mouseenter="onEnter" @mouseleave="onLeave">
          <div class="slide-inner">
            <div class="slide-top">
              <span class="slide-num shimmer-text">0{{i+1}}</span>
              <span class="slide-badge" v-if="p.badge">{{p.badge}}</span>
            </div>
            <div class="slide-body">
              <span class="slide-arr">↗</span>
              <h3 class="slide-title">{{p.title}}</h3>
              <p class="slide-desc">{{p.desc}}</p>
              <div class="slide-tags">
                <span class="s-logo-tag" v-for="t in p.tags" :key="t.name">
                  <div class="s-logo-wrap">
                    <img :src="t.logo" :alt="t.name" class="s-tag-icon" />
                  </div>
                  <span class="s-tag-name">{{ t.name }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="h-progress">
      <div class="h-bar" ref="hBar"/>
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

const secRef     = ref(null)
const lbl        = ref(null)
const mono       = ref(null)
const t1         = ref(null)
const t2         = ref(null)
const hContainer = ref(null)
const hTrack     = ref(null)
const hBar       = ref(null)

const L = (name, logo) => ({ name, logo })

const projects = [
  {
    title: 'Provena',
    badge: '🌐 Internship',
    desc: 'Decentralized document notarization platform on Bitcoin Cash. Developed a full-stack blockchain platform enabling users to timestamp documents immutably via Bitcoin Cash OP_RETURN transactions.',
    tags: [
      L('Vue 3',          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'),
      L('Quasar',         'https://cdn.quasar.dev/logo-v2/svg/logo.svg'),
      L('Django',         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'),
      L('PostgreSQL',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'),
      L('Docker',         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'),
      L('GitHub Actions', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'),
      L('GSAP',           'https://cdn.simpleicons.org/greensock/88ce02'),
      L('Three.js',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg'),
    ]
  },
  {
    title: 'Barangay Information System',
    desc: 'A comprehensive digital management system automating resident profiling, blotter record tracking, and automated issuance of local certificates — eliminating manual paperwork delays.',
    tags: [
      L('PHP',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'),
      L('MySQL',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'),
      L('HTML5',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'),
      L('CSS3',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'),
      L('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'),
    ]
  },
  {
    title: 'Attendance Enforcement & Penalty System',
    desc: 'Automated compliance tracker for university events. Custom backend logic tracks real-time attendance and auto-calculates penalties, minimizing human error and admin overhead.',
    tags: [
      L('PHP',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'),
      L('SQL',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'),
      L('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'),
      L('HTML5',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'),
      L('CSS3',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'),
    ]
  },
  {
    title: '"Raced" Landing Page',
    badge: '🏎️ 3D',
    desc: 'Lead Developer on a high-performance 3D interactive landing page featuring immersive Three.js visuals, modern UI/UX design principles, and fast optimized loading speeds.',
    tags: [
      L('Three.js',   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg'),
      L('HTML5',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'),
      L('CSS3',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'),
      L('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'),
    ]
  }
]

onMounted(() => {
  gsap.set([t1.value, t2.value], { y:'110%' })
  ;[lbl.value, mono.value].forEach(el=>{
    if(!el) return
    ScrollTrigger.create({trigger:el,start:'top 88%',onEnter:()=>el.classList.add('vis')})
  })
  ScrollTrigger.create({
    trigger:t1.value, start:'top 87%',
    onEnter:()=>{
      gsap.to(t1.value,{y:0,duration:.95,ease:'power3.out'})
      gsap.to(t2.value,{y:0,duration:.95,ease:'power3.out',delay:.09})
    }
  })

  // ── Horizontal Scroll ────────────────────────────────────────────
  const slides = hTrack.value?.querySelectorAll('.h-slide')
  if (!hTrack.value || !slides?.length) return

  const totalSlides = slides.length
  const slideWidth  = slides[0].offsetWidth

  const getMaxX = () => -(hTrack.value.scrollWidth - hContainer.value.offsetWidth)

  gsap.to(hTrack.value, {
    x: getMaxX,
    ease: 'none',
    scrollTrigger: {
      trigger: hContainer.value,
      start: 'top top',
      end: () => `+=${Math.abs(getMaxX()) + 200}`,
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (hBar.value) hBar.value.style.width = (self.progress * 100) + '%'
      }
    }
  })

  // Clip-path reveal each card as it enters view
  slides.forEach((slide, i) => {
    gsap.from(slide.querySelector('.slide-inner'), {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: slide,
        containerAnimation: ScrollTrigger.getById('horizontal'),
        start: 'left center',
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.proj-sec { background:var(--s1); overflow:hidden; position:relative;
  &::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(to right,transparent,var(--gold),transparent); opacity:.25; }
}
.proj-header { max-width:1440px; margin:0 auto; padding:9rem 3rem 3rem; }

.h-container { width:100%; overflow:hidden; }
.h-track { display:flex; gap:2px; width:max-content; padding:0 6vw 6rem; }

.h-slide {
  width: min(480px, 85vw);
  flex-shrink: 0;
  background: var(--bg);
  position: relative;
  overflow: hidden;
  &::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,var(--burg),rgba(114,47,55,.9));
    transform:translateY(101%); transition:transform .65s cubic-bezier(.16,1,.3,1); z-index:0;
  }
  &:hover {
    &::after { transform:translateY(0); }
    .slide-num  { color:rgba(255,245,230,.1); }
    .slide-desc { color:rgba(255,245,230,.82); }
    .slide-arr  { transform:translate(5px,-5px); color:var(--gold-lt); }
    .s-tag      { background:rgba(201,168,76,.2); color:var(--gold-lt); border-color:rgba(201,168,76,.4); }
  }
}
.slide-inner { position:relative; z-index:1; min-height:420px; display:flex; flex-direction:column; justify-content:space-between; padding:3rem 2.5rem; }
.slide-top { display:flex; justify-content:space-between; align-items:flex-start; }
.slide-num { font-family:var(--font-d); font-size:5.5rem; line-height:1; color:var(--s2); transition:color .4s; font-weight:900; }
.slide-badge { font-family:var(--font-m); font-size:.55rem; letter-spacing:.15em; text-transform:uppercase; padding:.3rem .8rem; border:1px solid rgba(201,168,76,.3); color:var(--gold); white-space:nowrap; }
.slide-arr { position:absolute; top:2.5rem; right:2.5rem; font-size:1.3rem; color:var(--gold); transition:transform .4s cubic-bezier(.16,1,.3,1),color .3s; }
.slide-title { font-family:var(--font-d); font-size:1.6rem; letter-spacing:.06em; margin:0 0 .9rem; line-height:1.2; color:var(--cream); }
.slide-desc { font-size:.95rem; line-height:1.75; color:var(--gr); flex:1; margin-bottom:1.5rem; transition:color .4s; }
.slide-tags { display:flex; flex-wrap:wrap; gap:.6rem; }
.s-logo-tag {
  display: inline-flex; align-items: center; gap: .45rem;
  font-family: var(--font-m); font-size: .55rem; letter-spacing: .1em; text-transform: uppercase;
  padding: .25rem .7rem .25rem .25rem;
  border-radius: 20px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08); color: var(--lgr);
  transition: background .3s, color .3s, border-color .3s, box-shadow .3s;
  .h-slide:hover & {
    background: rgba(212,146,10,.08);
    color: var(--cream);
    border-color: rgba(212,146,10,.25);
    box-shadow: 0 0 10px rgba(212,146,10,.1);
  }
}
.s-logo-wrap {
  width: 22px; height: 22px; flex-shrink: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.05);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  transition: background .3s, box-shadow .3s;
  .h-slide:hover & {
    background: rgba(212,146,10,.15);
    box-shadow: 0 0 8px rgba(212,146,10,.2);
  }
}
.s-tag-icon {
  width: 12px; height: 12px; object-fit: contain; flex-shrink: 0;
  filter: brightness(.8) saturate(.6);
  transition: filter .3s;
  .h-slide:hover & { filter: brightness(1.1) saturate(1); }
}

.h-progress { position:sticky; bottom:0; left:0; right:0; height:2px; background:var(--s2); }
.h-bar { height:100%; background:linear-gradient(to right,var(--gold-dk),var(--gold-lt)); width:0; transition:width .1s; }

@media (max-width:768px) { .proj-header { padding:5.5rem 1.5rem 2rem; } .h-track { padding:0 1.5rem 4rem; } }
</style>