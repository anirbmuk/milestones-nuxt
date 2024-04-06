<template>
  <header class="fixed top-0 z-50 w-full dark:border-b dark:border-solid dark:border-b-white">
    <nav class="flex justify-between">
      <div
        class="text-shadow cursor-pointer rounded-sm bg-secondary px-3 py-1 text-xl lowercase tracking-wide text-primary outline-0 md:text-2xl"
        translate="no"
      >
        <NuxtLink to="/">
          <span v-if="isLoggedIn">{{ user?.firstname }}'s {{ ' ' }}</span>MILESTONES
        </NuxtLink>
      </div>
      <UiMenu
        v-if="isLoggedIn"
        class="flex items-center justify-between space-x-3"
        @signout="signout"
      />
    </nav>
    <ClientOnly>
      <LazyUiLoadingScreen v-show="processing" />
      <LazyUiNotifications />
    </ClientOnly>
  </header>
</template>

<script setup lang="ts">
const {
  isLoggedIn,
  user,
} = useUser();
const { processing } = useUIState();
const { signout } = useAuth();

defineOptions({
  name: 'UiHeader',
});
</script>
