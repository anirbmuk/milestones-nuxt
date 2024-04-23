<template>
  <div
    ref="selectContainer"
    class="select-container"
  >
    <button
      ref="selectControl"
      type="button"
      select
      @click="toggle"
      @keydown.space="toggle"
      @keydown.esc="open = false"
    >
      <div class="grid grid-cols-3 items-center">
        <span class="col-span-2">{{ modelValue }}</span>
        <span class="col-span-1"><IconArrowUp
          class="size-8 duration-300"
          :class="{ 'rotate-180': open }"
        /></span>
      </div>
    </button>
    <div
      v-show="open"
      ref="optionsContainer"
      role="listbox"
      class="options-container duration-300; absolute flex max-h-72 w-32 min-w-28 flex-col overflow-auto rounded border border-gray-200 bg-gray-50"
      tabindex="-1"
    >
      <template
        v-for="option of options"
        :key="option"
      >
        <button
          option
          role="listitem"
          :class="{ 'bg-primary-dark text-white': modelValue === option }"
          @click="select(option)"
          @keydown="keyboardNavigationWithinOptions"
          @keydown.esc="open = false"
        >
          {{ option }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

defineProps({
  options: {
    type: Array as PropType<string[] | number[]>,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const KEYCODES = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter',
  SPACE: 'Space',
} satisfies Record<string, string>;

const emit = defineEmits(['update:model-value']);
const BG_GRAY = 'bg-gray-300';

const selectContainer = ref<HTMLDivElement | undefined>();
const optionsContainer = ref<HTMLDivElement | undefined>();
const selectControl = ref<HTMLButtonElement | undefined>();

const open = ref(false);
onClickOutside(selectContainer, () => (open.value = false));

const toggle = (event: Event) => {
  event.preventDefault();
  open.value = !open.value;
  if (open.value) {
    const options = optionsContainer.value?.children;
    const button = options?.item(0) as HTMLButtonElement;
    button.classList.add(BG_GRAY);
    setTimeout(() => button.focus());
  }
};

const keyboardNavigationWithinOptions = (event: KeyboardEvent) => {
  if (![KEYCODES.ARROW_UP, KEYCODES.ARROW_DOWN].includes(event.code)) {
    return;
  }
  event.preventDefault();
  const options = optionsContainer.value?.children;
  const first = options?.item(0);
  const last = options?.item(options.length - 1);
  const target = event.target as HTMLButtonElement;
  target.classList.remove(BG_GRAY);

  if (event.code === KEYCODES.ARROW_DOWN) {
    let next = target.nextElementSibling as HTMLButtonElement;
    if (!next) {
      next = first as HTMLButtonElement;
    }
    next?.focus();
    next?.classList.add(BG_GRAY);
  } else {
    let previous = target.previousElementSibling as HTMLButtonElement;
    if (!previous) {
      previous = last as HTMLButtonElement;
    }
    previous?.focus();
    previous?.classList.add(BG_GRAY);
  }
};

const clearFocus = () => {
  const options = optionsContainer.value?.children;
  if (options) {
    for (const node of options) {
      node?.classList.remove(BG_GRAY);
    }
  }
};

const select = (option: string | number) => {
  emit('update:model-value', option);
  open.value = false;
};

watch(open, (value) => {
  if (!value) {
    clearFocus();
  }
});
</script>

<style scoped>
button[select] {
  @apply p-1 w-32 rounded border border-gray-200 bg-gray-50 outline-gray-700 dark:border dark:border-solid dark:border-white dark:bg-transparent dark:outline-white;
}
button[option] {
  @apply p-2 text-left outline-none border-none;
}
button[option]:hover {
  @apply bg-gray-300 text-primary-dark;
}
.options-container {
  box-shadow: 0 3px 3px -2px #0003,0 3px 4px #00000024,0 1px 8px #0000001f;
}
.selected {
  @apply !bg-primary-dark !text-white;
}
</style>