<template>
  <div class="overlay">
    <div class="overlay-content">
      <div class="spinner">
        <span class="spinner-text animate-pulse">Loading...</span>
        <div class="spinner-sector spinner-sector-red" />
        <div class="spinner-sector spinner-sector-blue" />
        <div class="spinner-sector spinner-sector-green" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UiLoadingScreen',
});
</script>

<style scoped>
.overlay {
  @apply fixed inset-0 z-100 h-full w-full bg-overlay;
}

.overlay-content {
  @apply fixed left-1/2 top-1/3 z-200 -translate-x-1/2;
}

.spinner-text {
  @apply text-gray-300;
}

.spinner {
  @apply relative flex h-32 w-32 items-center justify-center overflow-hidden align-middle text-xl;
}

.spinner-sector {
  @apply pointer-events-none absolute h-full w-full animate-rotate rounded-full border-8 border-transparent mix-blend-overlay;
}

.spinner-sector-red {
  @apply border-t-[lightcoral];
  --duration: 1.5s;
  --timing: ease-in-out;
}

.spinner-sector-blue {
  @apply border-l-[lightcoral];
  border-left-color: lightblue;
  --duration: 2s;
  --timing: ease-in;
}

.spinner-sector-green {
  @apply border-r-[lightgreen];
  --duration: 2.5s;
  --timing: ease-out;
}
</style>
