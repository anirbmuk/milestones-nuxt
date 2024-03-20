<template>
  <input id="daterangestart"
         ref="daterangeStartInput"
         v-model="startDateInputValue"
         class="w-full"
         placeholder="Start date"
         type="date"
  >
  <input id="daterangeend"
         ref="daterangeEndInput"
         v-model="endDateInputValue"
         class="w-full"
         placeholder="End date"
         type="date"
  >
</template>

<script setup lang="ts">
import {
  validateDateRangeAsString,
  getUiDate, 
} from '~/helpers/date';
const UPDATE_MODEL_VALUE = 'update:model-value';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const daterangeStartInput = ref<HTMLInputElement | undefined>();
const daterangeEndInput = ref<HTMLInputElement | undefined>();

const getStartDateFromState = computed(() => getUiDate(props.modelValue?.split(',')?.[0]));
const getEndDateFromState = computed(() => getUiDate(props.modelValue?.split(',')?.[1]));

const startDateInputValue = ref<string | undefined>(getStartDateFromState.value);
const endDateInputValue = ref<string | undefined>(getEndDateFromState.value);
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits([UPDATE_MODEL_VALUE]);

watch(() => props.modelValue, (value) => {
  if (!value) {
    startDateInputValue.value = undefined;
    endDateInputValue.value = undefined;
  }
});

watch([startDateInputValue, endDateInputValue], ([start, end]) => {
  const valid = validateDateRangeAsString(start, end);
  if (valid) {
    const [yyyy1, mm1, dd1] = start?.split('-') || [];
    const [yyyy2, mm2, dd2] = end?.split('-') || [];
    const searchString = `${dd1}-${mm1}-${yyyy1},${dd2}-${mm2}-${yyyy2}`;
    emit(UPDATE_MODEL_VALUE, searchString);
  }
});
defineOptions({
  name: 'DateRange',
});
</script>