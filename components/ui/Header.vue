<template>
  <header>
    <nav class="flex justify-end">
      <div class="flex items-center justify-start">
        <div class="cursor-pointer rounded-sm bg-secondary px-3 py-1 text-xl font-bold lowercase tracking-wide text-primary outline-0 md:text-2xl">
          <span v-if="isLoggedIn">{{ user?.firstname }}'s {{ ' ' }}</span>MILESTONES
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { isLoggedIn, user } = useUser();
defineOptions({
  name: 'HeaderComponent',
});
</script>

<style scoped>
nav {
  @apply bg-primary-dark p-4 w-full flex flex-row items-center whitespace-nowrap;
}
</style>
