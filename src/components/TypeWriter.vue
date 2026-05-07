<template>
  <div class="typewriter">
    <span class="typewriter-text">{{ displayedText }}<span class="cursor" :class="{ active: isTyping }"></span></span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const words = ['Creative', 'Innovative', 'Detail-Oriented', 'Passionate', 'Thoughtful'];
const displayedText = ref('');
const currentWordIndex = ref(0);
const currentCharIndex = ref(0);
const isTyping = ref(true);
const isDeleting = ref(false);

const typeSpeed = 100;
const deleteSpeed = 50;
const pauseSpeed = 1500;

onMounted(() => {
  typeWriter();
});

const typeWriter = () => {
  const currentWord = words[currentWordIndex.value];

  if (!isDeleting.value) {
    // Typing phase
    if (currentCharIndex.value < currentWord.length) {
      displayedText.value += currentWord[currentCharIndex.value];
      currentCharIndex.value++;
      isTyping.value = true;
      setTimeout(typeWriter, typeSpeed);
    } else {
      // Finished typing, pause before deleting
      isTyping.value = false;
      setTimeout(() => {
        isDeleting.value = true;
        typeWriter();
      }, pauseSpeed);
    }
  } else {
    // Deleting phase
    if (currentCharIndex.value > 0) {
      displayedText.value = displayedText.value.slice(0, -1);
      currentCharIndex.value--;
      isTyping.value = false;
      setTimeout(typeWriter, deleteSpeed);
    } else {
      // Finished deleting, move to next word
      isDeleting.value = false;
      currentWordIndex.value = (currentWordIndex.value + 1) % words.length;
      setTimeout(typeWriter, typeSpeed);
    }
  }
};
</script>

<style scoped>
.typewriter {
  display: inline;
  font-weight: 600;
  color: var(--color-accent);
}

.typewriter-text {
  display: inline-block;
  min-width: 200px;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: var(--color-accent);
  margin-left: 2px;
  animation: blink 0.7s infinite;
}

.cursor.active {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}
</style>
