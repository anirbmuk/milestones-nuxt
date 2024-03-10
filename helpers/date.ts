export const enum CONSTANTS {
  _DAY = 'day',
  _MONTH = 'month',
  _YEAR = 'year'
}

export const LONG_MONTHS = [
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

export const SHORT_MONTHS = [
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

export const LONG_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const SHORT_DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export function validateDateAsString(dateAsString: string | undefined) {
  if (!dateAsString) {
    return false;
  }
  try {
    const [isoDate] = new Date(dateAsString).toISOString().split('T');
    return dateAsString === isoDate;
  } catch {
    return false;
  }
}

export const getCurrentDate = (dd: number, mm: number, yyyy: number) => `${mm.toString().padStart(2, '0')}/${dd.toString().padStart(2, '0')}/${yyyy}`;

export const getFullDate = (dd: number, mm: number, yyyy: number, type: 'long' | 'short' = 'long') => {
  const day = new Date(yyyy, mm - 1, dd).getDay();
  if (type === 'long') {
    return `${LONG_DAYS[day]}, ${LONG_MONTHS[mm - 1]} ${dd}, ${yyyy}`;
  }
  return `${SHORT_DAYS[day]}, ${SHORT_MONTHS[mm - 1]} ${dd}, ${yyyy}`;
};

export const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDaysOfMonth = (dateObject?: Date | null) => {
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

export const getHistoricalYears = () => {
  const years = [];
  let year = new Date().getFullYear();
  for (let i = 12; i > 0; i--) {
    years.push(year--);
  }
  return years;
};

export const getQualifiedDate = (date: string | number) => {
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

export const getLongMonth = (mm: number) => LONG_MONTHS[mm - 1];
export const getShortMonth = (mm: number) => SHORT_MONTHS[mm - 1];

export const getFullDateAndTime = (isoDate: string | undefined) => {
  if (!isoDate) {
    return '';
  }
  const currDate = new Date(isoDate);
  const dd = currDate.getDate();
  const mm = currDate.getMonth();
  const yyyy = currDate.getFullYear();
  const datePart = `${SHORT_MONTHS[mm]} ${dd}, ${yyyy}`;

  const hhh = currDate.getHours();
  const mmm = currDate.getMinutes().toString().padStart(2, '0');
  const ss = currDate.getSeconds().toString().padStart(2, '0');
  const timeOfDay = hhh >= 12 ? 'PM' : 'AM';
  let hh = hhh;
  if (hh === 0) {
    hh = 12;
  } else if (hh > 12) {
    hh = hh - 12;
  }
  const timePart = `${hh}:${mmm}:${ss} ${timeOfDay}`;
  return `${datePart} ${timePart}`;
};
