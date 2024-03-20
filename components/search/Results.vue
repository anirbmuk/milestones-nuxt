<template>
  <div v-if="status === 'complete'">
    <div v-if="milestones?.length"
         role="list"
         list
    >
      <SearchResult v-for="milestone of milestones"
                    :key="milestone.milestoneid"
                    :milestone="milestone"
      />
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
  name: 'SearchResults',
});
</script>

<style scoped>
div[list] {
  @apply pb-2.5 pt-0.5;
}
</style>