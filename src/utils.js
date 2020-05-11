import moment from 'moment-hijri';
import {ummalqura} from './ummalqura';
import {
  weekDays,
  calendarTypes,
  hMonthsShort,
  gNDays,
  hNDays,
} from './constants';

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

export const getHMonthDaysInYear = () => {
  const year = m.iYear();
  let days = [];
  hMonthsShort.map((currentMonth, i) => {
    days.push(getDaysInMonth(year, i));
  });
  return days;
};

export const handleFebruaryMaxDays = (month, year) => {
  let nDays = gNDays;
  if (gNDays[month] == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      nDays[month] += 1;
    }
  }
  return nDays;
};

export const generateMatrix = ({month, firstDay, calendarType, year}) => {
  let matrix = [];
  matrix[0] = weekDays;

  const nDays = isHijiri(calendarType)
    ? hNDays
    : handleFebruaryMaxDays(month, year);

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

export const generateSelectedDatesMatrix = ({
  monthMatrix,
  startDate,
  endDate,
}) => {
  let matrix = [];

  for (let rowIndex = 0; rowIndex < monthMatrix.length; rowIndex++) {
    const row = monthMatrix[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const col = row[colIndex];
      if (col >= startDate && col <= endDate) {
        matrix.push(col);
      }
    }
  }
  return matrix;
};

export const castHijiriDate = (date) => {
  return moment(date, 'iYYYY/iM/iD');
};

export const getDay = (date, type = calendarTypes.hijiri) => {
  return isHijiri(type) ? moment(date).iDate() : moment(date).date();
};

export const getMonth = (date, type) => {
  return isHijiri(type) ? moment(date).iMonth() : moment(date).month();
};

export const getYear = (date, type) => {
  return isHijiri(type) ? moment(date).iYear() : moment(date).year();
};

export const isHijiri = (type) => {
  return type == calendarTypes.hijiri;
};
