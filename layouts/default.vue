<template>
    <UiHeader />
    <slot />
    <UiFooter />
</template>

<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: 'en',
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
    themeColor: '#f5f5f5',
});
defineOptions({
    name: 'DefaultLayout',
});
</script>