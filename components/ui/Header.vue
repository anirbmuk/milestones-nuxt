<template>
  <header class="fixed top-0 z-50 w-full">
    <nav class="flex justify-between">
      <div class="cursor-pointer rounded-sm bg-secondary px-3 py-1 text-xl font-bold lowercase tracking-wide text-primary outline-0 md:text-2xl">
        <NuxtLink to="/">
          <span v-if="isLoggedIn">{{ user?.firstname }}'s {{ ' ' }}</span>MILESTONES
        </NuxtLink>
      </div>
      <div v-if="isLoggedIn"
           class="flex justify-between items-center space-x-3"
      >
        <NuxtLink to="/calendar">
          <IconCalendar class="h-8 w-8" />
        </NuxtLink>
        <NuxtLink to="/search">
          <IconSearch class="h-8 w-8" />
        </NuxtLink>
        <button
          type="button"
          class="text-white"
          :title="`Logout ${fullName}`"
          @click="signout"
        >
          <IconLogout class="h-8 w-8" />
        </button>
      </div>
    </nav>
    <UiNotifications />
  </header>
</template>

<script setup lang="ts">
const {
  isLoggedIn,
  user,
  fullName,
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
