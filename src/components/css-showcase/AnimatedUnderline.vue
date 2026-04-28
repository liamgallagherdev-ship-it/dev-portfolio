<template>
  <div class="demo-preview">
    <a href="#" class="underline-link">Hover underline</a>
  </div>
  <div class="demo-info">
    <h3>Animated Underline</h3>
    <p>Expand underline from center on hover</p>
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
.underline-link {
  position: relative;
  color: var(--color-text, #e4e4e7);
}

.underline-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #6366f1;
  transition: 0.3s ease;
  transform: translateX(-50%);
}

.underline-link:hover::after {
  width: 100%;
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