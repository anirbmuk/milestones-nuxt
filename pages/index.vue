<template>
  SHOULD NOT COME TO THIS INDEX PAGE!
</template>

<script setup lang="ts">
defineOptions({
  name: 'RootIndexPage',
});
definePageMeta({
  middleware: [() => {
    const { isLoggedIn } = useUser();
    if (!isLoggedIn.value) {
      return navigateTo('/signin');
    }
    return navigateTo('/calendar');
  }],
});
</script>
