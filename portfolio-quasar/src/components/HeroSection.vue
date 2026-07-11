<template>
  <section class="hero" ref="heroRef" id="home">
    <div class="hero-gradient" />
    <div class="hero-vignette" />

    <!-- Parallax Floral & Fruit Motifs -->
    <img class="floral-motif lily-tl" src="~assets/lily.png" alt="" />
    <img class="floral-motif lily-br" src="~assets/lily.png" alt="" />


    <div class="hero-content">
      <div class="hero-left">
        <p class="greeting" ref="greetingEl">✦ Hello, I'm</p>
        <h1 class="hero-name" ref="nameEl">
          <span class="name-first shimmer-text">Decar</span>
          <span class="name-last">Sanchez</span>
        </h1>
        <div class="ornament-line" ref="ornamentEl">⸻ ✦ ⸻</div>
        <p class="hero-role" ref="roleEl">
          Computer Engineering Student<br/>
          <em class="role-accent">&amp; Web Development Intern</em>
        </p>
        <p class="hero-tagline" ref="taglineEl">
          Passionate about building high-performance administrative web apps,
          exploring blockchain technologies, and creating beautiful digital experiences.
        </p>
        <div class="hero-btns" ref="btnsEl">
          <q-btn no-caps unelevated class="btn-gold"
            icon="fab fa-linkedin" label="LinkedIn"
            href="https://www.linkedin.com/in/decar-sanchez-0858b7313" target="_blank"
            @mouseenter="onEnter" @mouseleave="onLeave" />
          <q-btn no-caps unelevated class="btn-burg"
            icon="fab fa-github" label="GitHub"
            href="https://github.com/decarsanchez10" target="_blank"
            @mouseenter="onEnter" @mouseleave="onLeave" />
          <q-btn no-caps unelevated class="btn-cream"
            icon="download" label="Resume"
            @mouseenter="onEnter" @mouseleave="onLeave" />
        </div>
      </div>
    </div>

    <div class="scroll-ind" ref="scInd">
      <span>Scroll</span>
      <div class="s-line" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useCursor } from 'src/composables/useCursor'

const emit = defineEmits(['scroll-to'])
const { onEnter, onLeave } = useCursor()

const heroRef    = ref(null)
const greetingEl = ref(null)
const nameEl     = ref(null)
const ornamentEl = ref(null)
const roleEl     = ref(null)
const taglineEl  = ref(null)
const btnsEl     = ref(null)
const scInd      = ref(null)

const initSparkles = () => {
  const hero = heroRef.value
  if (!hero) return
  for (let i = 0; i < 70; i++) {
    const s = document.createElement('span')
    s.className = 'hero-sparkle'
    const size = Math.random() * 6 + 2
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*5}s;animation-duration:${Math.random()*3+2}s;`
    hero.appendChild(s)
  }
}

onMounted(() => {
  initSparkles()

  gsap.set([greetingEl.value, ornamentEl.value, roleEl.value, taglineEl.value, btnsEl.value], { opacity: 0, y: 30 })
  gsap.set(nameEl.value.querySelectorAll('span'), { opacity: 0, y: '110%' })
  gsap.set(scInd.value, { opacity: 0 })

  gsap.timeline({ delay: 1.5 })
    .to(greetingEl.value,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .to(nameEl.value.querySelectorAll('span'), { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
    .to(ornamentEl.value,  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to(roleEl.value,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .to(taglineEl.value,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to(btnsEl.value,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .to(scInd.value,       { opacity: 1, duration: 0.6 }, '-=0.3')
})
</script>

<style lang="scss">
/* Register Bloved font globally so @font-face isn't scoped away */
@font-face {
  font-family: 'Bloved';
  src: url('../assets/Bloved.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7rem 3rem 5rem;
  position: relative;
  overflow: hidden;
}
.hero-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 80% 70% at 20% 50%, rgba(155,16,32,0.4), transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 80%, rgba(212,146,10,0.15), transparent 55%),
    linear-gradient(180deg, rgba(8,0,3,0.6) 0%, rgba(21,0,8,0.7) 50%, rgba(8,0,3,0.6) 100%);
  animation: bgPulse 8s ease-in-out infinite;
}
@keyframes bgPulse { 0%,100% { opacity:1; } 50% { opacity:.75; } }
.hero-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
}
.hero-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  text-align: center;
  max-width: 900px; margin: 0 auto; width: 100%;
}
.hero-left { display: flex; flex-direction: column; gap: 1.5rem; align-items: center; }
.greeting {
  font-family: var(--font-script); font-size: 2rem;
  color: var(--gold); margin: 0;
  filter: drop-shadow(0 0 10px rgba(212,146,10,.45));
}
.hero-name {
  display: flex; flex-direction: row; gap: 0.3em; flex-wrap: wrap; justify-content: center;
  font-family: 'Bloved', var(--font-s), cursive;
  font-size: clamp(3.5rem,7vw,7.5rem);
  line-height: 0.95; letter-spacing: 0.08em; font-weight: 900; margin: 0;
}
.name-first { display: inline; }
.name-last {
  display: inline; color: var(--cream);
  -webkit-text-stroke: 1px rgba(212,146,10,0.35);
}
.ornament-line {
  font-size: 1rem; color: var(--gold); letter-spacing: 0.8em; opacity: .7;
}
.hero-role {
  font-family: var(--font-display); font-size: clamp(1rem,1.5vw,1.2rem);
  letter-spacing: .1em; color: var(--lgr); margin: 0; line-height: 1.65;
}
.role-accent {
  color: var(--gold-lt); font-style: italic;
  font-family: var(--font-script); font-size: 1.5em;
}
.hero-tagline {
  font-size: clamp(.95rem,1.3vw,1.15rem); font-weight: 300;
  line-height: 1.8; color: var(--gr); margin: 0 auto; max-width: 680px;
}
.hero-btns { display: flex; flex-wrap: wrap; gap: .75rem; padding-top: .5rem; justify-content: center; }

.btn-cream {
  font-family: var(--font-mono) !important; font-size: .62rem !important;
  letter-spacing: .2em !important; text-transform: uppercase !important;
  border: 1px solid rgba(245,230,204,.35) !important; color: var(--cream) !important;
  border-radius: 0 !important; background: transparent !important;
  transition: border-color .3s,color .3s !important;
  &:hover { border-color: var(--cream) !important; }
  :deep(.q-focus-helper) { display: none; }
}

@media (max-width: 768px) {
  .hero { padding: 6rem 1.5rem 4rem; }
}

/* ── UI MOTIFS (LILIES & CHERRIES) ── */
.floral-motif, .fruit-motif {
  position: absolute;
  z-index: 1; /* Sits between gradient and content */
  pointer-events: none;
  filter: drop-shadow(0 15px 25px rgba(8,0,3,0.7));
}
.lily-tl {
  top: -10%; left: -5%; width: 30vw; max-width: 350px;
  animation: floatLily 12s ease-in-out infinite;
}
.lily-br {
  bottom: -15%; right: -10%; width: 35vw; max-width: 450px;
  animation: floatLily 14s ease-in-out infinite reverse;
}


@keyframes floatLily {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(3deg); }
}
</style>