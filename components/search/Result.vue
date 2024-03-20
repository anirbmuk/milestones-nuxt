<template>
  <div v-if="status === 'complete'">
    <div v-if="milestones?.length"
         role="list"
         list
    >
      <div v-for="milestone of milestones"
           :key="milestone.milestoneid"
           role="listitem"
           listitem
      >
        <div class="!md:text-xl !py-0.5 text !font-bold">
          {{ milestone.activitycodes?.join(', ') }}
        </div>
        <div class="!py-0.5 text-sm text-primary-light md:text-md">
          {{ milestone.month + '/' + milestone.day + '/' + milestone.year }}
        </div>
        <div
          class="whitespace-pre-line break-words !py-1.5 text-justify text-primary-dark"
        >
          {{ milestone.description }}
        </div>
      </div>
    </div>
    <div v-else
         error
    >
      No milestone entries found
    </div>
  </div>
  <div v-else-if="status === 'inprogress'"
       progress
  >
    Fetching...
  </div>
</template>

<script setup lang="ts">
import type { Milestone } from '~/types/milestone';
import type { SearchStatus } from '~/types/search';

defineProps({
  milestones: {
    type: Object as PropType<Milestone[]>,
    required: true,
  },
  status: {
    type: String as PropType<SearchStatus>,
    required: true,
  },
});
defineOptions({
  name: 'SearchResult',
});
</script>

<style scoped>
div[list] {
  @apply pb-2.5 pt-0.5;
}
div[listitem] {
  @apply mb-2 mt-2 block min-h-20 p-3 text-md first:mt-0 last:mb-0 bg-gray-50;
  box-shadow: 0 3px 3px -2px #0003,0 3px 4px #00000024,0 1px 8px #0000001f;
}
</style>