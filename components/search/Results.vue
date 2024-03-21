<template>
  <div>
    <div v-if="['complete', 'loadmore'].includes(status)">
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
      <UtilIntersect multiple
                     @tracked="$emit('loadmore')"
      >
        <div class="p-2"
             aria-hidden="true"
        />
      </UtilIntersect>
    </div>
    <div v-if="['inprogress', 'loadmore'].includes(status)"
         progress
    >
      Fetching...
    </div>
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
defineEmits(['loadmore']);
defineOptions({
  name: 'SearchResults',
});
</script>
