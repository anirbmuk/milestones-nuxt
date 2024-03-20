<template>
  <div 
    class="cursor-pointer"
    role="listitem"
    listitem
    @click="navigateToMilestone"
  >
    <div class="text font-bold text-blue-light md:text-xl">
      {{ milestone.activitycodes?.join(', ') }}
    </div>
    <div class="py-0.5 text-sm text-primary-light md:text-md">
      {{ displayDate }}
    </div>
    <div
      class="whitespace-pre-line break-words !py-1.5 text-justify text-primary-dark"
    >
      {{ milestone.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFullDate } from '~/helpers/date';
import type { Milestone } from '~/types/milestone';
const { setCalendar } = useCalendar();

const props = defineProps({
  milestone: {
    type: Object as PropType<Milestone>,
    required: true,
  },
});
const {
  day: dd, month: mm, year: yyyy, 
} = props.milestone;
const displayDate = computed(() => getFullDate(dd, mm, yyyy, 'long'));
const calendarPath = computed(() => `/calendar/edit/${dd}`);

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

<style scoped>
div[listitem] {
  @apply mb-4 mt-2 block min-h-20 p-3 text-md first:mt-0 last:mb-0 bg-background-dark;
  box-shadow: 0 3px 3px -2px #0003,0 3px 4px #00000024,0 1px 8px #0000001f;
}
</style>