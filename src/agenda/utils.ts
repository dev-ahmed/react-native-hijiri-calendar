import moment from 'moment-hijri';
import type {CalendarEvent} from '../googleCalendar/types';
import type {AgendaConfig, AgendaItem, TimeSlot} from './types';

export const DEFAULT_AGENDA_CONFIG: Required<AgendaConfig> = {
  startHour: 8,
  endHour: 20,
  slotMinutes: 60,
};

const padTime = (hours: number, minutes: number) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const getAgendaConfig = (
  agenda?: boolean | AgendaConfig,
): Required<AgendaConfig> | null => {
  if (!agenda) {
    return null;
  }

  if (agenda === true) {
    return DEFAULT_AGENDA_CONFIG;
  }

  return {
    ...DEFAULT_AGENDA_CONFIG,
    ...agenda,
  };
};

export const generateTimeSlots = (
  config: Required<AgendaConfig>,
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let minutes = config.startHour * 60;
  const endMinutes = config.endHour * 60;

  while (minutes + config.slotMinutes <= endMinutes) {
    const next = minutes + config.slotMinutes;
    slots.push({
      start: padTime(Math.floor(minutes / 60), minutes % 60),
      end: padTime(Math.floor(next / 60), next % 60),
    });
    minutes = next;
  }

  return slots;
};

export const createAgendaId = (date: string, start: string) => {
  return `${date}-${start}`;
};

export const toGoogleDateTime = (date: string, time: string) => {
  return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
};

export const getEventForSlot = (
  events: CalendarEvent[],
  slot: TimeSlot,
  date: string,
): CalendarEvent | undefined => {
  const slotStart = moment(`${date} ${slot.start}`, 'YYYY-MM-DD HH:mm');
  const slotEnd = moment(`${date} ${slot.end}`, 'YYYY-MM-DD HH:mm');

  return events.find((event) => {
    if (event.isAllDay) {
      return false;
    }

    const start = moment(event.start);
    const end = moment(event.end);
    return start.isBefore(slotEnd) && end.isAfter(slotStart);
  });
};

export const getLocalItemForSlot = (
  items: AgendaItem[],
  slot: TimeSlot,
  date: string,
): AgendaItem | undefined => {
  return items.find(
    (item) =>
      item.date === date && item.start === slot.start && item.end === slot.end,
  );
};

export const getAllDayEvents = (events: CalendarEvent[]) => {
  return events.filter((event) => event.isAllDay);
};

export const agendaItemToEvent = (item: AgendaItem): CalendarEvent => {
  return {
    id: item.id,
    title: item.title,
    start: toGoogleDateTime(item.date, item.start),
    end: toGoogleDateTime(item.date, item.end),
    isAllDay: false,
  };
};
