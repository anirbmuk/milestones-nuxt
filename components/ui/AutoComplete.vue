<template>
  <div autocomplete>
    <input id="autocomplete"
           ref="autocompleteInput"
           :placeholder="placeholder"
           class="absolute w-full"
           type="text"
           @input="_debouncedTypeahead"
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
    <div v-if="modelValue?.length"
         class="absolute top-10 flex space-x-2"
    >
      <template v-for="(item, index) of modelValue"
                :key="item"
      >
        <UiChip v-if="item"
                :text="item"
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
    type: Array as PropType<string[]>,
    required: true,
  },
  options: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Enter search term',
  },
});
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits([UPDATE_MODEL_VALUE, UPDATE_INPUT]);

const typeahead = (event: Event) => {
  const { value } = (event.target as HTMLInputElement);
  emit(UPDATE_INPUT, value);
};

const _debouncedTypeahead = debounce(typeahead, 300);

const removeItem = (index: number) => {
  const copy = props.modelValue.slice();
  copy.splice(index, 1);
  emit(UPDATE_MODEL_VALUE, copy);
};

const select = (item: string) => {
  const newArr = [...props.modelValue, item];
  emit(UPDATE_INPUT, '');
  emit(UPDATE_MODEL_VALUE, newArr);
  setTimeout(() => {
    if (autocompleteInput.value) {
      autocompleteInput.value.value = '';
      autocompleteInput.value.focus();
    }
  });
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
