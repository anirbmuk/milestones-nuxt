import {
  CONSTANTS,
  LONG_MONTHS,
  SHORT_MONTHS,
  getCurrentDate,
  getFullDate,
  getDaysOfMonth,
  getLastDayOfMonth,
} from '~/helpers/date';
import type { CalendarState } from '~/types/calendar';

function getCurrent(identifier: CONSTANTS) {
  const currentDate = new Date().toISOString();
  const [date] = currentDate.split('T');
  const [yyyy, mm, dd] = date.split('-');
  if (identifier === CONSTANTS._DAY) {
    return +dd;
  } else if (identifier === CONSTANTS._MONTH) {
    return +mm;
  }
  return +yyyy;
}

const getInitialState = () => ({
  day: getCurrent(CONSTANTS._DAY),
  month: getCurrent(CONSTANTS._MONTH),
  year: getCurrent(CONSTANTS._YEAR),
} as CalendarState);

export const useCalendar = () => {
  const _calendar = useCookie<CalendarState>('_calendar', {
    default: () => getInitialState(),
  });
  const state = useState<CalendarState>('calendar', () => _calendar.value);

  watch(state, (value) => (_calendar.value = value));

  const day = computed(() => state.value.day);
  const month = computed(() => state.value.month);
  const year = computed(() => state.value.year);

  const currentDate = computed(() => getCurrentDate(day.value, month.value, year.value));
  const currentFirstOfMonthWithYear = computed(() => `${state.value.year}-${state.value.month.toString().padStart(2, '0')}-01`);
  const getTooltipDate = (dd: number, mm: number, yyyy: number, type: 'long' | 'short' = 'long') => getFullDate(dd, mm, yyyy, type);
  const longDisplayDate = computed(() => getFullDate(day.value, month.value, year.value, 'long'));
  const shortDisplayDate = computed(() => getFullDate(day.value, month.value, year.value, 'short'));

  const longDisplayMonthYear = computed(() => `${LONG_MONTHS[month.value - 1]} ${year.value}`);
  const shortDisplayMonthYear = computed(() => `${SHORT_MONTHS[month.value - 1]} ${year.value}`);

  const initState = () => (state.value = getInitialState());

  const changeDayAction = (day: number) => (state.value = {
    ...state.value,
    day,
  } as CalendarState);
  const previousMonthAction = () => {
    let previousMonth = month.value - 1;
    let previousYear = year.value;
    if (previousMonth < 1) {
      previousMonth = 12;
      previousYear -= 1;
    }
    state.value = {
      ...state.value,
      month: previousMonth,
      year: previousYear,
    };
  };
  const nextMonthAction = () => {
    let nextMonth = month.value + 1;
    let nextYear = year.value;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    state.value = {
      ...state.value,
      month: nextMonth,
      year: nextYear,
    };
  };
  const changeYearAction = (year: number) => {
    const currentYear = new Date().getFullYear();
    let mm = 0;
    if (year === currentYear) {
      const stateMonth = month.value;
      const maxMonth = new Date().getMonth() + 1;
      if (maxMonth < stateMonth) {
        mm = maxMonth;
      }
    }
    state.value = {
      ...state.value,
      year,
      ...(mm && {
        month: mm,
      }),
    };
  };

  const previousMonthDisabled = computed(() => {
    const dateObject = new Date(currentDate.value);
    const currDate = new Date();
    return (
      dateObject.getMonth() === 0 &&
          dateObject.getFullYear() === currDate.getFullYear() - 11
    );
  });

  const nextMonthDisabled = computed(() => {
    const dateObject = new Date(currentDate.value);
    const currDate = new Date();
    return (
      dateObject.getMonth() === currDate.getMonth() &&
          dateObject.getFullYear() === currDate.getFullYear()
    );
  });

  const setCalendar = ({
    dd,mm,yyyy, 
  }: {dd?: number, mm?: number, yyyy?: number}) => {
    state.value = {
      ...state.value,
      ...(dd && {
        day: dd,
      }),
      ...(mm && {
        month: mm,
      }),
      ...(yyyy && {
        year: yyyy,
      }),
    };
  };

  const daysOfMonth = computed(() => getDaysOfMonth(nextMonthDisabled.value ? null : new Date(currentFirstOfMonthWithYear.value)));

  return {
    state,
    initState,
    currentDate,
    day,
    month,
    year,
    setCalendar,
    changeDayAction,
    previousMonthAction,
    previousMonthDisabled,
    nextMonthAction,
    nextMonthDisabled,
    changeYearAction,
    getTooltipDate,
    longDisplayMonthYear,
    shortDisplayMonthYear,
    longDisplayDate,
    shortDisplayDate,
    getDaysOfMonth,
    daysOfMonth,
    getLastDayOfMonth,
  };
};
