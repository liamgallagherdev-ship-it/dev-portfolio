<template>
  <article class="demo-card" :data-category="category">
    <slot />
  </article>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.demo-card {
  background: var(--color-card, #18181b);
  border: 1px solid var(--color-border, #27272a);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.demo-card:hover {
  border-color: var(--color-accent, #6366f1);
}
</style>