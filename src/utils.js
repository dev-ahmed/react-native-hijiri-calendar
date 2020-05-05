import moment from 'moment-hijri';
import {ummalqura} from './ummalqura';
import {nDays, weekDays, months} from './constants';

const m = moment();

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
  let days = [];
  months.map((currentMonth, i) => {
    days.push(getDaysInMonth(year, i));
  });
  return days;
};

export const generateMatrix = ({month, firstDay}) => {
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
  return matrix;
};
