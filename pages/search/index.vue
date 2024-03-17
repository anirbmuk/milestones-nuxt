<template>
  <div class="flex items-center justify-center space-x-4">
    <div class="flex items-center justify-center space-x-2">
      <input id="tag"
             v-model="searchType"
             type="radio"
             value="tag"
      >
      <label for="tag"
             radio
      >Search with tags</label>
    </div>
    <div class="flex items-center justify-center space-x-2">
      <input id="daterange"
             v-model="searchType"
             type="radio"
             value="daterange"
      >
      <label for="daterange"
             radio
      >Search with date</label>
    </div>
  </div>
  <SearchTagForm v-if="searchState.searchType === 'tag'" />
  <SearchDateRangeForm v-if="searchState.searchType === 'daterange'" />
</template>

<script setup lang="ts">
import type { SearchState } from '~/types/search';

const { getCanonical } = useSeo();
const {
  state: searchState,
  setSearchType,
} = useSearch();

const searchType = ref<SearchState['searchType']>(searchState.value.searchType);
watch(searchType, (value) => setSearchType(value));
definePageMeta({
  middleware: ['guard'],
});
useHead({
  title: 'Search',
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
  ],
});
defineOptions({
  name: 'SearchIndexPage',
});
</script>
