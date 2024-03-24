<template>
  <UiHeader />
  <main class="container mx-auto mb-4 mt-20 md:mt-24">
    <ClientOnly>
      <UiBackToTop
        v-show="scrollState > 200"
        @scroll-to-top="scrollToTop"
      />
    </ClientOnly>
    <slot />
  </main>
  <div id="backdrop" />
</template>

<script setup lang="ts">
const {
  scrollState,
  scrollToTop, 
} = useScroll('scroll');
useHead({
  htmlAttrs: {
    lang: 'en',
    translate: 'no',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
  titleTemplate(title) {
    return title ? `Milestones | ${title}` : 'Milestones';
  },
});
useSeoMeta({
  colorScheme: 'dark light',
  author: 'Anirban Mukherjee',
  description: 'A Nuxt3 front-end application for tracking personal milestones!',
  themeColor: '#f5f5f5',
});
defineOptions({
  name: 'DefaultLayout',
});
</script>
