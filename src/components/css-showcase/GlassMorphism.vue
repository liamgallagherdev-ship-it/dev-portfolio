<template>
  <div class="demo-preview glass-preview">
    <div class="glass-card">
      <h4>Glass</h4>
      <p>Glass morphism</p>
    </div>
  </div>
  <div class="demo-info">
    <h3>Glass Morphism</h3>
    <p>Backdrop blur with semi-transparent background</p>
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
.glass-preview {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.glass-card h4 {
  color: white;
  margin-bottom: 0.25rem;
}

.glass-card p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
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