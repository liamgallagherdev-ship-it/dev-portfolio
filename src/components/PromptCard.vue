<template>
  <article class="prompt-card" :data-category="category">
    <div class="card-preview" :style="{ background: previewGradient }">
      <span class="category-badge">{{ category }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-desc">{{ description }}</p>
      <div class="card-footer">
        <div class="tags">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <button @click="copy" class="copy-btn" :class="{ copied }">
          {{ copied ? 'Copied!' : 'Copy Prompt' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  prompt: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  gradient: { type: Number, default: 0 }
});

const GRADIENTS = [
  'linear-gradient(135deg, #0f0c29 0%, #302b63 60%, #24243e 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #0d0d18 0%, #1e1b4b 100%)',
];

const previewGradient = GRADIENTS[props.gradient % GRADIENTS.length];
const copied = ref(false);

async function copy() {
  await navigator.clipboard.writeText(props.prompt);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}
</script>

<style scoped>
.prompt-card {
  background: var(--color-card, #18181b);
  border: 2px solid var(--color-border);
  border-radius: 0;
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.prompt-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.card-preview {
  height: 140px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
}

.category-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 0.2rem 0.5rem;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.3;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.copy-btn {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.4rem 0.85rem;
  border: 2px solid var(--color-accent);
  background: transparent;
  color: var(--color-accent);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.copy-btn:hover {
  background: var(--color-accent);
  color: #fff;
}

.copy-btn.copied {
  background: #16a34a;
  border-color: #16a34a;
  color: #fff;
}
</style>
