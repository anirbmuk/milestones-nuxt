<template>
  <Teleport to="body">
    <Transition 
      name="fade"
      :appear="true"
      mode="out-in"
    >
      <div v-if="open"
           class="backdrop"
      >
        <div class="modal-container">
          <div class="modal-header">
            <h4>
              <slot name="header">
                {{ type === 'create' ? 'Add milestone' : 'Edit milestone' }}
              </slot>
            </h4>
            <hr>
          </div>
          <form @submit.prevent="$emit('save', { id: selection?.milestoneid, milestone: output, type: changed ? type : 'unchanged' })">
            <div class="modal-body">
              <input 
                v-model="milestoneDate"
                class="mb-4 w-full"
                placeholder="Milestone date"
                :max="getToday()"
                :disabled="type === 'create'"
                type="date"
              >
              <UiAutoComplete 
                v-model="autoCompleteInput"
                allow-unlisted-value
                :options="options"
                placeholder="New tag..."
                class="mb-4"
                :processing="processing"
                options-position="top-[3.7rem]"
                @update:input="fetchActivities($event)"
              />
              <textarea 
                v-model="description"
                placeholder="Description..."
                rows="8"
                class="w-full"
                required
              />
            </div>
            <div class="modal-actions">
              <slot
                name="actions"
                :output="{ id: selection?.milestoneid, milestone: output, type: changed ? type : 'unchanged' }"
              >
                <div class="flex items-center justify-end space-x-2">
                  <button type="submit">
                    SAVE
                  </button>
                  <button type="reset"
                          @click="$emit('close')"
                  >
                    CANCEL
                  </button>
                </div>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  getCurrentDate,
  getToday, 
} from '~/helpers/date';
import type { Milestone } from '~/types/milestone';
import type { Operation } from '~/types/operation';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<Operation>,
    required: true,
  },
  selection: {
    type: Object as PropType<Milestone | undefined>,
    default: undefined,
  },
});
defineEmits(['save', 'close']);

const {
  day,
  month,
  year,
} = useCalendar();

const {
  fetch,
  data: options,
  processing,
} = useGetData<string[]>({
  stateKey: 'modal', 
});

const fetchActivities = async (value: string) => {
  if (!value) {
    return options.value = [];
  }
  await fetch(`/api/activity?q=${value}`);
};
const changed = ref(false);
const output = ref<Partial<Milestone> | undefined>(props.selection);

const milestoneDate = ref<string>(props.selection ? 
  getCurrentDate(props.selection.day, props.selection.month, props.selection.year) : 
  getCurrentDate(day.value, month.value, year.value));
const autoCompleteInput = ref<string>(props.selection?.activitycodes?.join(',') || '');
const description = ref<string>(props.selection?.description || '');

watch([milestoneDate, autoCompleteInput, description], ([date, auto, desc]) => {
  changed.value = true;
  const [year, month, day] = date.split('-');
  output.value = {
    activitycodes: (auto || '').split(','),
    description: desc,
    day: +day,
    month: +month,
    year: +year,
  };
});

defineOptions({
  name: 'UiModal',
});
</script>

<style scoped>
.backdrop {
  @apply fixed z-50 flex w-full h-full top-0 left-0;
  transition: opacity 0.3s ease;
  background-color: rgba(var(--base), 0.5)
}
.modal-container {
  @apply bg-white dark:bg-primary-dark dark:border dark:border-white m-auto p-6 rounded w-[95%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col;
  transition: all 0.3s ease;
}
.modal-header {
  @apply pb-3 font-bold text-3xl;
}
.modal-actions {
  @apply mt-10;
}
</style>