<template>
  <div id="auth">
    <form
      class="flex flex-col space-y-6"
      @submit.prevent="signin"
    >
      <div class="flex flex-col space-y-1">
        <label for="email">Email</label>
        <input id="email"
               ref="emailInput"
               v-model="email"
               type="email"
               name="email"
               required
        >
      </div>
      <div class="flex flex-col space-y-1">
        <label for="Password">Password</label>
        <input id="password"
               v-model="password"
               type="password"
               name="password"
               required
        >
      </div>
      <button type="submit">
        Submit
      </button>
      <p v-if="error"
         class="text-red-700 text-md text-center"
      >
        {{ error }}
      </p>
    </form>
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

const signin = async () => {
  error.value = undefined;
  if (!email.value || !password.value) {
    error.value = 'Username or password cannot be empty';
    return;
  }
  try {
    const { user } = await $fetch<AuthState>('/api/login', { body: { email: email.value, password: password.value }, method: 'POST' });
    setUser(user);
    router.push('/');
  } catch (e) {
    error.value = (e as any).data.data;
    setTimeout(() => emailInput.value?.focus());
  }
};
defineOptions({
  name: 'SigninComponent',
});
</script>

  <style scoped>
  #auth {
    @apply p-10 w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] m-auto border border-gray-200 rounded-sm;
  }
  input {
    @apply p-2 border border-gray-200 rounded-sm outline-gray-700;
  }
  button {
    @apply p-4 bg-gray-700 text-white border border-gray-800 rounded-sm outline-black outline-2;
  }
  </style>
