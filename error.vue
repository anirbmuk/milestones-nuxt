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
  </header>
  <main class="container mx-auto my-20">
    <section class="text-center">
      <h1 class="py-4 text-16xl font-bold text-primary-dark md:text-massive">
        !{{ error?.statusCode }}!
      </h1>
      <template v-if="error?.message">
        <div class="m-2"
             error
        >
          {{ error.message }}
        </div>
      </template>
      <div class="mb-2 mt-8 flex items-center justify-center">
        <button
          type="button"
          class="cta-button-primary"
          @click="clearError({ redirect: '/'})"
        >
          Back
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object as PropType<{
        url: string;
        statusCode: number;
        statusMessage: string;
        message: string;
        description: string;
        data: any;
      }>,
    default: null,
  },
});

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

const title =
    props.error?.statusCode === 404
      ? 'Oh, it\'s a 404!'
      : props.error?.statusCode === 400 ? 'Something bad was requested' : 'Oh! Something went wrong here!';

useHead({
  title,
});

defineOptions({
  name: 'GlobalErrorPage',
});
</script>

<style scoped>
.header-background {
  @apply border-b border-gray-100 bg-gray-50;
}

@media (prefers-color-scheme: dark) {
  .header-background {
     @apply border-b border-transparent bg-transparent;
  }
}
</style>
