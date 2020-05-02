import moment from 'moment-hijri';
import { ummalqura } from './ummalqura';

const m = moment();

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

export const monthsShort = [
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

export function getNewMoonMJDNIndex(hy, hm) {
  var cYears = hy - 1,
    totalMonths = cYears * 12 + 1 + (hm - 1),
    i = totalMonths - 16260;
  return i;
}

export const getDaysInMonth = (year, month) => {
  let i = getNewMoonMJDNIndex(year, month + 1),
    daysInMonth = ummalqura.ummalquraData[i] - ummalqura.ummalquraData[i - 1];
  return daysInMonth;
};

export const getMonthDaysInYear = () => {
  const year = m.iYear();
  const month = m.iMonth();

  let days = [];
  const nDays = months.map((currentMonth, i) => {
    days.push(getDaysInMonth(year, i));
  });
  return days;
};

export const generateMatrix = ({ nDays, month, weekDays, firstDay }) => {
  let matrix = [];
  matrix[0] = weekDays;
  let maxDays = nDays && nDays[month];

  let counter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = -1;
      if (row == 1 && col >= firstDay) {
        matrix[row][col] = counter++;
      } else if (row > 1 && counter <= maxDays) {
        matrix[row][col] = counter++;
      }
    }
  }
  matrix.pop();
  return matrix;
};
