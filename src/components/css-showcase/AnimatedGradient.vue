<template>
  <div class="demo-preview">
    <div class="gradient-animated"></div>
  </div>
  <div class="demo-info">
    <h3>Animated Gradient</h3>
    <p>Smooth gradient background animation using CSS keyframes</p>
    <button class="code-toggle" @click="toggleCode">{{ showCode ? 'Hide Code' : 'View Code' }}</button>
    <pre class="code-block" :class="{ open: showCode }"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  code: {
    type: String,
    required: true
  }
});

const showCode = ref(false);

const toggleCode = () => {
  showCode.value = !showCode.value;
};
</script>

<style scoped>
.gradient-animated {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.demo-preview {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg, #0f0f0f);
  border-bottom: 1px solid var(--color-border, #27272a);
  padding: 1rem;
}

.demo-info {
  padding: 1.25rem;
}

.demo-info h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text, #e4e4e7);
}

.demo-info p {
  color: var(--color-text-muted, #a1a1aa);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.code-toggle {
  background: transparent;
  border: 1px solid var(--color-border, #27272a);
  color: var(--color-text-muted, #a1a1aa);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-toggle:hover {
  border-color: var(--color-accent, #6366f1);
  color: var(--color-text, #e4e4e7);
}

.code-block {
  display: none;
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-bg, #0f0f0f);
  border-radius: 0.5rem;
  overflow-x: auto;
}

.code-block.open {
  display: block;
}

.code-block code {
  font-size: 0.75rem;
  color: var(--color-text-muted, #a1a1aa);
  white-space: pre;
  font-family: monospace;
}
</style>