<template>
  <q-page style="background: var(--bg);">
    <HeroSection @scroll-to="scrollTo" />

    <div class="mq-wrap">
      <div class="mq-track">
        <div v-for="(item, i) in mqAll" :key="i" class="mq-item">
          {{ item }}<span class="mq-dot" />
        </div>
      </div>
    </div>

    <ProjectSection />
    <q-separator />
    <ExperienceSection />
    <q-separator />
    <AboutSection />
    <FooterSection />
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { scroll } from 'quasar'
import HeroSection from 'src/components/HeroSection.vue'
import ProjectSection from 'src/components/ProjectSection.vue'
import ExperienceSection from 'src/components/ExperienceSection.vue'
import AboutSection from 'src/components/AboutSection.vue'
import FooterSection from 'src/components/FooterSection.vue'



const { getScrollTarget, setVerticalScrollPosition } = scroll
const mqBase = ['PHP','JavaScript','Python','MySQL','HTML5','CSS3','Web Dev','Three.js','Java','C++','SQL','CSS3']
const mqAll  = computed(() => [...mqBase, ...mqBase])

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  setVerticalScrollPosition(getScrollTarget(el), el.offsetTop - 72, 700)
}
</script>