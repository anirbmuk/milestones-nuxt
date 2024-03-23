<template>
  <UiNotification v-for="(notification, index) of notifications"
                  :key="notification.id"
                  :notification="notification"
                  :style="{ top: `${(index + 1) * 72}px` }"
  />
</template>

<script setup lang="ts">
const { notifications } = useNotification();
defineOptions({
  name: 'UiNotifications',
});
</script>
