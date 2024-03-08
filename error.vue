<template>
  <header>
    <nav class="flex justify-end">
      <div class="flex items-center justify-start gap-4">
        <button v-if="isLoggedIn"
                type="button"
                role="menu"
                class="text-white"
                @click="signout"
        >
          Logout
        </button>
        <div class="cursor-pointer rounded-sm bg-secondary px-3 py-1 text-xl font-bold lowercase tracking-wide text-primary outline-0 md:text-2xl">
          <NuxtLink to="/">
            <span v-if="isLoggedIn">{{ user?.firstname }}'s {{ ' ' }}</span>MILESTONES
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
  <main class="container mx-auto my-20">
    <section class="text-center">
      <h1 class="py-4 text-16xl font-bold text-black-dark md:text-massive">
        !{{ error?.statusCode }}!
      </h1>
      <div v-if="error?.message"
           class="m-2 text-red"
      >
        <div error>
          {{ error.message }}
        </div>
      </div>
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
  setUser,
} = useUser();

const signout = async () => {
  try {
    await $fetch<{ auth: boolean }>('/api/logout', {
      method: 'POST',
    });
  } finally {
    setUser(undefined);
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
