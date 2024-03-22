<template>
  <div
    class="-top-30 absolute -right-2 z-10 mx-4 my-1 flex w-full max-w-[22rem] items-center justify-start rounded border border-primary-dark bg-primary-dark p-4 text-secondary duration-300 ease-in-out"
  >
    {{ notification.message }}
  </div>
</template>

<script setup lang="ts">
import type { UiNotification } from '~/types/notification';

const props = defineProps({
  notification: {
    type: Object as PropType<UiNotification>,
    required: true,
  },
});
const { hide } = useNotification();

onMounted(() => {
  setTimeout(() => {
    hide(props.notification.id);
  }, (props.notification.duration ?? 0) * 1000);
});
defineOptions({
  name: 'UiNotification',
});
</script>
