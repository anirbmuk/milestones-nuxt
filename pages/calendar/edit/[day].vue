<template>
  {{ day }}
</template>

<script setup lang="ts">
import { validateDateAsString } from '~/helpers/date';

const route = useRoute();
const {
  getLastDayOfMonth,
  changeDayAction,
  month,
  year,
} = useCalendar();
const day = route.params.day.toString().padStart(2, '0');

const getMax = () => {
  const currentDate = new Date();
  if (month.value === currentDate.getMonth() + 1) {
    return currentDate.getDate();
  }
  return getLastDayOfMonth(year.value, month.value);
};

const isValidDate = !isNaN(+day) && validateDateAsString(`${year.value}-${month.value.toString().padStart(2, '0')}-${day}`);
if (!isValidDate) {
  throw createError({
    fatal: true,
    statusCode: 400,
    message: `${year.value}-${month.value.toString().padStart(2, '0')}-${day} is not a valid date.`,
  });
}
if ((+day > getMax())) {
  throw createError({
    fatal: true,
    statusCode: 400,
    message: `${year.value}-${month.value.toString().padStart(2, '0')}-${day} is in the future. Now let's not get ahead of ourselves.`,
  });
}

changeDayAction(+day);
</script>
