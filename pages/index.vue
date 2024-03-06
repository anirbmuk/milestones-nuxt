<template>
  <AuthGuard>
    {{ 'Logged in as ' + user?.email }}
    <button type="button"
            @click="signout"
    >
      Logout
    </button>
  </AuthGuard>
</template>

<script setup lang="ts">
const { user, setUser } = useUser();
const router = useRouter();

const signout = async () => {
  try {
    await $fetch<{ auth: boolean }>('/api/logout', { method: 'POST' });
  } finally {
    setUser(undefined);
    router.push('/');
  }
};
defineOptions({
  name: 'RootIndexPage',
});
</script>
