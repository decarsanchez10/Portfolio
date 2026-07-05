<template>
  <q-card flat bordered class="project-card q-pa-md" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <q-card-section>
      <div class="text-h6 text-weight-light">{{ project.title }}</div>
      <div class="text-caption text-grey-7 q-mt-sm">{{ project.description }}</div>
    </q-card-section>

    <q-card-section class="row items-center q-gutter-sm">
      <!-- Technology Logos Mapping -->
      <div v-for="lang in project.languages" :key="lang" class="tech-icon">
        <q-img :src="getLogo(lang)" width="22px" height="22px" fit="contain">
          <q-tooltip class="bg-grey-9" anchor="top middle" self="bottom middle">
            {{ lang.toUpperCase() }}
          </q-tooltip>
        </q-img>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        ref="actionBtn"
        flat
        no-caps
        label="Launch Case Study"
        color="primary"
        class="minimal-btn"
        :to="project.route"
        @click="handleClick"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  project: { type: Object, required: true }
});

const actionBtn = ref(null);

// Fix for malfunctioning buttons: explicitly ensuring event propagation is handled
const handleClick = (e) => {
  if (!props.project.route) {
    e.preventDefault();
    console.warn('Button navigation ignored: No route defined for this project.');
  }
};

const getLogo = (name) => {
  const mapping = {
    vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    quasar: 'https://cdn.quasar.dev/logo-v2/svg/logo.svg',
    javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  };
  return mapping[name.toLowerCase()] || '';
};

const onHover = (entering) => {
  // Minimalist GSAP hover: Subtle scale and lift
  gsap.to(actionBtn.value.$el, {
    y: entering ? -3 : 0,
    scale: entering ? 1.02 : 1,
    duration: 0.3,
    ease: 'power1.out'
  });
};
</script>

<style scoped>
.project-card {
  transition: all 0.4s ease;
  border-radius: 16px;
  border: 1px solid #eee;
  background: #fff;
}

.project-card:hover {
  border-color: var(--q-primary);
  box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
}

.tech-icon {
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.project-card:hover .tech-icon {
  filter: grayscale(0%);
  opacity: 1;
}

.minimal-btn {
  font-weight: 300;
  letter-spacing: 0.5px;
}
</style>