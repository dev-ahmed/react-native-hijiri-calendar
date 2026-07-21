import type {CalendarType} from './types';

export const hijiriDateFormat = 'iYYYY/iM/iD';
export const gregorianDateFormat = 'YYYY/M/D';

export const calendarTypes: Record<CalendarType, CalendarType> = {
  hijiri: 'hijiri',
  gregorian: 'gregorian',
};

export const hMonthsShort = [
  'Muh',
  'Saf',
  'Rab-I',
  'Rab-II',
  'Jum-I',
  'Jum-II',
  'Raj',
  'Sha',
  'Ram',
  'Shw',
  'Dhu-Q',
  'Dhu-H',
];

export const gMonthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const gNDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
