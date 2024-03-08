import type { CalendarState } from '~/types/calendar';

const enum CONSTANTS {
  _DAY = 'day',
  _MONTH = 'month',
  _YEAR = 'year'
}

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
};

const getInitialState = () => ({
  day: 1,
  editDay: getCurrent(CONSTANTS._DAY),
  month: getCurrent(CONSTANTS._MONTH),
  year: getCurrent(CONSTANTS._YEAR),
} as CalendarState);

export const useCalendar = () => {
  const _calendar = useCookie<CalendarState>('_calendar', { default: () => getInitialState() });
  const state = useState<CalendarState>('calendar', () => _calendar.value);

  watch(state, (value) => (_calendar.value = value));

  const editDay = computed(() => state.value.editDay);
  const day = computed(() => state.value.day);
  const month = computed(() => state.value.month);
  const year = computed(() => state.value.year);

  const currentDate = computed(() => `${state.value.month}/${state.value.day}/${state.value.year}`);

  const initState = () => (state.value = getInitialState());

  const changeDayAction = (day: number) => (state.value = { ...state.value, editDay: day });
  const previousMonthAction = () => {
    let previousMonth = state.value.month - 1;
    let previousYear = state.value.year;
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
    let nextMonth = state.value.month + 1;
    let nextYear = state.value.year;
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
    let month = 0;
    if (year === currentYear) {
      const stateMonth = state.value.month;
      const maxMonth = new Date().getMonth() + 1;
      if (maxMonth < stateMonth) {
        month = maxMonth;
      }
    }
    state.value = {
      ...state.value,
      year,
      ...(month && { month }),
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

  const getHistoricalYears = () => {
    const years = [];
    let year = new Date().getFullYear();
    for (let i = 12; i > 0; i--) {
      years.push(year--);
    }
    return years;
  };

  return {
    state,
    initState,
    currentDate,
    day,
    editDay,
    month,
    year,
    changeDayAction,
    previousMonthAction,
    previousMonthDisabled,
    nextMonthAction,
    nextMonthDisabled,
    changeYearAction,
    getHistoricalYears,
  };
};
