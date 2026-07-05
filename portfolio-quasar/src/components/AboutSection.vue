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

        <div class="stat-grid fi-right" ref="rightEl">
          <div class="stat-card" v-for="(s,i) in stats" :key="s.label"
            :ref="el=>statRefs[i]=el"
            @mouseenter="onEnter" @mouseleave="onLeave">
            <div class="stat-n shimmer-text" :ref="el=>countEls[i]=el">{{ s.display }}</div>
            <div class="stat-l">{{ s.label }}</div>
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

const lbl      = ref(null)
const mono     = ref(null)
const leftEl   = ref(null)
const rightEl  = ref(null)
const bodyEl   = ref(null)
const ctaEl    = ref(null)
const t1       = ref(null)
const statRefs = reactive([])
const countEls = reactive([])

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

// ── Counter ──────────────────────────────────────────────────────
const stats = [
  { display:'2+',  target:2,  suffix:'+', label:'Years Experience'    },
  { display:'4+',  target:4,  suffix:'+', label:'Projects Built'      },
  { display:'8+',  target:8,  suffix:'+', label:'Languages & Tools'   },
  { display:'2027',target:2027,suffix:'', label:'Expected Graduation' }
]

const runCounter = (el, target, suffix) => {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target, duration: 2.5, ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix }
  })
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

  // Stat cards + counters
  statRefs.forEach((card,i) => {
    if (!card) return
    ScrollTrigger.create({
      trigger: card, start:'top 85%', once:true,
      onEnter: () => {
        gsap.fromTo(card, {opacity:0,y:40}, {opacity:1,y:0,duration:.8,ease:'power3.out',delay:i*.1})
        if (countEls[i]) runCounter(countEls[i], stats[i].target, stats[i].suffix)
      }
    })
  })
})
onUnmounted(()=>{ if(typingTimer) clearTimeout(typingTimer) })
</script>

<style lang="scss" scoped>
.about-sec { padding:9rem 0; }
.about-in  { max-width:1440px; margin:0 auto; padding:0 3rem; }
.about-grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:7rem; align-items:start; }
.abody { font-size:clamp(1.05rem,1.4vw,1.25rem); font-weight:300; line-height:1.9; color:var(--lgr); min-height:14rem; :deep(strong){color:var(--cream);font-weight:600;} }
.stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
.stat-card {
  background:var(--s1); padding:2.5rem 2rem; position:relative; overflow:hidden;
  transition:transform .4s cubic-bezier(.16,1,.3,1),border-color .3s; border:1px solid transparent;
  &::before { content:''; position:absolute; top:0;left:0;right:0; height:2px; background:linear-gradient(to right,var(--gold-dk),var(--gold-lt)); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.16,1,.3,1); }
  &:hover { transform:translateY(-5px); border-color:rgba(201,168,76,.2); &::before{transform:scaleX(1);} }
}
.stat-n { font-family:var(--font-d); font-size:4rem; line-height:1; font-weight:700; }
.stat-l { font-family:var(--font-m); font-size:.6rem; letter-spacing:.22em; text-transform:uppercase; color:var(--gr); margin-top:.5rem; }

@media (max-width:1024px) { .about-grid{grid-template-columns:1fr;gap:4rem;} }
@media (max-width:768px)  { .about-in{padding:0 1.5rem;} .about-sec{padding:5.5rem 0;} }
</style>