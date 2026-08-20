export type TimeSlot = {
  start: string;
  end: string;
};

export type AgendaItem = {
  id: string;
  date: string;
  start: string;
  end: string;
  title: string;
};

export type AgendaConfig = {
  startHour?: number;
  endHour?: number;
  slotMinutes?: number;
};
