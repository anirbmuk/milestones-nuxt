import type { CalendarState } from '~/types/calendar';

const enum CONSTANTS {
  _DAY = 'day',
  _MONTH = 'month',
  _YEAR = 'year'
}

const LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const LONG_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  const currentDate = computed(() => `${month.value.toString().padStart(2, '0')}/${day.value.toString().padStart(2, '0')}/${year.value}`);
  const currentFirstOfMonthWithYear = computed(() => `${state.value.year}-${state.value.month.toString().padStart(2, '0')}-01`);
  const getTooltipDate = (dd: number, mm: number, yyyy: number, type: 'long' | 'short' = 'long') => {
    const day = new Date(yyyy, mm - 1, dd).getDay();
    if (type === 'long') {
      return `${LONG_DAYS[day]}, ${LONG_MONTHS[mm - 1]} ${dd}, ${yyyy}`;
    }
    return `${SHORT_DAYS[day]}, ${SHORT_MONTHS[mm - 1]} ${dd}, ${yyyy}`;
  };

  const displayMonthYear = computed(() => `${LONG_MONTHS[month.value - 1]} ${year.value}`);

  const initState = () => (state.value = getInitialState());

  const changeDayAction = (day: number) => (state.value = {
    ...state.value, day,
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

  const getHistoricalYears = () => {
    const years = [];
    let year = new Date().getFullYear();
    for (let i = 12; i > 0; i--) {
      years.push(year--);
    }
    return years;
  };

  const getQualifiedDate = (date: string | number) => {
    let qualifiedDate: string;
    const stringDate = `${date}`;
    if (stringDate.charAt(stringDate.length - 1) === '1') {
      if (stringDate !== '11') {
        qualifiedDate = stringDate + 'st';
      } else {
        qualifiedDate = stringDate + 'th';
      }
    } else if (stringDate.charAt(stringDate.length - 1) === '2') {
      if (stringDate !== '12') {
        qualifiedDate = stringDate + 'nd';
      } else {
        qualifiedDate = stringDate + 'th';
      }
    } else if (stringDate.charAt(stringDate.length - 1) === '3') {
      if (stringDate !== '13') {
        qualifiedDate = stringDate + 'rd';
      } else {
        qualifiedDate = stringDate + 'th';
      }
    } else {
      qualifiedDate = stringDate + 'th';
    }
    return qualifiedDate;
  };

  const getLastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getDaysOfMonth = (dateObject?: Date | null) => {
    const days = [];
    const currentDate = dateObject || new Date();
    const lastDayOfMonth = dateObject
      ? getLastDayOfMonth(
        dateObject.getFullYear(),
        dateObject.getMonth() + 1,
      )
      : null;
    const currentDay = !lastDayOfMonth ? currentDate.getDate() : lastDayOfMonth;
    let day = 0;
    while (currentDay > day++) {
      days.push(day);
    }
    return days;
  };

  const getLongMonth = (mm: number) => LONG_MONTHS[mm - 1];
  const getShortMonth = (mm: number) => SHORT_MONTHS[mm - 1];

  const daysOfMonth = computed(() => getDaysOfMonth(nextMonthDisabled.value ? null : new Date(currentFirstOfMonthWithYear.value)));

  return {
    state,
    initState,
    currentDate,
    day,
    month,
    year,
    changeDayAction,
    previousMonthAction,
    previousMonthDisabled,
    nextMonthAction,
    nextMonthDisabled,
    changeYearAction,
    getHistoricalYears,
    getTooltipDate,
    displayMonthYear,
    getQualifiedDate,
    getLongMonth,
    getShortMonth,
    getDaysOfMonth,
    daysOfMonth,
    getLastDayOfMonth,
  };
};
