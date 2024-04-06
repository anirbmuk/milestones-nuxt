<template>
  <div autocomplete>
    <div 
      v-if="allowUnlistedValue"
      info
    >
      Press enter to add tags which are not suggested
    </div>
    <input
      id="autocomplete"
      ref="autocompleteInput"
      :placeholder="placeholder"
      class="w-full"
      :class="{ 'animate-pulse bg-gray-200': processing }"
      type="text"
      spellcheck="false"
      @input="_debouncedTypeahead"
      @keydown.enter="selectOnEnter"
      @keydown="focusDownFromInput"
    >
    <div
      v-if="options.length"
      id="listbox"
      class="absolute z-10 my-2 flex w-full flex-col space-y-2 rounded border border-gray-200 bg-white p-0.5 dark:bg-primary-dark"
      :class="optionsPosition"
      role="listbox"
    >
      <template
        v-for="option of options"
        :key="option"
      >
        <button
          class="cursor-pointer rounded-sm px-1 py-2 text-left outline-none hover:bg-gray-100 dark:hover:text-primary-dark"
          role="option"
          tabindex="-1"
          @keydown="keyboardNavigationWithinOptions"
          @click="select(option)"
        >
          {{ option }}
        </button>
      </template>
    </div>
    <div
      v-if="chips.length"
      class="flex flex-wrap"
    >
      <template
        v-for="(chip, index) of chips"
        :key="chip"
      >
        <UiChip
          v-if="chip"
          :text="chip"
          removable
          class="mb-1 mr-1"
          @remove="removeItem(index)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce';

const UPDATE_MODEL_VALUE = 'update:model-value';
const UPDATE_INPUT = 'update:input';
const autocompleteInput = ref<HTMLInputElement | undefined>();

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Enter search term',
  },
  allowUnlistedValue: {
    type: Boolean as PropType<boolean>,
    default: () => false,
  },
  optionsPosition: {
    type: String,
    default: 'top-[2.3rem] md:top-[2.2rem]',
  },
  processing: {
    type: Boolean as PropType<boolean>,
    default: () => false,
  },
});
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits([UPDATE_MODEL_VALUE, UPDATE_INPUT]);

const chips = computed(() => props.modelValue.split(',').filter(Boolean));

const _processing = computed(() => props.processing);

const typeahead = (event: Event) => {
  const { value } = (event.target as HTMLInputElement);
  if (value?.trim() && value.trim().length > 2) {
    emit(UPDATE_INPUT, value.trim());
  } else {
    emit(UPDATE_INPUT, '');
  }
  clearFocus();
};

const _debouncedTypeahead = debounce(typeahead, 250);

const removeItem = (index: number) => {
  const copy = chips.value.slice();
  copy.splice(index, 1);
  emit(UPDATE_MODEL_VALUE, copy.join(','));
};

const select = (item: string) => {
  const copy = new Set([...chips.value, item.toLowerCase()]);
  emit(UPDATE_INPUT, '');
  emit(UPDATE_MODEL_VALUE, Array.from(copy).join(','));
  setTimeout(() => {
    if (autocompleteInput.value) {
      autocompleteInput.value.value = '';
      autocompleteInput.value.focus();
    }
  });
};

const selectOnEnter = (event: KeyboardEvent) => {
  if (_processing.value) {
    event.preventDefault();
    return;
  }
  if (props.allowUnlistedValue) {
    event.preventDefault();
    const { value } = (event.target as HTMLInputElement);
    if (value && value.trim().length > 2) {
      select(value);
    }
  }
};

const focusDownFromInput = (event: KeyboardEvent) => {
  if (event.code !== 'ArrowDown' || !props.options.length) {
    return;
  }
  const options = document.getElementById('listbox')?.children;
  const button = options?.item(0) as HTMLButtonElement;
  button.classList.add('bg-gray-100');
  button.focus();
};

const keyboardNavigationWithinOptions = (event: KeyboardEvent) => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.code)) {
    return;
  }
  event.preventDefault();
  const options = document.getElementById('listbox')?.children;
  const first = options?.item(0);
  const last = options?.item(options.length - 1);
  const target = event.target as HTMLButtonElement;
  target.classList.remove('bg-gray-100');

  if (event.code === 'ArrowDown') {
    let next = target.nextElementSibling as HTMLButtonElement;
    if (!next) {
      next = first as HTMLButtonElement;
    }
    next?.focus();
    next?.classList.add('bg-gray-100');
  } else {
    let previous = target.previousElementSibling as HTMLButtonElement;
    if (!previous) {
      previous = last as HTMLButtonElement;
    }
    previous?.focus();
    previous?.classList.add('bg-gray-100');
  }
};

const clearFocus = () => {
  const options = document.getElementById('listbox')?.children;
  if (options) {
    for (const node of options) {
      node?.classList.remove('bg-gray-100');
    }
  }
};

defineOptions({
  name: 'UiAutoComplete',
});
</script>

<style scoped>
div[autocomplete] {
  @apply relative flex flex-col space-y-2;
}
</style>
