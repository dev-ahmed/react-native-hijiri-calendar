import moment from 'moment-hijri';
import { getMonthDaysInYear } from './utils';

// export const weekDays = ['Ah', 'It', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'];

export const months = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Ula',
  'Jumada al-Alkhirah',
  'Rajab',
  'Sha’ban',
  'Ramadhan',
  'Shawwal',
  'Thul-Qi’dah',
  'Thul-Hijjah',
];

export const weekDays = moment.weekdaysMin();
export const nDays = getMonthDaysInYear();
