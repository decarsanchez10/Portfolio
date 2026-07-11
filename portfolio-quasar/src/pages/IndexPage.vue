<template>
  <q-page>
    <HeroSection />
    <MarqueeBanner />
    <AboutSection />
    <WorkExperience />
    <SkillsSection />
    <ExperienceSection />
    <FooterSection />
  </q-page>
</template>

<script setup>
import HeroSection from 'src/components/HeroSection.vue'
import MarqueeBanner from 'src/components/MarqueeBanner.vue'
import AboutSection from 'src/components/AboutSection.vue'
import WorkExperience from 'src/components/WorkExperience.vue'
import SkillsSection from 'src/components/SkillsSection.vue'
import ExperienceSection from 'src/components/ExperienceSection.vue'
import FooterSection from 'src/components/FooterSection.vue'
</script>