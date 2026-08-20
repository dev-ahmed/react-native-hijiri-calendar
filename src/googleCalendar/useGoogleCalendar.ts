import {useCallback, useEffect, useState} from 'react';
import {
  createGoogleEvent,
  deleteGoogleEvent,
  listGoogleEvents,
  updateGoogleEvent,
} from './api';
import type {CalendarEvent, GoogleCalendarConfig} from './types';

type GoogleRange = {
  timeMin: string;
  timeMax: string;
};

const toError = (error: unknown): Error => {
  return error instanceof Error
    ? error
    : new Error('Google Calendar request failed');
};

export const useGoogleCalendar = (
  config: GoogleCalendarConfig | undefined,
  range: GoogleRange,
) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = config?.accessToken;
  const calendarId = config?.calendarId;
  const onError = config?.onError;

  const reload = useCallback(async () => {
    if (!accessToken) {
      setEvents([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    try {
      const nextEvents = await listGoogleEvents(
        {accessToken, calendarId},
        range,
      );
      setEvents(nextEvents);
      setError(null);
    } catch (caught) {
      const nextError = toError(caught);
      setError(nextError.message);
      onError?.(nextError);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, calendarId, onError, range.timeMin, range.timeMax]);

  useEffect(() => {
    reload();
  }, [reload]);

  const mutate = useCallback(
    async (task: (token: string) => Promise<unknown>) => {
      if (!accessToken) {
        return;
      }

      try {
        await task(accessToken);
        await reload();
      } catch (caught) {
        const nextError = toError(caught);
        onError?.(nextError);
        throw nextError;
      }
    },
    [accessToken, onError, reload],
  );

  const createEvent = useCallback(
    async (
      title: string,
      date: string,
      slot?: {start: string; end: string},
    ) => {
      await mutate((token) =>
        createGoogleEvent(
          {accessToken: token, calendarId},
          {title, date, start: slot?.start, end: slot?.end},
        ),
      );
    },
    [calendarId, mutate],
  );

  const updateEvent = useCallback(
    async (eventId: string, title: string) => {
      await mutate((token) =>
        updateGoogleEvent({accessToken: token, calendarId}, eventId, title),
      );
    },
    [calendarId, mutate],
  );

  const deleteEvent = useCallback(
    async (eventId: string) => {
      await mutate((token) =>
        deleteGoogleEvent({accessToken: token, calendarId}, eventId),
      );
    },
    [calendarId, mutate],
  );

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    reload,
  };
};
