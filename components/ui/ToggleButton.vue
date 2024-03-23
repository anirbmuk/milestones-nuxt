<template>
  <div toggle>
    <template v-for="option of options"
              :key="option.value"
    >
      <button type="button"
              :class="{ selected: modelValue === option.value }"
              @click="toggleState(option.value)"
      >
        {{ option.label }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
import type { KeyValue } from '~/types/toggle';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<KeyValue<string>[]>,
    required: true,
  },
});
const emit = defineEmits(['update:model-value']);

const toggleState = (value: string) => {
  emit('update:model-value', value);
};
defineOptions({
  name: 'ToggleButton',
});
</script>

<style scoped>
button {
  @apply bg-white text-primary-dark p-3 rounded-sm dark:rounded-none min-w-14 border border-gray-200 dark:border-gray-300;
}
.selected {
  @apply bg-gray-200 dark:bg-gray-300;
}
</style>