export type GoogleCalendarConfig = {
  accessToken?: string;
  clientId?: string;
  webClientId?: string;
  iosClientId?: string;
  androidClientId?: string;
  calendarId?: string;
  eventColor?: string;
  onError?: (error: Error) => void;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  isAllDay: boolean;
  description?: string;
};

export type GoogleDate = {
  date?: string;
  dateTime?: string;
};

export type GoogleEventResource = {
  id?: string;
  summary?: string;
  description?: string;
  start?: GoogleDate;
  end?: GoogleDate;
};

export type GoogleEventsResponse = {
  items?: GoogleEventResource[];
  error?: {
    message?: string;
  };
};

export type SelectedEventDay = {
  year: number;
  month: number;
  day: number;
};
