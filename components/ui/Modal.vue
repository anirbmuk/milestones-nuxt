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
          <div class="modal-body">
            <template v-if="selection">
              <input 
                v-model="milestoneDate"
                class="mb-4 w-full"
                placeholder="Milestone date"
                :max="getToday()"
                type="date"
              >
              <UiAutoComplete 
                v-model="autoCompleteInput"
                allow-unlisted-value
                :options="options"
                placeholder="New tag..."
                class="mb-4"
                @update:input="fetchActivities($event)"
              />
              <textarea 
                v-model="description"
                rows="8"
                class="w-full"
                required
              />
            </template>
          </div>
          <div class="modal-actions">
            <slot 
              name="actions"
              :output="{ milestone: output, id: selection?.milestoneid }"
            >
              <button 
                type="button"
                class="cta-button-primary"
                @click="$emit('closeModal')"
              >
                Ok
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { getCurrentDate } from '~/helpers/date';
import { getToday } from '~/helpers/date';
import type { Milestone } from '~/types/milestone';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'create' | 'edit'>,
    required: true,
  },
  selection: {
    type: Object as PropType<Milestone | undefined>,
    default: undefined,
  },
});
defineEmits(['closeModal']);

const {
  fetch,
  data: options,
} = useGetData<string[]>();

const fetchActivities = async (value: string) => {
  if (!value) {
    return options.value = [];
  }
  await fetch(`/api/activity?q=${value}`);
};
const output = ref<Partial<Milestone> | undefined>(props.selection);

const milestoneDate = ref<string>(props.selection ? getCurrentDate(props.selection.day, props.selection.month, props.selection.year) : getToday());
const autoCompleteInput = ref<string>(props.selection?.activitycodes?.join(',') || '');
const description = ref<string>(props.selection?.description || '');

watch([autoCompleteInput, description], ([auto, desc]) => {
  const [year, month, day] = milestoneDate.value.split('-');
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
  @apply bg-white m-auto p-6 rounded w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col;
  transition: all 0.3s ease;
}
.modal-header {
  @apply pb-3 font-bold text-3xl;
}
.modal-actions {
  @apply mt-10;
}
</style>