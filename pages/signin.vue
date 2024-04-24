<template>
  <div class="signin-container">
    <section class="px-4">
      <div class="mx-auto mb-2 mt-4 flex items-center space-x-2">
        <span class="text-2xl font-semibold dark:text-white">Welcome to your Milestones!</span>
        <IconMilestone class="size-6 dark:hidden" />
      </div>
      <div class="-mt-1.5 mb-2 text-md text-gray-500 dark:text-white">
        Sign in with your registered email account
      </div>
    </section>
    <div id="auth">
      <form
        class="flex flex-col space-y-6 px-2 py-4"
        @submit.prevent="signin"
      >
        <div class="flex flex-col space-y-1">
          <input
            id="email"
            ref="emailInput"
            v-model="email"
            placeholder="Email address"
            type="email"
            name="email"
            required
          >
        </div>
        <div class="flex flex-col space-y-1">
          <input
            id="password"
            v-model="password"
            placeholder="Password"
            type="password"
            name="password"
            required
          >
        </div>
        <button
          type="submit"
          class="cta-button-primary"
          :disabled="processing"
        >
          <template v-if="processing">
            <div class="flex animate-spin items-center justify-center duration-300">
              <LazyIconLightCircle class="size-5 md:size-6" />
            </div>
          </template>
          <template v-else>
            Submit
          </template>
          <div
            v-if="error"
            error
          >
            {{ error }}
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const email = ref<string | undefined>();
const password = ref<string | undefined>();
const emailInput = ref<HTMLInputElement>();

const error = ref<string | undefined>();

const {
  signin: authenticate, processing, 
} = useAuth();
const { setAuthState } = useUser();
const { initState: initCalendarState } = useCalendar();
const { initState: initSearchState } = useSearch();
const { getCanonical } = useSeo();

const signin = async () => {
  error.value = undefined;
  if (!email.value || !password.value) {
    error.value = 'Username or password cannot be empty';
    return;
  }
  try {
    const response = await authenticate(email.value, password.value);
    setAuthState(response);
    initCalendarState();
    initSearchState();
    router.push('/');
  } catch (e) {
    console.error(e);
    error.value = (e as any)?.data?.data?.error || 'Unknown error: failed to sign in';
    setTimeout(() => emailInput.value?.focus());
  }
};
definePageMeta({
  middleware: [() => {
    const { isLoggedIn } = useUser();
    if (isLoggedIn.value) {
      return navigateTo('/calendar');
    }
  }],
});
useHead({
  title: 'Signin',
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
  ],
});
defineOptions({
  name: 'SigninPage',
});
</script>

<style scoped>
.signin-container {
  @apply mt-32 w-full lg:w-[50%] xl:w-[40%] 4xl:w-[30%] lg:absolute lg:right-4 rounded px-2 py-4 bg-gray-50 border border-gray-300 dark:bg-transparent;
}
#auth {
  @apply m-auto rounded-sm lg:relative;
}
</style>
