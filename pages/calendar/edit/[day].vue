<template>
  <section>
    <UiModal v-if="open"
             :open="open"
             :selection="selected"
             :type="type"
             @save="save($event)"
             @close="closeModal"
    />
    <button class="cta-button-primary m-auto flex items-center justify-center"
            @click="createMilestone"
    >
      CREATE
    </button>
    <div class="mb-2 mt-4 grid grid-cols-8 items-center md:mb-4">
      <button
        class="col-span-2 text-left xl:text-center"
        aria-label="Go to previous day"
        title="Previous Day"
        type="button"
        :class="{ '!cursor-not-allowed text-gray-300': +day === min }"
        :disabled="+day === min"
        @click="goToPreviousDay"
      >
        <span class="text-3xl font-bold">&larr;</span>
      </button>
      <div class="col-span-4 hidden text-center text font-semibold md:text-2xl lg:block">
        {{ longDisplayDate }}
      </div>
      <div class="col-span-4 text-center text font-semibold md:text-2xl lg:hidden">
        {{ shortDisplayDate }}
      </div>
      <button
        class="col-span-2 text-right xl:text-center"
        aria-label="Go to next day"
        title="Next Day"
        type="button"
        :class="{ '!cursor-not-allowed text-gray-300': +day === max }"
        :disabled="+day === max"
        @click="goToNextDay"
      >
        <span class="text-3xl font-bold">&rarr;</span>
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
import type { Operation } from '~/types/operation';

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
const { notify } = useNotification();
const day = computed(() => route.params.day.toString().padStart(2, '0'));

const {
  data: milestones,
  fetch: fetchMilestones,
} = useGetData<Milestone[]>();
const refresh = () => fetchMilestones(`/api/milestone?q=${+day.value}-${month.value}-${year.value}`);
await refresh();
const { post } = usePostData<Milestone>();
const { patch } = usePatchData<Milestone>();
const { deleteFn } = useDeleteData();

const {
  showCreateModal,
  showEditModal,
  closeModal,
  type,
  selected,
  open,
} = useCrudModal();

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

const createMilestone = () => showCreateModal();

const editMilestone = (milestone: Milestone) => showEditModal(milestone);

const deleteMilestone = async (milestone: Milestone) => {
  await deleteFn(`/api/milestone?id=${milestone.milestoneid}`);
  await refresh();
  notify('Your milestone entry is deleted');
};

const copyMilestone = (milestone: Milestone) => {
  window.navigator.clipboard.writeText(milestone.description);
  notify('The text is copied to clipboard');
};

const save = async ({
  id,
  milestone,
  type,
}: { id: number | undefined, milestone: Partial<Milestone> | undefined, type: Operation }) => {
  closeModal();
  if (type === 'unchanged') {
    return notify('No changes were made');
  }
  if (milestone) {
    if (type === 'create') {
      await post('/api/milestone', milestone);
      notify('A new milestone entry has been created');
    } else if (type === 'edit') {
      await patch(`/api/milestone?id=${id}`, milestone);
      notify('Your milestone entry has been updated');
    }
    await refresh();
  }
};

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
