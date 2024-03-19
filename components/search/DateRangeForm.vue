<template>
  <div>
    <div class="mx-auto my-4 space-y-2 lg:w-1/2">
      <div class="flex items-center justify-end">
        <UiToggleButton v-model="searchState.sortDir"
                        :options="SORT_OPTIONS"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  state: searchState,
  SORT_OPTIONS,
} = useSearch();
defineOptions({
  name: 'SearchDateRangeForm',
});
</script>
