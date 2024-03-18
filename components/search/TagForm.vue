<template>
  <div class="mx-auto my-4 flex items-center justify-between lg:w-1/2">
    <UiToggleButton v-model="searchDepth"
                    :options="depthOptions"
    />
    <UiToggleButton v-model="sortDirection"
                    :options="sortOptions"
    />
  </div>
</template>

<script setup lang="ts">
import type { SearchState } from '~/types/search';
import type { KeyValue } from '~/types/toggle';

const {
  state: searchState,
  setSortDir, 
  setSearchDepth,
} = useSearch();

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

defineOptions({
  name: 'SearchTagForm',
});
</script>
