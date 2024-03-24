<template>
  <button
    type="button"
    @click="$emit('scrollToTop')"
  >
    <div
      class="absolute bottom-[9px] left-[18px] text-2xl text-primary-dark"
      translate="no"
    >
      &#8593;
    </div>
  </button>
</template>

<script setup lang="ts">
defineEmits(['scrollToTop']);

defineOptions({
  name: 'UiBackToTop',
});
</script>

<style scoped>
button {
  @apply fixed bottom-12 right-4 z-20 cursor-pointer rounded-full bg-white size-[50px] opacity-80 shadow-xl;
}

@media (hover: hover) {
  button:hover {
    @apply md:opacity-100;
  }
}
</style>
