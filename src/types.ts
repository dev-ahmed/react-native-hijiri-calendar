import type {ReactNode} from 'react';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import type {GoogleCalendarConfig} from './googleCalendar/types';
import type {AgendaConfig, AgendaItem} from './agenda/types';

export type CalendarType = 'hijiri' | 'gregorian';
export type {GoogleCalendarConfig, CalendarEvent} from './googleCalendar/types';
export type {AgendaConfig, AgendaItem} from './agenda/types';

export type SelectedDateRange = {
  from: string;
  to: string;
  style?: StyleProp<ViewStyle>;
};

export type MarkedDays = {
  selectedDays: number[];
  months: number[];
  style?: StyleProp<ViewStyle>;
};

export type HCalendarProps = {
  containerStyle?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  onPrev?: () => void;
  onNext?: () => void;
  weekDaysStyle?: StyleProp<ViewStyle>;
  currentDayStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  dayNameFontStyle?: StyleProp<TextStyle>;
  selectedDates?: SelectedDateRange[];
  onDaySelect?: (date: string, marked: boolean) => void;
  calendarType?: CalendarType;
  iconNext?: ReactNode;
  iconPrev?: ReactNode;
  markedDatesTextStyle?: StyleProp<TextStyle>;
  headerFontStyle?: StyleProp<TextStyle>;
  customGMonths?: string[];
  customHMonths?: string[];
  customWeekDays?: string[];
  dayContainerStyle?: StyleProp<ViewStyle>;
  colContainerStyle?: StyleProp<ViewStyle>;
  googleCalendar?: GoogleCalendarConfig;
  agenda?: boolean | AgendaConfig;
  agendaItems?: AgendaItem[];
  onReserve?: (item: AgendaItem) => void;
  onAgendaDelete?: (id: string) => void;
};
