<template>
  <div>
    <div class="mx-auto my-4 space-y-2 lg:w-1/2">
      <div class="flex items-center justify-end">
        <UiToggleButton v-model="searchState.sortDir"
                        :options="SORT_OPTIONS"
        />
      </div>
      <input id="daterange"
             ref="daterangeInput"
             class="w-full"
             placeholder="Enter a date range"
             type="text"
      >
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
