<template>
  <div>
    <div v-if="['complete', 'loadmore'].includes(status)">
      <div
        v-if="milestones?.length"
        role="list"
        list
      >
        <LazySearchResult
          v-for="milestone of milestones"
          :key="milestone.milestoneid"
          :milestone="milestone"
        />
      </div>
      <div
        v-else
        error
      >
        No milestone entries found
      </div>
      <LazyUtilIntersect
        multiple
        @tracked="$emit('loadmore')"
      >
        <div
          class="p-2"
          aria-hidden="true"
        />
      </LazyUtilIntersect>
    </div>
    <div
      v-if="['inprogress', 'loadmore'].includes(status)"
      class="grid place-content-center"
    >
      <LazyIconDarkCircle class="size-6 animate-spin duration-300 md:size-8 dark:hidden" />
      <LazyIconLightCircle class="hidden size-6 animate-spin duration-300 md:size-8 dark:block" />
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
