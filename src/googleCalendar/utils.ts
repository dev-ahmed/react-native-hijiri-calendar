import moment from 'moment-hijri';
import {hijiriDateFormat} from '../constants';
import {getDateParts, isHijiri} from '../utils';
import type {CalendarType} from '../types';
import type {
  CalendarEvent,
  GoogleCalendarConfig,
  GoogleEventResource,
} from './types';

export const DEFAULT_CALENDAR_ID = 'primary';

export const hasGoogleOAuthClientId = (config?: GoogleCalendarConfig) => {
  return Boolean(
    config?.webClientId ||
    config?.iosClientId ||
    config?.androidClientId ||
    config?.clientId,
  );
};

export const mapGoogleEvent = (
  event: GoogleEventResource,
): CalendarEvent | null => {
  const start = event.start?.date ?? event.start?.dateTime;
  const end = event.end?.date ?? event.end?.dateTime;

  if (!event.id || !start || !end) {
    return null;
  }

  return {
    id: event.id,
    title: event.summary || '(No title)',
    start,
    end,
    isAllDay: Boolean(event.start?.date),
    description: event.description,
  };
};

export const getVisibleGoogleRange = (
  activeDate: number,
  calendarType: CalendarType,
) => {
  const cursor = moment(activeDate);

  if (isHijiri(calendarType)) {
    return {
      timeMin: cursor.clone().startOf('iMonth').toISOString(),
      timeMax: cursor.clone().endOf('iMonth').toISOString(),
    };
  }

  return {
    timeMin: cursor.clone().startOf('month').toISOString(),
    timeMax: cursor.clone().endOf('month').toISOString(),
  };
};

export const toGregorianDateString = (
  year: number,
  month: number,
  day: number,
  calendarType: CalendarType,
): string => {
  if (isHijiri(calendarType)) {
    return moment(`${year}/${month + 1}/${day}`, hijiriDateFormat).format(
      'YYYY-MM-DD',
    );
  }

  return moment({year, month, day}).format('YYYY-MM-DD');
};

export const getEventDay = (
  event: CalendarEvent,
  calendarType: CalendarType,
  year: number,
  month: number,
): number | null => {
  const start = event.isAllDay
    ? moment(event.start, 'YYYY-MM-DD')
    : moment(event.start);
  const parts = getDateParts(start, calendarType);

  if (parts.year !== year || parts.month !== month) {
    return null;
  }

  return parts.day;
};

export const getEventDaysForMonth = (
  events: CalendarEvent[] | undefined,
  calendarType: CalendarType,
  year: number,
  month: number,
): number[] => {
  if (!events?.length) {
    return [];
  }

  const days = events.flatMap((event) => {
    const day = getEventDay(event, calendarType, year, month);
    return day == null ? [] : [day];
  });

  return [...new Set(days)];
};

export const getEventsForDay = (
  events: CalendarEvent[],
  calendarType: CalendarType,
  year: number,
  month: number,
  day: number,
): CalendarEvent[] => {
  return events.filter(
    (event) => getEventDay(event, calendarType, year, month) === day,
  );
};

export const formatDayLabel = (
  year: number,
  month: number,
  day: number,
  calendarType: CalendarType,
): string => {
  if (isHijiri(calendarType)) {
    return `${day}/${month + 1}/${year}`;
  }

  return `${year}/${month + 1}/${day}`;
};

export const formatEventTime = (event: CalendarEvent): string => {
  if (event.isAllDay) {
    return 'All day';
  }

  return moment(event.start).format('HH:mm');
};

export const getAllDayEventEnd = (date: string): string => {
  return moment(date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
};
