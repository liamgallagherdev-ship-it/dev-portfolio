<template>
  <div class="code-view">
    <div class="code-section">
      <span class="code-label">HTML</span>
      <pre class="code-block"><code>{{ meta.html }}</code></pre>
    </div>
    <div class="code-section">
      <span class="code-label">CSS</span>
      <pre class="code-block"><code>{{ meta.css }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { meta } from '../Button01.vue';

export default {
  setup() {
    return { meta };
  }
}
</script>

<style scoped>
.code-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.code-section {
  display: flex;
  flex-direction: column;

}

.code-label {
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: black;
 padding: 0.5rem 1rem;
    border: 2px solid var(--color-border);
      background: var(--color-card);
}

.code-block {
  margin: 0;
  padding: 1.25rem;
  background: var(--color-card);
  border: 2px solid var(--color-border);
  overflow-x: auto;
}

.code-block code {
  font-size: 0.8rem;
  font-family: monospace;
  color: var(--color-text-muted);
  white-space: pre;
  line-height: 1.7;
}
</style>
