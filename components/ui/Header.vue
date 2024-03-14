<template>
  <header>
    <nav class="flex justify-end">
      <div class="flex items-center justify-start gap-4">
        <button v-if="isLoggedIn"
                type="button"
                class="text-white"
                :title="`Logout ${fullName}`"
                @click="signout"
        >
          <IconUser class="h-8 w-8" />
        </button>
        <div class="cursor-pointer rounded-sm bg-secondary px-3 py-1 text-xl font-bold lowercase tracking-wide text-primary outline-0 md:text-2xl">
          <NuxtLink to="/">
            <span v-if="isLoggedIn">{{ user?.firstname }}'s {{ ' ' }}</span>MILESTONES
          </NuxtLink>
        </div>
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
