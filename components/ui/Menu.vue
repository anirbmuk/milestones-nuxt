<template>
  <div menu>
    <NuxtLink to="/calendar"
              aria-label="Calendar Menu"
              title="Calendar"
    >
      <IconCalendar class="size-8" />
    </NuxtLink>
    <NuxtLink to="/search"
              aria-label="Search Menu"
              title="Search"
    >
      <IconSearch class="size-8" />
    </NuxtLink>
    <button
      type="button"
      class="text-white"
      aria-label="Signout"
      :title="`Logout ${fullName}`"
      @click="$emit('signout')"
    >
      <IconLogout class="size-8" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { fullName } = useUser();
defineEmits(['signout']);
defineOptions({
  name: 'UiMenu',
});
</script>
