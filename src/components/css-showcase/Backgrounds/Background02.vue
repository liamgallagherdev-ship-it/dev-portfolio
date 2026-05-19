<template>
  <div class="bg-02-wrap">

    <div ref="gradientBg" class="gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg" class="noiseBg">
        <filter id="bg02-noiseFilterBg">
          <feTurbulence type="fractalNoise" baseFrequency="5.6" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg02-noiseFilterBg)" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" class="svgBlur">
        <defs>
          <filter id="bg02-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div class="gradients-container">
        <div class="g1"></div>
        <div class="g2"></div>
        <div class="g3"></div>
        <div class="g4"></div>
        <div class="g5"></div>
        <div ref="interBubble" class="interactive"></div>
      </div>
    </div>

    <div class="card">
      <div class="content">
        <h2>Interactive Gradient</h2>
        <p>Move your cursor over the background.</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export const meta = {
  id: '03',
  name: 'Interactive Gradient',
  day: 'Background 002',
  html: `<!-- see full component -->`,
  css: `/* see full CSS in component */`,
}

import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const interBubble = ref<HTMLElement | null>(null);
    const gradientBg = ref<HTMLElement | null>(null);

    let curX = 0, curY = 0, tgX = 0, tgY = 0;
    let rafId = 0;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interBubble.value) {
        interBubble.value.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      rafId = requestAnimationFrame(move);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!gradientBg.value) return;
      const rect = gradientBg.value.getBoundingClientRect();
      tgX = e.clientX - rect.left;
      tgY = e.clientY - rect.top;
    };

    onMounted(() => {
      move();
      window.addEventListener('mousemove', onMouseMove);
    });

    onUnmounted(() => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
    });

    return { meta, interBubble, gradientBg };
  }
}
</script>

<style scoped>
.bg-02-wrap {
  --color-bg1: rgb(8, 10, 15);
  --color-bg2: rgb(0, 17, 32);
  --color1: 18, 113, 255;
  --color2: 107, 74, 255;
  --color3: 100, 100, 255;
  --color4: 50, 160, 220;
  --color5: 80, 47, 122;
  --color-interactive: 140, 100, 255;
  --circle-size: 80%;
  --blending: hard-light;

  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
  overflow: hidden;
}

/* ── Gradient background ── */
.gradient-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
  overflow: hidden;
}

.gradient-bg .svgBlur {
  display: none;
}

.gradient-bg .noiseBg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  mix-blend-mode: soft-light;
  opacity: 0.9;
}

.gradient-bg .gradients-container {
  filter: url(#bg02-goo) blur(40px);
  width: 100%;
  height: 100%;
}

.g1, .g2, .g3, .g4, .g5, .interactive {
  position: absolute;
  mix-blend-mode: var(--blending);
}

.g1 {
  background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: center center;
  animation: moveVertical 30s ease infinite;
}

.g2 {
  background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 400px);
  animation: moveInCircle 20s reverse infinite;
}

.g3 {
  background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2 + 200px);
  left: calc(50% - var(--circle-size) / 2 - 500px);
  transform-origin: calc(50% + 400px);
  animation: moveInCircle 40s linear infinite;
}

.g4 {
  background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 200px);
  animation: moveHorizontal 40s ease infinite;
  opacity: 0.7;
}

.g5 {
  background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
  width: calc(var(--circle-size) * 2);
  height: calc(var(--circle-size) * 2);
  top: calc(50% - var(--circle-size));
  left: calc(50% - var(--circle-size));
  transform-origin: calc(50% - 800px) calc(50% + 200px);
  animation: moveInCircle 20s ease infinite;
}

.interactive {
  background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
  width: 100%;
  height: 100%;
  top: -50%;
  left: -50%;
  opacity: 0.3;
}

/* ── Card overlay ── */
.card {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 4rem);
  max-width: 480px;
  padding: 2rem 2.5rem;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 90px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 34%, rgba(255,255,255,1) 89%, rgba(255,255,255,0) 100%);
  opacity: 0.3;
  filter: blur(0.5px);
  mix-blend-mode: hard-light;
}

.card .noise {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  opacity: 0.1;
}

.card .content {
  position: relative;
  z-index: 2;
  color: #fff;
  text-shadow: -3px 0 2px rgba(0,0,0,0.1);
}

.card .content h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
}

.card .content p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
}

/* ── Keyframes ── */
@keyframes moveInCircle {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@keyframes moveVertical {
  0%   { transform: translateY(-50%); }
  50%  { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
}

@keyframes moveHorizontal {
  0%   { transform: translateX(-50%) translateY(-10%); }
  50%  { transform: translateX(50%) translateY(10%); }
  100% { transform: translateX(-50%) translateY(-10%); }
}
</style>
