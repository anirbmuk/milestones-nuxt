<template>
  Search
</template>

<script setup lang="ts">
const { getCanonical } = useSeo();
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
