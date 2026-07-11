<template>
  <div class="marquee-section">
    <div class="marquee-fade-left" />
    <div class="marquee-fade-right" />

    <div class="marquee-wrapper" ref="wrapperRef">
      <div class="marquee-track">
        <!-- First set -->
        <div class="marquee-item" v-for="tech in techs" :key="'a-' + tech.label">
          <img :src="tech.badge" :alt="tech.label" class="badge-img" />
          <img src="~assets/cherry.png" class="marquee-cherry" alt="" />
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="marquee-item" v-for="tech in techs" :key="'b-' + tech.label">
          <img :src="tech.badge" :alt="tech.label" class="badge-img" />
          <img src="~assets/cherry.png" class="marquee-cherry" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const BASE = 'https://img.shields.io/badge'
const COLOR = '350000'
const STYLE = 'for-the-badge'

const badge = (label, logo, logoColor = 'white') =>
  `${BASE}/${encodeURIComponent(label)}-${COLOR}?style=${STYLE}&logo=${logo}&logoColor=${logoColor}`

const techs = [
  { label: 'JavaScript', badge: badge('JavaScript', 'javascript') },
  { label: 'Python',     badge: badge('Python',     'python') },
  { label: 'PHP',        badge: badge('PHP',        'php') },
  { label: 'Java',       badge: badge('Java',       'openjdk') },
  { label: 'C++',        badge: badge('C++',        'c%2B%2B') },
  { label: 'HTML5',      badge: badge('HTML5',      'html5') },
  { label: 'Vue.js',     badge: badge('Vue.js',     'vuedotjs') },
  { label: 'Quasar',     badge: badge('Quasar',     'quasar') },
  { label: 'Django',     badge: badge('Django',     'django') },
  { label: 'PostgreSQL', badge: badge('PostgreSQL', 'postgresql') },
  { label: 'Docker',     badge: badge('Docker',     'docker') },
  { label: 'Git',        badge: badge('Git',        'git') },
  { label: 'GSAP',       badge: badge('GSAP',       'greensock') },
  { label: 'Three.js',   badge: badge('Three.js',   'threedotjs') },
]
</script>

<style lang="scss" scoped>
.marquee-section {
  position: relative;
  width: 100%;
  background: var(--s1);
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
  padding: 1.4rem 0;
  overflow: hidden;
}

/* Edge fade masks */
.marquee-fade-left,
.marquee-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8rem;
  z-index: 2;
  pointer-events: none;
}
.marquee-fade-left {
  left: 0;
  background: linear-gradient(to right, var(--s1), transparent);
}
.marquee-fade-right {
  right: 0;
  background: linear-gradient(to left, var(--s1), transparent);
}

.marquee-wrapper {
  width: 100%;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  animation: marqueeScroll 28s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.08);
    filter: drop-shadow(0 4px 12px rgba(201, 168, 76, 0.45));
  }
}

.badge-img {
  height: 28px;
  display: block;
  border-radius: 3px;
  opacity: 0.85;
  transition: opacity 0.3s;

  .marquee-item:hover & {
    opacity: 1;
  }
}

.marquee-cherry {
  height: 20px;
  margin-left: 2rem;
  opacity: 0.7;
  filter: drop-shadow(0 2px 4px rgba(8,0,3,0.5));
  transition: transform 0.4s ease, opacity 0.4s ease;

  .marquee-item:hover & {
    opacity: 1;
    transform: scale(1.2) rotate(15deg);
  }
}
</style>
