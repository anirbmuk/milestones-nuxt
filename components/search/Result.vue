<template>
  <div 
    class="cursor-pointer"
    role="listitem"
    listitem
    @click="navigateToMilestone"
  >
    <div class="text font-bold text-blue-light md:text-xl dark:text-white">
      {{ milestone.activitycodes?.join(', ') }}
    </div>
    <div class="py-0.5 text-sm text-primary-light md:text-md dark:text-white">
      {{ displayDate }}
    </div>
    <div
      class="whitespace-pre-line break-words !py-1.5 text-justify text-primary-dark dark:text-white"
    >
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFullDate } from '~/helpers/date';
import type { Milestone } from '~/types/milestone';

const { setCalendar } = useCalendar();
const { transform } = useText();

const props = defineProps({
  milestone: {
    type: Object as PropType<Milestone>,
    required: true,
  },
});
const {
  day: dd,
  month: mm,
  year: yyyy, 
} = props.milestone;
const displayDate = computed(() => getFullDate(dd, mm, yyyy, 'long'));
const calendarPath = computed(() => `/calendar/edit/${dd}`);

const description = computed(() => transform(props.milestone?.description, 600, false));

const navigateToMilestone = () => {
  setCalendar({
    dd,
    mm,
    yyyy, 
  });
  navigateTo(calendarPath.value);
};

defineOptions({
  name: 'SearchResult',
});
</script>
