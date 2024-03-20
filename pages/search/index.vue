<template>
  <div class="flex items-center justify-center space-x-4">
    <div class="flex items-center justify-center space-x-2">
      <input id="tag"
             v-model="searchState.searchType"
             type="radio"
             value="tag"
      >
      <label for="tag"
             radio
      >Search with tags</label>
    </div>
    <div class="flex items-center justify-center space-x-2">
      <input id="daterange"
             v-model="searchState.searchType"
             type="radio"
             value="daterange"
      >
      <label for="daterange"
             radio
      >Search with date</label>
    </div>
  </div>
  <div class="mt-6 md:mt-10">
    <SearchTagForm v-if="searchState.searchType === 'tag'" />
    <SearchDateRangeForm v-if="searchState.searchType === 'daterange'" />
    <form @submit.prevent="search">
      <div class="flex items-center justify-center space-x-2">
        <button type="submit">
          SEARCH
        </button>
        <button type="reset"
                @click="reset"
        >
          RESET
        </button>
      </div>
    </form>
  </div>
  <SearchResults
    v-if="!error"
    class="mt-4"
    :milestones="data"
    :status="status"
  />
  <div v-else
       class="mt-2"
       error
  >
    {{ error }}
  </div>
</template>

<script setup lang="ts">
const { getCanonical } = useSeo();
const {
  state: searchState,
  search,
  reset,
  data,
  error,
  status,
} = useSearch();

onUnmounted(() => (status.value = 'notstarted'));

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
