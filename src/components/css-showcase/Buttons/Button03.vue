<template>
  <div class="btn-03-bg">

    <div class="btn-container">
      <div class="card">
        <div class="btn-6" href="#" @mouseenter="onEnter" @mouseleave="onLeave">
          <span class="label">{{ buttonText }}</span>
          <span ref="ripple" class="ripple"></span>
        </div>
      </div>
    </div>

    <div v-if="showOptions" class="Options">
      <div>
        <input type="radio" id="btn3-label-default" name="btn3-label" value="default" v-model="selected" />
        <label for="btn3-label-default">Default</label>
      </div>
      <div>
        <input type="radio" id="btn3-label-long" name="btn3-label" value="long" v-model="selected" />
        <label for="btn3-label-long">Long</label>
      </div>
      <div>
        <input type="radio" id="btn3-label-short" name="btn3-label" value="short" v-model="selected" />
        <label for="btn3-label-short">Short</label>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export const meta = {
  id: '03',
  day: 'Button 003',
  Default: 'Button',
  Long: 'Long Button Label',
  Short: 'Go',
  html: `<a class="btn-6" href="#">
  <span class="label">Position Aware</span>
  <span class="ripple"></span>
</a>`,
  css: `/* see full CSS in component */`,
}

import { ref, computed } from 'vue';

export default {
  props: {
    showOptions: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const selected = ref('default');
    const ripple = ref<HTMLElement | null>(null);

    const labels: Record<string, string> = {
      default: meta.Default,
      long: meta.Long,
      short: meta.Short,
    };

    const buttonText = computed(() => labels[selected.value]);

    const setRipplePos = (e: MouseEvent) => {
      if (!ripple.value) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      ripple.value.style.left = `${e.clientX - rect.left}px`;
      ripple.value.style.top = `${e.clientY - rect.top}px`;
    };

    const onEnter = (e: MouseEvent) => setRipplePos(e);
    const onLeave = (e: MouseEvent) => setRipplePos(e);

    return { meta, selected, buttonText, ripple, onEnter, onLeave };
  }
}
</script>

<style scoped>
.btn-03-bg {
  position: relative;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
  aspect-ratio: 2/1;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-6 {
  --btn-color: #4361ee;
  --btn-color-dark: #1a1f6e;
  --btn-color-light: #f0f0f0;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  height: 56px;

  background: #e8e8e8;
  color: var(--btn-color);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  transition: color 0.3s ease;
  box-shadow:
    inset 2px 2px 2px rgba(255,255,255,0.6),
    4px 4px 10px rgba(0,0,0,0.12);
  white-space: nowrap;
}

.label {
  position: relative;
  z-index: 1;
}

.ripple {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--btn-color-dark);
  transform: translate(-50%, -50%);
  transition: width 0.55s ease-in-out, height 0.55s ease-in-out;
  z-index: 0;
}

.btn-6:hover {
  color: var(--btn-color-light);
  outline: 2px solid rgb(255, 255, 255);
}

.btn-6:hover .ripple {
  width: 500px;
  height: 500px;
}

.btn-6:active {
  background-color: var(--btn-color);
}

.btn-6:focus-visible {
  outline: 2px solid var(--btn-color);
  outline-offset: 3px;
}

/* ── Options bar ── */
.Options {
  display: flex;
  border-top: 2px solid rgba(0,0,0,0.1);
  background: #e0e0e0;
}

.Options div { flex: 1; }

.Options input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.Options label {
  display: block;
  text-align: center;
  padding: 0.4rem 0;
  font-size: 0.65rem;
  font-family: monospace;
  letter-spacing: 0.05em;
  color: rgba(0,0,0,0.35);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  border-right: 1px solid rgba(0,0,0,0.08);
}

.Options div:last-child label { border-right: none; }

.Options input[type="radio"]:checked + label {
  background: rgba(0,0,0,0.08);
  color: #000;
  font-weight: 700;
}
</style>
