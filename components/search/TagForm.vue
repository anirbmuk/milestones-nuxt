<template>
  <div class="mx-auto my-3 space-y-2 lg:w-1/2">
    <div class="flex items-center justify-between">
      <UiToggleButton v-model="searchState.searchDepth"
                      :options="DEPTH_OPTIONS"
      />
      <UiToggleButton v-model="searchState.sortDir"
                      :options="SORT_OPTIONS"
      />
    </div>
    <UiAutoComplete v-model="searchState.tq"
                    :options="options"
                    placeholder="Search by tags (min 3 characters)..."
                    @update:input="fetchActivities($event)"
    />
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

const fetchActivities = async (value: string) => {
  if (!value) {
    return options.value = [];
  }
  await fetch(`/api/activity?q=${value}`);
};

defineOptions({
  name: 'SearchTagForm',
});
</script>
