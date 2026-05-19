<template>
  <div class="bg-03-wrap">
    <canvas ref="canvas" class="noise-canvas"></canvas>
    <div class="bg-mask"></div>
  </div>
</template>

<script lang="ts">
export const meta = {
  id: '04',
  name: 'Static Noise',
  day: 'Background 003',
  html: `<canvas class="noise-canvas"></canvas>
<div class="bg-mask"></div>`,
  css: `/* see full CSS in component */`,
}

import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let rafId = 0;

    const draw = () => {
      const el = canvas.value;
      if (!el) return;
      const ctx = el.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#969696';
      ctx.fillRect(0, 0, el.width, el.height);

      ctx.fillStyle = '#fff';
      for (let i = 0; i < 14000; i++) {
        ctx.fillRect(Math.random() * el.width, Math.random() * el.height, 1, 1);
      }

      rafId = requestAnimationFrame(draw);
    };

    onMounted(() => {
      const el = canvas.value;
      if (!el) return;
      const { offsetWidth, offsetHeight } = el.parentElement!;
      el.width = offsetWidth;
      el.height = offsetHeight;
      draw();
    });

    onUnmounted(() => cancelAnimationFrame(rafId));

    return { meta, canvas };
  }
}
</script>

<style scoped>
.bg-03-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
  overflow: hidden;
  background: #000;
}

.noise-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.bg-mask {
  position: absolute;
  inset: 0;
  background: radial-gradient( rgba(255, 168, 98, 0.267) 0, lab(0% 0 0) 100%);
  pointer-events: none;
}
</style>
