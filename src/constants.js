import moment from 'moment-hijri';
import {getHMonthDaysInYear} from './utils';

export const hijiriDateFormat = 'iYYYY/iM/iD';
export const gregorianDateFormat = 'YYYY/M/D';

export const calendarTypes = {
  hijiri: 'hijiri',
  gregorian: 'gregorian',
};

export const hMonthsShort = moment.iMonthsShort();
export const gMonthsShort = moment.monthsShort();
export const weekDays = moment.weekdaysMin();
export const hNDays = getHMonthDaysInYear();
export const gNDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
