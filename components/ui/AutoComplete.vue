<template>
  <div autocomplete>
    <input id="autocomplete"
           ref="autocompleteInput"
           :placeholder="placeholder"
           class="absolute w-full"
           type="text"
           @input="_debouncedTypeahead"
           @blur="selectOnBlur"
           @keydown.enter="selectOnEnter"
    >
    <div v-if="options.length"
         class="relative top-10 z-10 my-2 flex w-full flex-col space-y-2 rounded border border-gray-200 bg-white p-0.5"
         role="listbox"
    >
      <template v-for="option of options"
                :key="option"
      >
        <div class="relative cursor-pointer rounded-sm px-1 py-2 hover:bg-gray-100"
             role="option"
             @click="select(option)"
        >
          {{ option }}
        </div>
      </template>
    </div>
    <div v-if="chips.length"
         class="absolute top-10 flex space-x-2"
    >
      <template v-for="(chip, index) of chips"
                :key="chip"
      >
        <UiChip v-if="chip"
                :text="chip"
                removable
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
    type: Boolean,
    default: () => false,
  },
});
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits([UPDATE_MODEL_VALUE, UPDATE_INPUT]);

const chips = computed(() => props.modelValue.split(',').filter(Boolean));

const typeahead = (event: Event) => {
  const { value } = (event.target as HTMLInputElement);
  emit(UPDATE_INPUT, value);
};

const _debouncedTypeahead = debounce(typeahead, 300);

const removeItem = (index: number) => {
  const copy = chips.value.slice();
  copy.splice(index, 1);
  emit(UPDATE_MODEL_VALUE, copy.join(','));
};

const select = (item: string) => {
  const copy = [...chips.value, item];
  emit(UPDATE_INPUT, '');
  emit(UPDATE_MODEL_VALUE, copy.join(','));
  setTimeout(() => {
    if (autocompleteInput.value) {
      autocompleteInput.value.value = '';
      autocompleteInput.value.focus();
    }
  });
};

const selectOnBlur = (event: Event) => {
  if (props.allowUnlistedValue) {
    const { value } = (event.target as HTMLInputElement);
    if (value) {
      select(value);
    }
  }
};

const selectOnEnter = (event: KeyboardEvent) => {
  if (props.allowUnlistedValue) {
    event.preventDefault();
    const { value } = (event.target as HTMLInputElement);
    if (value) {
      select(value);
    }
  }
};

defineOptions({
  name: 'UiAutoComplete',
});
</script>

<style scoped>
div[autocomplete] {
  @apply flex flex-col space-y-2 relative;
}
</style>
