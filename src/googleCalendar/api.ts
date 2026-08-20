import {DEFAULT_CALENDAR_ID, getAllDayEventEnd, mapGoogleEvent} from './utils';
import {toGoogleDateTime} from '../agenda/utils';
import type {
  CalendarEvent,
  GoogleEventResource,
  GoogleEventsResponse,
} from './types';

type GoogleApiConfig = {
  accessToken: string;
  calendarId?: string;
};

const API_BASE = 'https://www.googleapis.com/calendar/v3/calendars';

type RequestArgs = {
  accessToken: string;
  calendarId?: string;
  path?: string;
  method?: string;
  query?: Record<string, string>;
  body?: Record<string, unknown>;
};

const getCalendarUrl = (
  calendarId?: string,
  path = '',
  query?: Record<string, string>,
) => {
  const base = `${API_BASE}/${encodeURIComponent(
    calendarId ?? DEFAULT_CALENDAR_ID,
  )}/events${path}`;

  if (!query) {
    return base;
  }

  const search = Object.entries(query)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

  return `${base}?${search}`;
};

const parseGoogleError = async (response: {
  status: number;
  json: () => Promise<unknown>;
}): Promise<string> => {
  const payload = (await response
    .json()
    .catch(() => ({}))) as GoogleEventsResponse;
  return (
    payload.error?.message ??
    `Google Calendar request failed (${response.status})`
  );
};

const request = async <T>(args: RequestArgs): Promise<T> => {
  const response = await fetch(
    getCalendarUrl(args.calendarId, args.path, args.query),
    {
      method: args.method ?? 'GET',
      headers: {
        Authorization: `Bearer ${args.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: args.body ? JSON.stringify(args.body) : undefined,
    },
  );

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    throw new Error(await parseGoogleError(response));
  }

  return response.json() as Promise<T>;
};

export const listGoogleEvents = async (
  config: GoogleApiConfig,
  range: {timeMin: string; timeMax: string},
): Promise<CalendarEvent[]> => {
  const payload = await request<GoogleEventsResponse>({
    accessToken: config.accessToken,
    calendarId: config.calendarId,
    query: {
      timeMin: range.timeMin,
      timeMax: range.timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '2500',
    },
  });

  return (payload.items ?? []).flatMap((item) => {
    const event = mapGoogleEvent(item);
    return event ? [event] : [];
  });
};

export const createGoogleEvent = async (
  config: GoogleApiConfig,
  input: {title: string; date: string; start?: string; end?: string},
): Promise<CalendarEvent> => {
  const body =
    input.start && input.end
      ? {
          summary: input.title,
          start: {dateTime: toGoogleDateTime(input.date, input.start)},
          end: {dateTime: toGoogleDateTime(input.date, input.end)},
        }
      : {
          summary: input.title,
          start: {date: input.date},
          end: {date: getAllDayEventEnd(input.date)},
        };

  const payload = await request<GoogleEventResource>({
    accessToken: config.accessToken,
    calendarId: config.calendarId,
    method: 'POST',
    body,
  });

  const event = mapGoogleEvent(payload);
  if (!event) {
    throw new Error('Google Calendar did not return a valid event');
  }

  return event;
};

export const updateGoogleEvent = async (
  config: GoogleApiConfig,
  eventId: string,
  title: string,
): Promise<CalendarEvent> => {
  const payload = await request<GoogleEventResource>({
    accessToken: config.accessToken,
    calendarId: config.calendarId,
    path: `/${encodeURIComponent(eventId)}`,
    method: 'PATCH',
    body: {summary: title},
  });

  const event = mapGoogleEvent(payload);
  if (!event) {
    throw new Error('Google Calendar did not return a valid event');
  }

  return event;
};

export const deleteGoogleEvent = async (
  config: GoogleApiConfig,
  eventId: string,
): Promise<void> => {
  await request<void>({
    accessToken: config.accessToken,
    calendarId: config.calendarId,
    path: `/${encodeURIComponent(eventId)}`,
    method: 'DELETE',
  });
};
