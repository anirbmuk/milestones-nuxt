<template>
  <div milestone>
    <div milestone-header>
      <div class="text font-bold text-blue-light md:text-xl">
        {{ milestone.activitycodes?.join(', ') }}
      </div>
      <div class="text-sm text-primary-light md:text-md">
        {{ 'Created On: ' + getFullDateAndTime(milestone.createdAt) }}
      </div>
      <div class="text-sm text-primary-light md:text-md">
        {{ 'Last Updated On: ' + getFullDateAndTime(milestone.updatedAt) }}
      </div>
    </div>
    <div milestone-content>
      <span>{{
        milestone.description
      }}</span>
    </div>
    <div milestone-actions>
      <button
        aria-label="Delete this entry"
        title="Delete this entry"
        type="button"
        @click="$emit('delete')"
      >
        <IconDelete class="size-5 md:size-6" />
      </button>
      <button
        aria-label="Copy this entry"
        title="Copy text to clipboard"
        type="button"
        @click="$emit('copy')"
      >
        <IconCopy class="size-5 md:size-6" />
      </button>
      <button
        aria-label="Edit this entry"
        title="Edit this entry"
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
  @apply block my-2 p-4 rounded bg-background-dark;
  box-shadow: 0 2px 1px -1px #0003,0 1px 1px #00000024,0 1px 3px #0000001f;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
div[milestone-content] {
  @apply block py-4 md:h-56 md:max-h-56;
}
div[milestone-actions] {
  @apply flex flex-row justify-between pt-8 pb-2;
}
</style>
