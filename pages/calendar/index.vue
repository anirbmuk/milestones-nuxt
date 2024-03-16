<template>
  <section>
    <div class="flex items-center justify-center">
      <select v-model.number="selectedYear"
              aria-label="Select year"
              @change="onYearChange"
      >
        <option v-for="history of getHistoricalYears()"
                :key="history"
        >
          {{ history }}
        </option>
      </select>
    </div>
    <div class="mb-2 mt-4 grid grid-cols-8 items-center md:mb-4">
      <button
        class="col-span-2 text-left xl:text-center"
        aria-label="Go to previous month"
        title="Previous Month"
        type="button"
        :class="{ '!cursor-not-allowed text-gray-300': previousMonthDisabled }"
        :disabled="previousMonthDisabled"
        @click="previousMonthAction"
      >
        <span class="text-3xl font-bold">&larr;</span>
      </button>
      <div class="col-span-4 hidden text-center text font-semibold md:text-2xl lg:block">
        {{ longDisplayMonthYear }}
      </div>
      <div class="col-span-4 text-center text font-semibold md:text-2xl lg:hidden">
        {{ shortDisplayMonthYear }}
      </div>
      <button
        class="col-span-2 text-right xl:text-center"
        aria-label="Go to next month"
        title="Next Month"
        type="button"
        :class="{ '!cursor-not-allowed text-gray-300': nextMonthDisabled }"
        :disabled="nextMonthDisabled"
        @click="nextMonthAction"
      >
        <span class="text-3xl font-bold">&rarr;</span>
      </button>
    </div>
    <div class="pb-8">
      <div
        class="grid grid-cols-3 gap-4 md:grid-cols-7 md:gap-6"
      >
        <template v-for="dayOfMonth in daysOfMonth"
                  :key="dayOfMonth"
        >
          <NuxtLink :to="`/calendar/edit/${dayOfMonth}`">
            <CalendarItem
              :display-date="dayOfMonth"
            />
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getHistoricalYears } from '~/helpers/date';
const { getCanonical } = useSeo();
const {
  longDisplayMonthYear,
  shortDisplayMonthYear,
  previousMonthAction,
  previousMonthDisabled,
  nextMonthAction,
  nextMonthDisabled,
  changeYearAction,
  year,
  daysOfMonth,
} = useCalendar();

const selectedYear = ref<number>(year.value);
watch(year, (value) => (selectedYear.value = value));
const onYearChange = () => changeYearAction(selectedYear.value);
definePageMeta({
  middleware: ['guard'],
});
useHead({
  title: 'Calendar',
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
  ],
});
defineOptions({
  name: 'CalendarIndexPage',
});
</script>
