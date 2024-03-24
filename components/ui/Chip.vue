<template>
  <div class="chip">
    <div class="dark:text-white">
      {{ text }}
    </div>
    <div
      v-if="removable"
      class="cursor-pointer text-sm text-primary-dark dark:text-white"
      role="button"
      :aria-label="`Remove tag ${text}`"
      @click="$emit('remove', text)"
    >
      &#x2715;
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['remove']);
defineOptions({
  name: 'UiChip',
});
</script>

<style scoped>
.chip {
  @apply flex items-center justify-between min-w-20 max-w-fit rounded-sm border border-gray-400 bg-transparent px-2 py-1 text-center text-md bg-gray-100 dark:bg-transparent dark:border dark:border-white space-x-2;
}
</style>
