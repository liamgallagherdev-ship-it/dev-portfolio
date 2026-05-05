<script setup lang="ts">
const props = withDefaults(defineProps<{
  url: string;
  label?: string;
}>(), {
  label: 'Get In Touch',
});
</script>

<template>
  <a :href="props.url" class="link-btn">
    <span class="link-text">{{ props.label }}</span>
    <span class="link-arrow" aria-hidden="true">>></span>
  </a>
</template>

<style scoped>
.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
  font-weight: 500;
}

.link-text {
  display: inline-block;
  transition: letter-spacing 0.5s ease, transform 0.2s ease;
  letter-spacing: normal;
}

.link-btn:hover .link-text {
  letter-spacing: 1px;

}

.link-arrow {
  transition: transform 0.2s ease;
}

.link-btn:hover .link-arrow {

}
</style>
