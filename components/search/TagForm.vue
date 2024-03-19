<template>
  <div>
    <div class="mx-auto my-4 space-y-2 lg:w-1/2">
      <div class="flex items-center justify-between">
        <UiToggleButton v-model="searchState.searchDepth"
                        :options="DEPTH_OPTIONS"
        />
        <UiToggleButton v-model="searchState.sortDir"
                        :options="SORT_OPTIONS"
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
const {
  state: searchState,
  SORT_OPTIONS,
  DEPTH_OPTIONS,
} = useSearch();
const {
  fetch,
  data: options,
} = useGetData<string[]>();

const fetchActivities = async (value: string) => await fetch(`/api/activity?q=${value}`);

defineOptions({
  name: 'SearchTagForm',
});
</script>
