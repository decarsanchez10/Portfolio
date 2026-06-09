<template>
  <!-- Cursor -->
  <div class="cur-dot" ref="curDot" :class="{active:isHovering}"/>
  <div class="cur-ring" ref="curRing" :class="{active:isHovering}"/>

  <!-- Loader -->
  <Transition name="ld">
    <div v-if="!loaderDone" class="loader-ov">
      <div class="loader-script"><span ref="loaderTxt">Decar</span></div>
      <div style="font-family:var(--font-m);font-size:.6rem;letter-spacing:.6em;color:var(--gold);opacity:.5;">✦ PORTFOLIO ✦</div>
    </div>
  </Transition>

  <!-- Mobile Menu -->
  <div class="mob-menu" :class="{open:drawer}">
    <ul>
      <li v-for="(n,i) in navItems" :key="n.id">
        <a :href="'#'+n.id" @click.prevent="goTo(n.id)" @mouseenter="onEnter" @mouseleave="onLeave">
          <span class="mob-num">0{{i+1}}</span>{{n.label}}
        </a>
      </li>
    </ul>
  </div>

  <q-layout view="hHh lpR fFf">
    <q-header :class="{pinned:scrolled}">
      <q-scroll-observer @scroll="onScroll"/>
      <q-toolbar style="height:72px;padding:0 2.5rem;">
        <span class="nav-logo" @click="scrollTo('home')" @mouseenter="onEnter" @mouseleave="onLeave">Decar</span>
        <q-space/>
        <div class="gt-sm row items-center q-gutter-md">
          <q-btn v-for="n in navItems" :key="n.id" flat no-caps unelevated
            :label="n.label" class="nav-btn"
            @click="scrollTo(n.id)" @mouseenter="onEnter" @mouseleave="onLeave"/>
        </div>
        <q-btn flat round dense class="lt-md"
          :icon="drawer?'close':'menu'" color="white"
          @click="drawer=!drawer" @mouseenter="onEnter" @mouseleave="onLeave"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { scroll } from 'quasar'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useCursor } from 'src/composables/useCursor'

gsap.registerPlugin(ScrollTrigger)
const { getScrollTarget, setVerticalScrollPosition } = scroll
const { isHovering, onEnter, onLeave } = useCursor()

const curDot     = ref(null)
const curRing    = ref(null)
const loaderTxt  = ref(null)
const loaderDone = ref(false)
const drawer     = ref(false)
const scrolled   = ref(false)

const navItems = [
  { id:'about',     label:'About'     },
  { id:'experience',label:'Experience'},
  { id:'projects',  label:'Work'      },
  { id:'skills',    label:'Skills'    },
  { id:'education', label:'Education' },
  { id:'contact',   label:'Contact'   }
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  setVerticalScrollPosition(getScrollTarget(el), el.offsetTop - 72, 700)
}
const goTo = (id) => { drawer.value = false; setTimeout(() => scrollTo(id), 650) }
const onScroll = (info) => { scrolled.value = info.position.top > 60 }

// ── Cursor ───────────────────────────────────────────────────────
let mx=0,my=0,rx=0,ry=0,rafId=null

const animRing = () => {
  if (!curRing.value) return
  rx += (mx-rx)*.11; ry += (my-ry)*.11
  curRing.value.style.left = rx+'px'; curRing.value.style.top = ry+'px'
  rafId = requestAnimationFrame(animRing)
}

// ── Cursor Trail ─────────────────────────────────────────────────
let trailTime = 0
const createTrail = (x, y) => {
  const now = Date.now()
  if (now - trailTime < 35) return
  trailTime = now
  const el = document.createElement('span')
  el.className = 'cur-trail'
  const size = Math.random() * 8 + 4
  el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 850)
}

const onMouseMove = (e) => {
  mx = e.clientX; my = e.clientY
  if (curDot.value) { curDot.value.style.left=e.clientX+'px'; curDot.value.style.top=e.clientY+'px' }
  createTrail(e.clientX, e.clientY)
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  animRing()

  // ── Lenis Smooth Scroll ─────────────────────────────────────────
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => { lenis.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)

  // ── Loader ──────────────────────────────────────────────────────
  gsap.set(loaderTxt.value, { y: '110%' })
  gsap.timeline({ onComplete: () => { loaderDone.value = true } })
    .to(loaderTxt.value, { y: 0,       duration: .8, ease: 'power3.out', delay: .1 })
    .to(loaderTxt.value, { y: '-110%', duration: .6, ease: 'power3.in',  delay: .6 })
    .to('.loader-ov',    { opacity: 0, duration: .4 })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style lang="scss">
.ld-leave-active { transition: opacity .4s ease; }
.ld-leave-to     { opacity: 0; }
</style>