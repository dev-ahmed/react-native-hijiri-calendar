import moment from 'moment-hijri';
import {getHMonthDaysInYear} from './utils';

// export const weekDays = ['Ah', 'It', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'];

export const hijiriDateFormat = 'iYYYY/iM/iD';
export const gregorianDateFormat = 'YYYY/M/D';

export const calendarTypes = {
  hijiri: 'hijiri',
  gregorian: 'gregorian',
};

// export const months = [
//   'Muharram',
//   'Safar',
//   "Rabi' al-Awwal",
//   "Rabi' al-Thani",
//   'Jumada al-Ula',
//   'Jumada al-Alkhirah',
//   'Rajab',
//   'Sha’ban',
//   'Ramadhan',
//   'Shawwal',
//   'Thul-Qi’dah',
//   'Thul-Hijjah',
// ];
// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

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

export const weekDays = moment.weekdaysMin();
export const hNDays = getHMonthDaysInYear();
export const gNDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
