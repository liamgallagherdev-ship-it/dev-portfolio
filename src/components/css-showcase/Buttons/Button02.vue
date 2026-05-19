<template>
  <div class="btn-02-bg">

    <div class="btn-container">
      <div class="card">
        <button class="custom-btn btn-5" type="button">
          <span>{{ buttonText }}</span>
        </button>
      </div>
    </div>

    <div v-if="showOptions" class="Options">
      <div>
        <input type="radio" id="btn2-label-default" name="btn2-label" value="default" v-model="selected" />
        <label for="btn2-label-default">Default</label>
      </div>
      <div>
        <input type="radio" id="btn2-label-long" name="btn2-label" value="long" v-model="selected" />
        <label for="btn2-label-long">Long</label>
      </div>
      <div>
        <input type="radio" id="btn2-label-short" name="btn2-label" value="short" v-model="selected" />
        <label for="btn2-label-short">Short</label>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export const meta = {
  id: '02',
  day: 'Button 002',
  Default: 'Button',
  Long: 'Long Button Label',
  Short: 'Go',
  html: `<button class="custom-btn btn-5" type="button">
  <span>Read More</span>
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
.btn-02-bg {
  position: relative;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e0e5ec;
  aspect-ratio: 2/1;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-btn {
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.85rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  white-space: nowrap;
}

.btn-5 {
  height: 40px;
  line-height: 20px;
  border: none;
  background: rgb(255,27,0);
  background: linear-gradient(0deg, rgba(255,27,0,1) 0%, rgba(251,75,2,1) 100%);
}

.btn-5:hover {
  color: #f0094a;
  background: transparent;
  box-shadow: none;
}

.btn-5::before,
.btn-5::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #f0094a;
  box-shadow:
    -1px -1px 5px 0px #fff,
    7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}

.btn-5::after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}

.btn-5:hover::before,
.btn-5:hover::after {
  width: 100%;
  transition: 800ms ease all;
}

.btn-5:focus-visible {
  outline: 2px solid #f0094a;
  outline-offset: 3px;
}

/* ── Options bar ── */
.Options {
  display: flex;
  border-top: 2px solid rgba(255,255,255,0.1);
  background: #00000015;    
  color: black;
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
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  border-right: 1px solid rgba(255,255,255,0.08);
}

.Options div:last-child label { border-right: none; }

.Options input[type="radio"]:checked + label {
  background: rgba(255,255,255,0.08);
  color: #000000;
  font-weight: 700;
}
</style>
