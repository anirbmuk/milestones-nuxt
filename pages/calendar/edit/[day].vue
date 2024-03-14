<template>
  <section>
    <div class="mt-4 mb-2 grid grid-cols-8 md:mb-4 items-center">
      <button
        class="text-left xl:text-center col-span-2"
        aria-label="Go to previous day"
        title="Previous Day"
        type="button"
        :class="{ '!cursor-not-allowed text-gray-300': +day === min }"
        :disabled="+day === min"
        @click="goToPreviousDay"
      >
        <span class="font-bold text-3xl">&larr;</span>
      </button>
      <div class="text-center text font-semiBold md:text-2xl hidden lg:block col-span-4">
        {{ longDisplayDate }}
      </div>
      <div class="text-center text font-semiBold md:text-2xl lg:hidden col-span-4">
        {{ shortDisplayDate }}
      </div>
      <button
        class="text-right xl:text-center col-span-2"
        aria-label="Go to next day"
        title="Next Day"
        type="button"
        :class="{ '!cursor-not-allowed text-gray-300': +day === max }"
        :disabled="+day === max"
        @click="goToNextDay"
      >
        <span class="font-bold text-3xl">&rarr;</span>
      </button>
    </div>
    <template v-if="milestones?.length">
      <div class="my-8 block md:grid md:grid-cols-3 md:gap-4">
        <MilestoneViewItem v-for="milestone in milestones"
                           :key="milestone.milestoneid"
                           :milestone="milestone"
                           @delete="deleteMilestone(milestone)"
                           @copy="copyMilestone(milestone)"
                           @edit="editMilestone((milestone))"
        />
      </div>
    </template>
    <template v-else>
      <div error>
        No milestone entries found
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import {
  getFullDate,
  validateDateAsString,
} from '~/helpers/date';
import type { Milestone } from '~/types/milestone';

const { getCanonical } = useSeo();
const route = useRoute();
const {
  getLastDayOfMonth,
  changeDayAction,
  longDisplayDate,
  shortDisplayDate,
  month,
  year,
} = useCalendar();
const { show } = useNotification();
const day = computed(() => route.params.day.toString().padStart(2, '0'));
const key = computed(() => `milestones-${year.value}-${month.value.toString().padStart(2, '0')}-${day.value}`);

const getMax = () => {
  const currentDate = new Date();
  if (month.value === currentDate.getMonth() + 1) {
    return currentDate.getDate();
  }
  return getLastDayOfMonth(year.value, month.value);
};
const min = 1;
const max = getMax();

const isValidDate = !isNaN(+day.value) && validateDateAsString(`${year.value}-${month.value.toString().padStart(2, '0')}-${day.value}`);
if (!isValidDate) {
  throw createError({
    fatal: true,
    statusCode: 400,
    message: `${year.value}-${month.value.toString().padStart(2, '0')}-${day.value} is not a valid date.`,
  });
}
if ((+day.value > max)) {
  throw createError({
    fatal: true,
    statusCode: 400,
    message: `${year.value}-${month.value.toString().padStart(2, '0')}-${day.value} is in the future. Now let's not get ahead of ourselves.`,
  });
}

changeDayAction(+day.value);
const {
  data: milestones,
  refresh,
} = await useFetchData<Milestone[]>(key.value, '/api/milestone' + '?q=' + `${+day.value}-${month.value}-${year.value}`);
const { deleteFn } = useDeleteData();

const goToPreviousDay = () => {
  const newDay = +day.value - 1;
  if (newDay >= min) {
    navigateTo(`/calendar/edit/${newDay}`);
  }
};

const goToNextDay = () => {
  const newDay = +day.value + 1;
  if (newDay <= max) {
    navigateTo(`/calendar/edit/${newDay}`);
  }
};

const deleteMilestone = async (milestone: Milestone) => {
  await deleteFn('/api/milestone' + '?id=' + milestone.milestoneid);
  await refresh();
  show('Your milestone entry is deleted', 3);
};
const copyMilestone = (milestone: Milestone) => window.navigator.clipboard.writeText(milestone.description);
// eslint-disable-next-line no-console
const editMilestone = (milestone: Milestone) => console.log('Editing ' + milestone.milestoneid);
definePageMeta({
  middleware: ['guard'],
});
useHead({
  title: computed(() => getFullDate(+day.value, month.value, year.value, 'short')),
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
  ],
});
defineOptions({
  name: 'CalendarEditPage',
});
</script>
