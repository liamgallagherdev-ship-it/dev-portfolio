<template>
  <div class="bg-01-wrap">
    <div class="preview-container">
      <svg style="display:none">
        <filter id="bg01-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div class="bg-grain"></div>
    </div>
  </div>
</template>

<script lang="ts">
export const meta = {
  id: '01',
  name: 'CSS Grain',
  day: 'Background 001',
  html: `<div class="bg-grain"></div>`,
  css: `/* see full CSS in component */`,
}

export default {}
</script>

<style scoped>
.bg-01-wrap {
  position: relative;
  width: 100%;
}

.preview-container {
  aspect-ratio: 2/1;
  overflow: hidden;
}

.bg-grain {
  width: 100%;
  height: 100%;
  position: relative;
  background: #0d0d18;
}

.bg-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(ellipse at 50% 50%, #1e1b4b 0%, #0d0d18 70%);
}

.bg-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#bg01-noise);
  opacity: 0.18;
  background: white;
}
</style>
