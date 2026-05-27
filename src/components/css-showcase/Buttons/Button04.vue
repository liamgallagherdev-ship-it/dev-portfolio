<template>
  <div class="btn-04-bg">
    <div class="btn-container">
      <button class="learn-more">
        <span class="circle" aria-hidden="true">
          <span class="icon arrow"></span>
        </span>
        <span class="button-text">{{ label }}</span>
      </button>
    </div>

    <div v-if="showOptions" class="Options">
      <div>
        <input type="radio" id="btn04-default" name="btn04-label" value="default" v-model="selected" />
        <label for="btn04-default">Default</label>
      </div>
      <div>
        <input type="radio" id="btn04-long" name="btn04-label" value="long" v-model="selected" />
        <label for="btn04-long">Long</label>
      </div>
      <div>
        <input type="radio" id="btn04-short" name="btn04-label" value="short" v-model="selected" />
        <label for="btn04-short">Short</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export const meta = {
  id: '04',
  day: 'Button 004',
  Default: 'Button',
  Long: 'Long Button Label',
  Short: 'Btn',
  html: `<button class="learn-more">
  <span class="circle" aria-hidden="true">
    <span class="icon arrow"></span>
  </span>
  <span class="button-text">Button</span>
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
    const label = computed(() => labels[selected.value]);
    return { meta, selected, label };
  }
}
</script>

<style scoped>
.btn-04-bg {
  position: relative;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f8fa;
  aspect-ratio: 2/1;
}

button.learn-more {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: 1rem;
  font-family: 'Courier Prime', monospace;
  height: 3rem;
  overflow: hidden;
}

.circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 3rem;
  height: 3rem;
  background: #282936;
  border-radius: 1.625rem;
  z-index: 0;
}

.icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

.icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625rem;
  width: 1.125rem;
  height: 0.125rem;
  background: none;
}

.icon.arrow::before {
  position: absolute;
  content: '';
  top: -0.25rem;
  right: 0.0625rem;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
}

.button-text {
  transition: color 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  z-index: 1;
  padding: 0 1.5rem 0 calc(3rem + 0.875rem);
  color: #282936;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

button.learn-more:hover .circle {
  width: 100%;
}

button.learn-more:hover .icon.arrow {
  background: #fff;
  transform: translate(1rem, 0);
}

button.learn-more:hover .button-text {
  color: #fff;
}

.Options {
  display: flex;
  border-top: 2px solid rgba(0,0,0,0.1);
  background: #f3f8fa;
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
  border-right: 1px solid rgba(0,0,0,0.1);
}

.Options div:last-child label { border-right: none; }

.Options input[type="radio"]:checked + label {
  background: rgba(0,0,0,0.06);
  color: #282936;
  font-weight: 700;
}
</style>
