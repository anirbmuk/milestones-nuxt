<template>
  <div menu>
    <NuxtLink to="/calendar"
              aria-label="Calendar Menu"
              title="Calendar"
    >
      <IconCalendar class="h-8 w-8" />
    </NuxtLink>
    <NuxtLink to="/search"
              aria-label="Search Menu"
              title="Search"
    >
      <IconSearch class="h-8 w-8" />
    </NuxtLink>
    <button
      type="button"
      class="text-white"
      aria-label="Signout"
      :title="`Logout ${fullName}`"
      @click="$emit('signout')"
    >
      <IconLogout class="h-8 w-8" />
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
