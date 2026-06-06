<template>
  <section class="hero" ref="heroRef" id="home">
    <div class="hero-gradient" />
    <div class="hero-vignette" />

    <div class="hero-content">
      <!-- LEFT: Text -->
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

      <!-- RIGHT: Photo in Gold Frame -->
      <div class="hero-right" ref="heroRight">
        <div class="frame-wrapper" ref="frameWrapper">
          <div class="frame-glow" />
          <img class="profile-photo" src="/src/assets/decar-photo.png" alt="Decar Sanchez" />
          <img class="gold-frame-img" src="/src/assets/gold-frame.png" alt="" />
          <span class="corner-star s1">✦</span>
          <span class="corner-star s2">✦</span>
          <span class="corner-star s3">✦</span>
          <span class="corner-star s4">✦</span>
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
const heroRight  = ref(null)
const greetingEl = ref(null)
const nameEl     = ref(null)
const ornamentEl = ref(null)
const roleEl     = ref(null)
const taglineEl  = ref(null)
const btnsEl     = ref(null)
const scInd      = ref(null)
const frameWrapper = ref(null)

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
  gsap.set(heroRight.value, { opacity: 0, x: 60 })
  gsap.set(scInd.value, { opacity: 0 })

  gsap.timeline({ delay: 1.5 })
    .to(greetingEl.value,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .to(nameEl.value.querySelectorAll('span'), { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
    .to(ornamentEl.value,  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to(roleEl.value,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .to(taglineEl.value,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to(btnsEl.value,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .to(heroRight.value,   { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, '-=1.2')
    .to(scInd.value,       { opacity: 1, duration: 0.6 }, '-=0.3')

  // Magnetic on frame
  setTimeout(() => {
    const fw = frameWrapper.value
    if (!fw) return
    fw.addEventListener('mousemove', (e) => {
      const r = fw.getBoundingClientRect()
      gsap.to(fw, { x: (e.clientX-(r.left+r.width/2))*0.06, y: (e.clientY-(r.top+r.height/2))*0.06, duration: 0.5, ease: 'power2.out' })
    })
    fw.addEventListener('mouseleave', () => gsap.to(fw, { x:0, y:0, duration: 0.8, ease: 'elastic.out(1,0.5)' }))
  }, 2600)
})
</script>

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
    radial-gradient(ellipse 80% 70% at 20% 50%, rgba(114,47,55,0.35), transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,105,20,0.18), transparent 55%),
    linear-gradient(180deg, #0F0307 0%, #180610 50%, #0F0307 100%);
  animation: bgPulse 8s ease-in-out infinite;
}
@keyframes bgPulse { 0%,100% { opacity:1; } 50% { opacity:.75; } }
.hero-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
}
.hero-content {
  position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
  max-width: 1300px; margin: 0 auto; width: 100%;
}
.hero-left { display: flex; flex-direction: column; gap: 1.5rem; }
.greeting {
  font-family: var(--font-script); font-size: 2rem;
  color: var(--gold); margin: 0;
  filter: drop-shadow(0 0 10px rgba(201,168,76,.4));
}
.hero-name {
  display: flex; flex-direction: column;
  font-family: var(--font-display);
  font-size: clamp(3.5rem,7vw,7.5rem);
  line-height: 0.95; letter-spacing: 0.08em; font-weight: 900; margin: 0;
}
.name-first { display: block; }
.name-last {
  display: block; color: var(--cream);
  -webkit-text-stroke: 1px rgba(201,168,76,0.35);
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
  line-height: 1.8; color: var(--gr); margin: 0; max-width: 500px;
}
.hero-btns { display: flex; flex-wrap: wrap; gap: .75rem; padding-top: .5rem; }

.btn-cream {
  font-family: var(--font-mono) !important; font-size: .62rem !important;
  letter-spacing: .2em !important; text-transform: uppercase !important;
  border: 1px solid rgba(245,230,204,.35) !important; color: var(--cream) !important;
  border-radius: 0 !important; background: transparent !important;
  transition: border-color .3s,color .3s !important;
  &:hover { border-color: var(--cream) !important; }
  :deep(.q-focus-helper) { display: none; }
}

.hero-right { display: flex; justify-content: center; align-items: center; }
.frame-wrapper {
  position: relative; width: 340px; height: 450px;
  animation: floatY 4s ease-in-out infinite;
}
@keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
.frame-glow {
  position: absolute; inset: -20px; border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,.25), transparent 70%);
  animation: pulseGold 3s ease-in-out infinite; z-index: 0;
}
@keyframes pulseGold { 0%,100% { opacity:.5; transform:scale(.95); } 50% { opacity:1; transform:scale(1.05); } }
.profile-photo {
  position: absolute; top: 8%; left: 10%;
  width: 80%; height: 84%;
  object-fit: cover; object-position: center top;
  z-index: 1;
  filter: brightness(.95) contrast(1.05) saturate(1.1);
}
.gold-frame-img {
  position: absolute; top: -12%; left: -38%; width: 170%; height: 120%;
  z-index: 2;
  filter: drop-shadow(0 8px 30px rgba(201,168,76,.5)) drop-shadow(0 0 60px rgba(201,168,76,.2));
  pointer-events: none;
}
.corner-star {
  position: absolute; color: var(--gold-lt); font-size: 1rem; z-index: 3;
  animation: starPulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(201,168,76,.8));
}
.s1 { top:2%; left:5%; animation-delay:0s; }
.s2 { top:2%; right:5%; animation-delay:.5s; }
.s3 { bottom:2%; left:5%; animation-delay:1s; }
.s4 { bottom:2%; right:5%; animation-delay:1.5s; }
@keyframes starPulse { 0%,100% { opacity:.4; transform:scale(.8); } 50% { opacity:1; transform:scale(1.3); } }

@media (max-width: 1024px) {
  .hero-content { grid-template-columns: 1fr; text-align: center; }
  .hero-right { order: -1; }
  .frame-wrapper { width: 260px; height: 340px; }
  .hero-btns { justify-content: center; }
  .hero-tagline { margin: 0 auto; }
}
@media (max-width: 768px) {
  .hero { padding: 6rem 1.5rem 4rem; }
  .frame-wrapper { width: 220px; height: 290px; }
}
</style>