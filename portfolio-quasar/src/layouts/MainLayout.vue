<template>
  <div class="cur-dot" ref="curDot" :class="{ active: isHovering }" />
  <div class="cur-ring" ref="curRing" :class="{ active: isHovering }" />

  <Transition name="loader">
    <div v-if="!loaderDone" class="loader-overlay">
      <div class="loader-word"><span ref="loaderText">DECAR</span></div>
    </div>
  </Transition>

  <div class="mob-menu" :class="{ open: drawer }">
    <ul>
      <li v-for="(item, i) in navItems" :key="item.id">
        <a :href="'#' + item.id" @click.prevent="goTo(item.id)"
           @mouseenter="onEnter" @mouseleave="onLeave">
          <span class="mob-num">0{{ i + 1 }}</span>{{ item.label }}
        </a>
      </li>
    </ul>
  </div>

  <q-layout view="hHh lpR fFf">
    <q-header :class="{ 'nav-pinned': scrolled }">
      <q-scroll-observer @scroll="onScroll" />
      <q-toolbar style="height:72px; padding:0 2.5rem;">
        <span class="nav-logo" @click="scrollTo('home')" @mouseenter="onEnter" @mouseleave="onLeave">DS</span>
        <q-space />
        <div class="gt-sm row items-center q-gutter-md">
          <q-btn v-for="item in navItems" :key="item.id"
            flat no-caps unelevated :label="item.label" class="nav-btn"
            @click="scrollTo(item.id)" @mouseenter="onEnter" @mouseleave="onLeave" />
        </div>
        <q-btn flat round dense class="lt-md"
          :icon="drawer ? 'close' : 'menu'" color="white"
          @click="drawer = !drawer" @mouseenter="onEnter" @mouseleave="onLeave" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { scroll } from 'quasar'
import { gsap } from 'gsap'
import { useCursor } from 'src/composables/useCursor'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const { isHovering, onEnter, onLeave } = useCursor()

const curDot     = ref(null)
const curRing    = ref(null)
const loaderText = ref(null)
const loaderDone = ref(false)
const drawer     = ref(false)
const scrolled   = ref(false)

const navItems = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Work'       },
  { id: 'contact',    label: 'Contact'    }
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const target = getScrollTarget(el)
  setVerticalScrollPosition(target, el.offsetTop - 72, 700)
}
const goTo = (id) => { drawer.value = false; setTimeout(() => scrollTo(id), 650) }
const onScroll = (info) => { scrolled.value = info.position.top > 60 }

let mx = 0, my = 0, rx = 0, ry = 0, rafId = null
const animRing = () => {
  if (!curRing.value) return
  rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11
  curRing.value.style.left = rx + 'px'; curRing.value.style.top = ry + 'px'
  rafId = requestAnimationFrame(animRing)
}
const onMouseMove = (e) => {
  mx = e.clientX; my = e.clientY
  if (curDot.value) { curDot.value.style.left = e.clientX + 'px'; curDot.value.style.top = e.clientY + 'px' }
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  animRing()
  gsap.set(loaderText.value, { y: '110%' })
  gsap.timeline({ onComplete: () => { loaderDone.value = true } })
    .to(loaderText.value, { y: 0,       duration: 0.7, ease: 'power3.out', delay: 0.1 })
    .to(loaderText.value, { y: '-110%', duration: 0.6, ease: 'power3.in',  delay: 0.5 })
    .to('.loader-overlay', { opacity: 0, duration: 0.4 })
})
onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style lang="scss">
.loader-leave-active { transition: opacity 0.4s ease; }
.loader-leave-to     { opacity: 0; }
</style>