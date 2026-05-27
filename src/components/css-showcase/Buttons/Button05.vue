<template>
  <div class="btn-05-bg">
    <div class="btn-container">
      <button class="bubbly-button">{{ label }}</button>
    </div>

    <div v-if="showOptions" class="Options">
      <div>
        <input type="radio" id="btn05-default" name="btn05-label" value="default" v-model="selected" />
        <label for="btn05-default">Default</label>
      </div>
      <div>
        <input type="radio" id="btn05-long" name="btn05-label" value="long" v-model="selected" />
        <label for="btn05-long">Long</label>
      </div>
      <div>
        <input type="radio" id="btn05-short" name="btn05-label" value="short" v-model="selected" />
        <label for="btn05-short">Short</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export const meta = {
  id: '05',
  day: 'Button 005',
  Default: 'Click me!',
  Long: 'Get Started Today',
  Short: 'Go',
  html: `<button class="bubbly-button">Click me!</button>`,
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
.btn-05-bg {
  position: relative;
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8faff;
  aspect-ratio: 2/1;
}

.bubbly-button {
  font-family: 'Courier Prime', monospace;
  display: inline-block;
  font-size: 1em;
  padding: 1em 2em;
  appearance: none;
  background-color: #ff0081;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  isolation: isolate;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
}

.bubbly-button:focus {
  outline: 0;
}

.bubbly-button:active {
  transform: scale(0.9);
  background-color: #e6006f;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
}

.bubbly-button::before,
.bubbly-button::after {
  position: absolute;
  content: '';
  display: block;
  width: 140%;
  height: 100%;
  left: -20%;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: 0% 0%;
}

.bubbly-button::before {
  top: -75%;
  background-image:
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, #ff0081 20%, transparent 30%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%);
}

.bubbly-button::after {
  bottom: -75%;
  background-image:
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%);
}

.bubbly-button:hover::before {
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
  animation: topBubbles ease-in-out 0.75s forwards;
}

.bubbly-button:hover::after {
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  animation: bottomBubbles ease-in-out 0.75s forwards;
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

/* Options bar */
.Options {
  display: flex;
  border-top: 2px solid rgba(255, 0, 129, 0.15);
  background: #f8faff;
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
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  border-right: 1px solid rgba(255, 0, 129, 0.1);
}

.Options div:last-child label { border-right: none; }

.Options input[type="radio"]:checked + label {
  background: rgba(255, 0, 129, 0.08);
  color: #ff0081;
  font-weight: 700;
}
</style>
