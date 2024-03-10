<template>
  <div
    class="calendar-sm"
    :title="tooltip"
  >
    <span class="calendar-text">{{
      label
    }}</span>
  </div>
</template>

<script setup lang="ts">
import {
  getShortMonth,
  getQualifiedDate,
} from '~/helpers/date';
const props = defineProps({
  displayDate: {
    type: Number,
    required: true,
  },
});
const {
  month,
  year,
  getTooltipDate,
} = useCalendar();
const label = computed(() => `${getShortMonth(month.value)} ${getQualifiedDate(props.displayDate)}`);
const tooltip = getTooltipDate(props.displayDate, month.value, year.value);
defineOptions({
  name: 'CalendarItemComponent',
});
</script>

<style scoped>
.calendar-sm {
  @apply flex min-h-[6rem] cursor-pointer items-center rounded-md p-6 text-center text-md;
  text-shadow: 1px 1px 5px rgba(124, 102, 0, 0.45);
  box-shadow: 1px 1px 5px rgba(124, 102, 0, 0.45);
}

.calendar-text {
  @apply mx-auto my-0;
}
</style>
