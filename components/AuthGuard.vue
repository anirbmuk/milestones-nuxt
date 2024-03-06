<template>
  <template v-if="isLoggedIn">
    <slot />
  </template>
  <Signin v-else />
</template>

<script setup lang="ts">
const { isLoggedIn } = useUser();
</script>
