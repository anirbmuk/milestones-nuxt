<template>
  <div milestone>
    <div milestone-header>
      <div class="text font-bold text-blue-light md:text-xl dark:text-white">
        {{ milestone.activitycodes?.join(', ') }}
      </div>
      <div class="text-sm text-primary-light md:text-md dark:text-white">
        {{ 'Created: ' + getFullDateAndTime(milestone.createdAt) }}
      </div>
      <div class="text-sm text-primary-light md:text-md dark:text-white">
        {{ 'Last updated: ' + getFullDateAndTime(milestone.updatedAt) }}
      </div>
    </div>
    <div milestone-content>
      <span>{{
        milestone.description
      }}</span>
    </div>
    <div milestone-actions>
      <button
        aria-label="Delete this milestone"
        title="Delete this milestone"
        type="button"
        @click="$emit('delete')"
      >
        <IconDelete class="size-5 md:size-6" />
      </button>
      <button
        aria-label="Copy text to clipboard"
        title="Copy text to clipboard"
        type="button"
        @click="$emit('copy')"
      >
        <IconCopy class="size-5 md:size-6" />
      </button>
      <button
        aria-label="Edit this milestone"
        title="Edit this milestone"
        type="button"
        @click="$emit('edit')"
      >
        <IconEdit class="size-5 md:size-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Milestone } from '~/types/milestone';
import { getFullDateAndTime } from '~/helpers/date';

defineProps({
  milestone: {
    type: Object as PropType<Milestone>,
    required: true,
  },
});
defineEmits(['delete', 'copy', 'edit']);
defineOptions({
  name: 'MilestoneViewItem',
});
</script>

<style scoped>
div[milestone] {
  @apply grid grid-flow-row grid-rows-6 mb-3 px-3 py-2 max-h-[600px] rounded bg-background-dark dark:bg-transparent dark:border dark:border-solid dark:border-white;
  box-shadow: 0 2px 1px -1px #0003,0 1px 1px #00000024,0 1px 3px #0000001f;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
div[milestone-header] {
  @apply row-span-1 pt-1 pb-4;
}
div[milestone-content] {
  @apply block py-4 dark:text-white row-span-4 overflow-auto whitespace-break-spaces;
}
div[milestone-actions] {
  @apply flex flex-row justify-between pt-1 row-span-1;
}
</style>
