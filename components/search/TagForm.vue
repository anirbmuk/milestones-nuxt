<template>
  <div>
    <div class="mx-auto my-4 space-y-2 lg:w-1/2">
      <div class="flex items-center justify-between">
        <UiToggleButton v-model="searchState.searchDepth"
                        :options="depthOptions"
        />
        <UiToggleButton v-model="searchState.sortDir"
                        :options="sortOptions"
        />
      </div>
      <UiAutoComplete v-model="searchState.q"
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

const { state: searchState } = useSearch();
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

const depthOptions: KeyValue<SearchState['searchDepth']>[] = [{
  label: 'Match all',
  value: 'all', 
}, {
  label: 'Match any',
  value: 'in', 
}];

const fetchActivities = async (value: string) => await fetch(`/api/activity?q=${value}`);

defineOptions({
  name: 'SearchTagForm',
});
</script>
