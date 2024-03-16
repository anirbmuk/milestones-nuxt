<template>
  <div class="signin-container">
    <section class="px-4">
      <div class="flex mt-4 mb-2 mx-auto space-x-2 items-center">
        <span class="text-2xl font-semibold">Welcome to your Milestones!</span>
        <IconMilestone class="h-6 w-6" />
      </div>
      <div class="text-md mb-2 text-gray-500">
        Sign in with your registered email account
      </div>
    </section>
    <div id="auth">
      <form
        class="flex flex-col space-y-6"
        @submit.prevent="signin"
      >
        <div class="flex flex-col space-y-1">
          <input id="email"
                 ref="emailInput"
                 v-model="email"
                 placeholder="Email address"
                 type="email"
                 name="email"
                 required
          >
        </div>
        <div class="flex flex-col space-y-1">
          <input id="password"
                 v-model="password"
                 placeholder="Password"
                 type="password"
                 name="password"
                 required
          >
        </div>
        <button type="submit"
                class="cta-button-primary"
        >
          Submit
        </button>
        <p v-if="error"
           class="text-red-700 text-md text-center"
        >
          {{ error }}
        </p>
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

const { signin: authenticate } = useAuth();
const { setAuthState } = useUser();
const { initState: initCalendarState } = useCalendar();
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
    router.push('/');
  } catch (e) {
    error.value = (e as any)?.data?.data?.error;
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
  name: 'SigninComponent',
});
</script>

<style scoped>
.signin-container {
  @apply mt-32 w-full lg:w-[50%] xl:w-[40%] 4xl:w-[30%] lg:absolute lg:right-4 rounded px-2 py-8 bg-gray-50 border border-gray-300;
}
#auth {
  @apply m-auto rounded-sm lg:relative;
}
</style>
