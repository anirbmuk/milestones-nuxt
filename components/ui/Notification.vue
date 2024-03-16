<template>
  <div
    class="absolute p-4 mx-4 my-1 rounded flex justify-start items-center z-10 border border-primary-dark w-full -right-2 max-w-72 bg-primary-dark ease-in-out duration-300 text-secondary"
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
