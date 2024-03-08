<template>
  <div class="signin-container">
    <div id="auth">
      <form
        class="flex flex-col space-y-6"
        @submit.prevent="signin"
      >
        <div class="flex flex-col space-y-1">
          <label for="email"
                 required
          >Email address</label>
          <input id="email"
                 ref="emailInput"
                 v-model="email"
                 type="email"
                 name="email"
                 required
          >
        </div>
        <div class="flex flex-col space-y-1">
          <label for="Password"
                 required
          >Password</label>
          <input id="password"
                 v-model="password"
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
import type { AuthState } from '~/types/auth';
const router = useRouter();

const email = ref<string | undefined>();
const password = ref<string | undefined>();
const emailInput = ref<HTMLInputElement>();

const error = ref<string | undefined>();

const { setUser } = useUser();
const { initState } = useCalendar();

const signin = async () => {
  error.value = undefined;
  if (!email.value || !password.value) {
    error.value = 'Username or password cannot be empty';
    return;
  }
  try {
    const { user } = await $fetch<AuthState>('/api/login', {
      body: {
        email: email.value, password: password.value,
      },
      method: 'POST',
    });
    setUser(user);
    initState();
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
defineOptions({
  name: 'SigninComponent',
});
</script>

<style scoped>
.signin-container {
  @apply mt-24 md:mt-20 lg:mt-16 xl:mt-12;
}
#auth {
  @apply p-4 md:p-8 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] 3xl:w-[30%] m-auto border border-gray-200 rounded-sm;
}
form {
  @apply px-2 py-4;
}
input {
  @apply p-2 border border-gray-200 rounded-sm outline-gray-700;
}
</style>
