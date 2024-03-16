<template>
  <header class="fixed top-0 z-50 w-full">
    <nav class="flex justify-between">
      <div class="cursor-pointer rounded-sm bg-secondary px-3 py-1 text-xl font-bold lowercase tracking-wide text-primary outline-0 md:text-2xl">
        <NuxtLink to="/">
          <span v-if="isLoggedIn">{{ user?.firstname }}'s {{ ' ' }}</span>MILESTONES
        </NuxtLink>
      </div>
      <UiMenu v-if="isLoggedIn"
              class="flex items-center justify-between space-x-3"
              @signout="signout"
      />
    </nav>
    <UiNotifications />
  </header>
</template>

<script setup lang="ts">
const {
  isLoggedIn,
  user,
  setAuthState,
} = useUser();

const signout = async () => {
  try {
    await $fetch<{ auth: boolean }>('/api/logout', {
      method: 'POST',
    });
  } finally {
    setAuthState(undefined);
  }
  return navigateTo('/');
};
defineOptions({
  name: 'HeaderComponent',
});
</script>
