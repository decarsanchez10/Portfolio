<template>
  <section id="about" class="about-sec">
    <div class="about-in">
      <p class="sec-label fi" ref="lbl">✦ About Me</p>
      <p class="sec-label-mono fi fi-d1" ref="mono">03 / Who I Am</p>
      <div class="about-grid">
        <div class="fi-left" ref="leftEl">
          <h2 class="sec-title">
            <div class="rev-line"><span ref="t1">WHO I AM</span></div>
          </h2>
          <p class="abody" ref="bodyEl">
            <span v-html="typedText"/>
            <span v-if="showCursor" class="typing-cursor">|</span>
          </p>
          <div class="q-mt-xl fi fi-d2" ref="ctaEl">
            <q-btn outline no-caps unelevated class="btn-gold"
              label="Get in Touch" icon-right="arrow_forward"
              href="mailto:sanchezdecar10@hotmail.com"
              @mouseenter="onEnter" @mouseleave="onLeave"/>
          </div>
        </div>

        <div class="photo-col fi-right" ref="rightEl">
          <div class="frame-wrapper">
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from 'src/composables/useCursor'

gsap.registerPlugin(ScrollTrigger)
const { onEnter, onLeave } = useCursor()

const lbl      = ref(null)
const mono     = ref(null)
const leftEl   = ref(null)
const rightEl  = ref(null)
const bodyEl   = ref(null)
const ctaEl    = ref(null)
const t1       = ref(null)

// ── Typing ───────────────────────────────────────────────────────
const typedText  = ref('')
const showCursor = ref(false)
let   typingTimer = null

const fullText = `I am <strong>Decar A. Sanchez</strong>, a Computer Engineering student at ESSU – Salcedo Campus with a passion for building impactful digital experiences. As a <strong>Web Development Intern at SciBiz Informatics</strong>, I work at the intersection of web development and blockchain technology.<br/><br/>From building digital governance systems for local communities to designing immersive <strong>3D landing pages with Three.js</strong>, I craft solutions that are both functional and beautiful. Fluent in English, Tagalog, and Waray-waray.`

const startTyping = () => {
  typedText.value = ''; showCursor.value = true; let i = 0
  const next = () => {
    if (i < fullText.length) {
      if (fullText[i] === '<') { const c = fullText.indexOf('>',i); if (c!==-1) { i=c+1; typedText.value=fullText.slice(0,i); } else typedText.value=fullText.slice(0,++i); }
      else typedText.value = fullText.slice(0,++i)
      typingTimer = setTimeout(next, 15)
    } else setTimeout(()=>{showCursor.value=false},2000)
  }
  next()
}


onMounted(() => {
  gsap.set(t1.value, { y:'110%' })

  ;[lbl.value, mono.value].forEach(el => {
    if (!el) return
    ScrollTrigger.create({ trigger:el, start:'top 88%', onEnter:()=>el.classList.add('vis') })
  })
  ScrollTrigger.create({
    trigger:t1.value, start:'top 87%',
    onEnter:()=>gsap.to(t1.value,{y:0,duration:.95,ease:'power3.out'})
  })
  ;[leftEl.value, rightEl.value, ctaEl.value].forEach(el=>{
    if(!el) return
    ScrollTrigger.create({trigger:el,start:'top 86%',onEnter:()=>el.classList.add('vis')})
  })
  if (bodyEl.value) {
    ScrollTrigger.create({ trigger:bodyEl.value, start:'top 80%', once:true, onEnter:()=>startTyping() })
  }
})
onUnmounted(()=>{ if(typingTimer) clearTimeout(typingTimer) })
</script>

<style lang="scss" scoped>
.about-sec { padding:9rem 0; }
.about-in  { max-width:1440px; margin:0 auto; padding:0 3rem; }
.about-grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:7rem; align-items:start; }
.abody { font-size:clamp(1.05rem,1.4vw,1.25rem); font-weight:300; line-height:1.9; color:var(--lgr); min-height:14rem; :deep(strong){color:var(--cream);font-weight:600;} }
.stat-grid { display: none; }

.photo-col { display: flex; justify-content: center; align-items: center; }
.frame-wrapper {
  position: relative; width: 340px; height: 450px;
  animation: floatY 4s ease-in-out infinite;
}
@keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
.frame-glow {
  position: absolute; inset: -20px; border-radius: 50%;
  background: radial-gradient(circle, rgba(212,146,10,.3), transparent 70%);
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
  filter: drop-shadow(0 8px 30px rgba(212,146,10,.55)) drop-shadow(0 0 60px rgba(212,146,10,.2));
  pointer-events: none;
}
.corner-star {
  position: absolute; color: var(--gold-lt); font-size: 1rem; z-index: 3;
  animation: starPulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(212,146,10,.8));
}
.s1 { top:2%; left:5%; animation-delay:0s; }
.s2 { top:2%; right:5%; animation-delay:.5s; }
.s3 { bottom:2%; left:5%; animation-delay:1s; }
.s4 { bottom:2%; right:5%; animation-delay:1.5s; }
@keyframes starPulse { 0%,100% { opacity:.4; transform:scale(.8); } 50% { opacity:1; transform:scale(1.3); } }

@media (max-width:1024px) { .about-grid{grid-template-columns:1fr;gap:4rem;} .frame-wrapper{width:260px;height:340px;} }
@media (max-width:768px)  { .about-in{padding:0 1.5rem;} .about-sec{padding:5.5rem 0;} .frame-wrapper{width:220px;height:290px;} }
</style>