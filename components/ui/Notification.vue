<template>
  <div class="absolute p-4 rounded flex justify-start items-center z-10 bg-primary-dark text-secondary border border-primary-dark w-full md:w-[33.33%] bottom-4 md:left-1/3">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  },
});
defineOptions({
  name: 'UiNotification',
});
</script>
