<template>
  <div class="gradient-01-bg">
    <div class="preview-container">
      <div class="gradient-animated"></div>
    </div>
  </div>
</template>

<script lang="ts">
export const meta = {
  id: '02',
  name: 'Linear Loop',
  day: 'Gradient 001',
  html: `<div class="gradient-animated"></div>`,
  css: `/* see full CSS in component */`,
}

export default {}
</script>

<style scoped>
.gradient-01-bg {
  position: relative;
  width: 100%;
}

.preview-container {
  aspect-ratio: 2/1;
  overflow: hidden;
}

.gradient-animated {
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
