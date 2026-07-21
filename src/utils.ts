import moment from 'moment-hijri';
import type {Moment} from 'moment';
import {ummalqura} from './ummalqura';
import {
  weekDays,
  calendarTypes,
  gNDays,
  hijiriDateFormat,
  gregorianDateFormat,
} from './constants';
import type {CalendarType} from './types';

export function getNewMoonMJDNIndex(hy: number, hm: number): number {
  const cYears = hy - 1;
  const totalMonths = cYears * 12 + 1 + (hm - 1);
  return totalMonths - 16260;
}

export const getDaysInMonth = (year: number, month: number): number => {
  const i = getNewMoonMJDNIndex(year, month + 1);
  return ummalqura.ummalquraData[i] - ummalqura.ummalquraData[i - 1];
};

export const handleFebruaryMaxDays = (month: number, year: number): number => {
  if (month !== 1) {
    return gNDays[month];
  }

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29;
  }

  return 28;
};

type GenerateMatrixArgs = {
  month: number;
  firstDay: number;
  calendarType: CalendarType;
  year: number;
  customWeekDays?: string[];
};

export const generateMatrix = ({
  month,
  firstDay,
  calendarType,
  year,
  customWeekDays,
}: GenerateMatrixArgs): Array<Array<string | number>> => {
  const matrix: Array<Array<string | number>> = [];
  matrix[0] = customWeekDays ?? weekDays;

  const maxDays = isHijiri(calendarType)
    ? getDaysInMonth(year, month)
    : handleFebruaryMaxDays(month, year);

  let counter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = -1;
      if (row === 1 && col >= firstDay) {
        matrix[row][col] = counter++;
      } else if (row > 1 && counter <= maxDays) {
        matrix[row][col] = counter++;
      }
    }
  }
  return matrix;
};

type GenerateSelectedDatesMatrixArgs = {
  monthMatrix: Array<Array<string | number>>;
  startDate: number | null | undefined;
  endDate: number | null | undefined;
};

export const generateSelectedDatesMatrix = ({
  monthMatrix,
  startDate,
  endDate,
}: GenerateSelectedDatesMatrixArgs): number[] => {
  const matrix: number[] = [];

  if (startDate == null || endDate == null) {
    return matrix;
  }

  for (let rowIndex = 0; rowIndex < monthMatrix.length; rowIndex++) {
    const row = monthMatrix[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const col = row[colIndex];
      if (typeof col === 'number' && col >= startDate && col <= endDate) {
        matrix.push(col);
      }
    }
  }
  return matrix;
};

export const castHijiriDate = (date: string) => {
  return moment(date, hijiriDateFormat);
};

export const getDay = (date: string, type?: CalendarType): number => {
  return isHijiri(type) ? castHijiriDate(date).iDate() : moment(date).date();
};

export const getMonth = (date: string, type?: CalendarType): number => {
  return isHijiri(type) ? castHijiriDate(date).iMonth() : moment(date).month();
};

export const getYear = (date: string, type?: CalendarType): number => {
  return isHijiri(type) ? castHijiriDate(date).iYear() : moment(date).year();
};

export const isHijiri = (type?: CalendarType): boolean => {
  return type === calendarTypes.hijiri;
};

export const handleFormat = (
  date: Moment | string,
  type: CalendarType,
): string => {
  return moment(date).format(
    isHijiri(type) ? hijiriDateFormat : gregorianDateFormat,
  );
};

export const getDateParts = (date: Moment, type: CalendarType) => {
  if (isHijiri(type)) {
    return {
      year: date.iYear(),
      month: date.iMonth(),
      day: date.iDate(),
    };
  }

  return {
    year: date.year(),
    month: date.month(),
    day: date.date(),
  };
};

export const getCurrentMonth = (type: CalendarType): number => {
  return isHijiri(type) ? moment().iMonth() : moment().month();
};

export const getCurrentYear = (type: CalendarType): number => {
  return isHijiri(type) ? moment().iYear() : moment().year();
};
