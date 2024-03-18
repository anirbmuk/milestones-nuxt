<template>
  <div>
    <div class="mx-auto my-4 space-y-2 lg:w-1/2">
      <div class="flex items-center justify-between">
        <UiToggleButton v-model="searchDepth"
                        :options="depthOptions"
        />
        <UiToggleButton v-model="sortDirection"
                        :options="sortOptions"
        />
      </div>
      <UiAutoComplete v-model="activities"
                      :options="options"
                      placeholder="Add tags to search..."
                      @update:input="fetchActivities($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchState } from '~/types/search';
import type { KeyValue } from '~/types/toggle';

const {
  state: searchState,
  setSortDir, 
  setSearchDepth,
  setSearchString,
} = useSearch();
const {
  fetch,
  data: options, 
} = useGetData<string[]>();

const sortOptions: KeyValue<SearchState['sortDir']>[] = [{
  label: 'Asc',
  value: 'asc', 
}, {
  label: 'Desc',
  value: 'desc', 
}];
const sortDirection = ref<SearchState['sortDir']>(searchState.value.sortDir);
watch(sortDirection, (sd) => setSortDir(sd));

const depthOptions: KeyValue<SearchState['searchDepth']>[] = [{
  label: 'Match all',
  value: 'all', 
}, {
  label: 'Match any',
  value: 'in', 
}];
const searchDepth = ref<SearchState['searchDepth']>(searchState.value.searchDepth);
watch(searchDepth, (sd) => setSearchDepth(sd));

const activities = ref<string[]>(searchState.value.q.split(',').filter(Boolean));
watch(activities, (q) => setSearchString(q.join(',')));

const fetchActivities = async (value: string) => await fetch(`/api/activity?q=${value}`);

defineOptions({
  name: 'SearchTagForm',
});
</script>
