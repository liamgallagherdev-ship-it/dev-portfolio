<template>
  <div class="btn-01-bg">

    <svg style="display: none">
      <symbol id="arrow-right" viewBox="0 0 20 10">
        <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
      </symbol>
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="6" stitchTiles="stitch"></feTurbulence>
      </filter>
    </svg>

    <div class="btn-container">
      <div class="card">
        <button class="button" type="button">
          <span class="text">{{ buttonText }}</span>
          <div class="icon">
            <svg><use xlink:href="#arrow-right"></use></svg>
          </div>
        </button>
      </div>
    </div>

    <div v-if="showOptions" class="Options">
      <div>
        <input type="radio" id="btn-label-default" name="btn-label" value="default" v-model="selected" />
        <label for="btn-label-default">Default</label>
      </div>
      <div>
        <input type="radio" id="btn-label-long" name="btn-label" value="long" v-model="selected" />
        <label for="btn-label-long">Long</label>
      </div>
      <div>
        <input type="radio" id="btn-label-short" name="btn-label" value="short" v-model="selected" />
        <label for="btn-label-short">Short</label>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export const meta = {
  id: '01',
  day: 'Button 001',
  Default: 'Button',
  Long: 'Long Button Label',
  Short: 'Btn',
  html: `<button class="button" type="button">
  <span class="text">Hover</span>
  <div class="icon">
    <svg><use xlink:href="#arrow-right"></use></svg>
  </div>
</button>`,
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

    const labels: Record<string, string> = {
      default: meta.Default,
      long: meta.Long,
      short: meta.Short,
    };

    const buttonText = computed(() => labels[selected.value]);

    return { meta, selected, buttonText };
  }
}
</script>

<style scoped>
.btn-01-bg {
  position: relative;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(9, 8, 25);
  aspect-ratio: 2/1;
}

.card {
  --color: #00afaf;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

}



.button {
  --w: 180px;
  --h: 54px;
  --icon-size: 25px;
  --text-color: rgb(210 210 240);
  --box-glow-color: transparent;
  --box-glow-blur: 20px;
  position: relative;
  min-width: var(--w);
  min-height: var(--h);
  border-radius: var(--h);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-color);
  background: rgb(4 8 20 / 0.8);
  box-shadow: 0 0 0 1px rgb(200 200 220 / 0.22),
    0 0 var(--box-glow-blur) var(--box-glow-color),
    inset 0 0 26px -10px var(--box-glow-color);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 500ms ease;
  z-index: 2;
}

.button::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgb(200 200 220 / 0.1);
  box-shadow: inset 0 0px 24px 0 rgb(170 230 250 / 0.12);
  border-radius: var(--h);
  z-index: 1;
  transition: transform 500ms ease, box-shadow 500ms ease;
}

.text,
.icon {
  z-index: 2;
}

.text {
  transform: translateX(-50%);
  transition: transform 500ms ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(var(--w) - var(--icon-size) - 2rem);
}

.icon {
  position: absolute;
  width: var(--icon-size);
  height: var(--icon-size);
  left: 0;
  transform: translateX(calc((var(--w)) / 2 + 20px));
  transition: transform 500ms ease, color 500ms ease;
}

svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.button:active { --box-glow-blur: 36px; }

.button:hover,
.button:active {
  --box-glow-color: var(--color);
}

.button:hover::before,
.button:active::before {
  transform: translateX(65%);
  box-shadow: inset 0 0px 0px 0 transparent;
}

.button:hover .text,
.button:active .text {
  transform: translateX(0%);
}

.button:hover .icon,
.button:active .icon {
  transform: translateX(calc(var(--w) - var(--icon-size) - 19px));
  color: var(--color);
}

.button:focus-visible { outline: none; }

.button:focus-visible:not(:hover, :active) {
  --box-glow-color: rgb(114 114 114 / 0.5);
}

/* ── Options bar ── */
.Options {
  display: flex;
  border-top: 2px solid rgba(255,255,255,0.1);
  background: rgb(9, 8, 25);
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
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  border-right: 1px solid rgba(255,255,255,0.08);
}

.Options div:last-child label { border-right: none; }

.Options input[type="radio"]:checked + label {
  background: rgba(255,255,255,0.08);
  color: #fff;
  font-weight: 700;
}
</style>
