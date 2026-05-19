<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}>(), {
  beforeAlt: 'Before',
  afterAlt: 'After',
});

const position = ref(50);
const container = ref<HTMLDivElement | null>(null);
const dragging = ref(false);

function updatePosition(clientX: number) {
  if (!container.value) return;
  const { left, width } = container.value.getBoundingClientRect();
  position.value = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
}

function onPointerDown(e: PointerEvent) {
  dragging.value = true;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  updatePosition(e.clientX);
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return;
  updatePosition(e.clientX);
}

function stopDrag() {
  dragging.value = false;
}
</script>

<template>
  <div
    ref="container"
    class="ba-container"
    :class="{ 'is-dragging': dragging }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="stopDrag"
    @pointercancel="stopDrag"
  >
    <!-- After image — base layer, sets container height -->
    <img :src="after" :alt="afterAlt" class="ba-img" draggable="false" />

    <!-- Before image — clipped by slider position -->
    <img
      :src="before"
      :alt="beforeAlt"
      class="ba-img ba-img-before"
      :style="{ clipPath: `inset(0 ${(100 - position).toFixed(1)}% 0 0)` }"
      draggable="false"
    />

    <!-- Divider line + handle -->
    <div class="ba-handle" :style="{ left: `${position.toFixed(1)}%` }">
      <div class="ba-btn" :class="{ active: dragging }">
        <span class="ba-arrows">&#9664;&#9654;</span>
      </div>
    </div>

    <!-- Corner labels -->
    <span class="ba-label ba-label-before" :style="{ opacity: position > 12 ? 1 : 0 }">Before</span>
    <span class="ba-label ba-label-after"  :style="{ opacity: position < 88 ? 1 : 0 }">After</span>
  </div>
</template>

<style scoped>
.ba-container {
  position: relative;
  overflow: hidden;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  border: 6px solid var(--color-border);

  aspect-ratio: 2.8 / 2;
}

.ba-img {
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.ba-img-before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* Divider line */
.ba-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: teal;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: none;
}

/* Drag button centred on the line */
.ba-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: teal;
  border: 3px solid var(--color-bg, #e5dcd3);
  box-shadow: 3px 3px 0 var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.1s ease, transform 0.1s ease;
  pointer-events: auto;
  cursor: col-resize;
}

.ba-btn.active {
  box-shadow: 1px 1px 0 var(--color-border);
  transform: translate(-50%, -50%) scale(0.92);
}

.ba-arrows {
  color: #fff;
  font-size: 0.75rem;
  letter-spacing: 2px;
  pointer-events: none;
}

/* Corner labels */
.ba-label {
  position: absolute;
  top: 1rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.2rem 0.6rem;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  font-family: 'Courier Prime', monospace;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 3;
}

.ba-label-before { left: 1rem; }
.ba-label-after  { right: 1rem; }
</style>
