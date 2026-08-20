import moment from 'moment-hijri';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from './components/Calendar';
import {EventSheet} from './components/Events/EventSheet';
import {GoogleSignInBar} from './components/Events/GoogleSignInBar';
import {calendarTypes} from './constants';
import {
  agendaItemToEvent,
  createAgendaId,
  DEFAULT_AGENDA_CONFIG,
  getAgendaConfig,
} from './agenda/utils';
import type {AgendaItem, TimeSlot} from './agenda/types';
import {useGoogleCalendar} from './googleCalendar/useGoogleCalendar';
import {useGoogleCalendarAuth} from './googleCalendar/useGoogleCalendarAuth';
import {
  formatDayLabel,
  getEventsForDay,
  getVisibleGoogleRange,
  hasGoogleOAuthClientId,
  toGregorianDateString,
} from './googleCalendar/utils';
import type {SelectedEventDay} from './googleCalendar/types';
import type {HCalendarProps} from './types';

const HCalendarView = ({
  containerStyle,
  fontStyle,
  onPrev,
  onNext,
  weekDaysStyle,
  currentDayStyle,
  headerStyle,
  dayNameFontStyle,
  selectedDates,
  onDaySelect,
  calendarType = calendarTypes.hijiri,
  iconNext,
  iconPrev,
  markedDatesTextStyle,
  headerFontStyle,
  customGMonths,
  customHMonths,
  customWeekDays,
  dayContainerStyle,
  colContainerStyle,
  googleCalendar,
  agenda,
  agendaItems,
  onReserve,
  onAgendaDelete,
}: HCalendarProps) => {
  const [hijiriDate, setHijiriDate] = useState(() =>
    moment().startOf('iMonth').valueOf(),
  );
  const [gregorianDate, setGregorianDate] = useState(() =>
    moment().startOf('month').valueOf(),
  );
  const [selectedEventDay, setSelectedEventDay] =
    useState<SelectedEventDay | null>(null);
  const [localAgendaItems, setLocalAgendaItems] = useState<AgendaItem[]>([]);

  const activeDate =
    calendarType === calendarTypes.hijiri ? hijiriDate : gregorianDate;
  const googleRange = useMemo(
    () => getVisibleGoogleRange(activeDate, calendarType),
    [activeDate, calendarType],
  );
  const google = useGoogleCalendar(googleCalendar, googleRange);
  const isGoogleSynced = Boolean(googleCalendar?.accessToken);
  const agendaConfig =
    getAgendaConfig(agenda) ?? (isGoogleSynced ? DEFAULT_AGENDA_CONFIG : null);
  const reservedItems = agendaItems ?? localAgendaItems;
  const eventDotStyle = useMemo(() => {
    if (!googleCalendar?.eventColor) {
      return undefined;
    }

    return {backgroundColor: googleCalendar.eventColor};
  }, [googleCalendar?.eventColor]);

  const selectedDayDate = selectedEventDay
    ? toGregorianDateString(
        selectedEventDay.year,
        selectedEventDay.month,
        selectedEventDay.day,
        calendarType,
      )
    : '';
  const selectedDayEvents = selectedEventDay
    ? getEventsForDay(
        google.events,
        calendarType,
        selectedEventDay.year,
        selectedEventDay.month,
        selectedEventDay.day,
      )
    : [];
  const selectedDayLocalItems = reservedItems.filter(
    (item) => item.date === selectedDayDate,
  );

  const handleEventDayPress = agendaConfig
    ? (day: SelectedEventDay) => setSelectedEventDay(day)
    : undefined;

  const handleReserve = async (title: string, slot: TimeSlot) => {
    const item: AgendaItem = {
      id: createAgendaId(selectedDayDate, slot.start),
      date: selectedDayDate,
      start: slot.start,
      end: slot.end,
      title,
    };

    if (isGoogleSynced) {
      await google.createEvent(title, selectedDayDate, slot);
      onReserve?.(item);
      return;
    }

    onReserve?.(item);
    if (!agendaItems) {
      setLocalAgendaItems((current) => [...current, item]);
    }
  };

  const handleAgendaUpdate = async (id: string, title: string) => {
    if (isGoogleSynced) {
      await google.updateEvent(id, title);
      return;
    }

    setLocalAgendaItems((current) =>
      current.map((item) => (item.id === id ? {...item, title} : item)),
    );
  };

  const handleAgendaDelete = async (id: string) => {
    if (isGoogleSynced) {
      await google.deleteEvent(id);
      onAgendaDelete?.(id);
      return;
    }

    onAgendaDelete?.(id);
    if (!agendaItems) {
      setLocalAgendaItems((current) =>
        current.filter((item) => item.id !== id),
      );
    }
  };

  const sharedProps = {
    colContainerStyle,
    dayContainerStyle,
    customWeekDays,
    customGMonths,
    customHMonths,
    headerStyle,
    headerFontStyle,
    dayNameFontStyle,
    weekDaysStyle,
    fontStyle,
    currentDayStyle,
    selectedDates,
    onDaySelect,
    iconPrev,
    iconNext,
    markedDatesTextStyle,
    googleEvents: [
      ...(isGoogleSynced ? google.events : []),
      ...(isGoogleSynced ? [] : reservedItems.map(agendaItemToEvent)),
    ],
    eventDotStyle,
    onEventDayPress: handleEventDayPress,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={
          calendarType === calendarTypes.hijiri ? styles.visible : styles.hidden
        }
        pointerEvents={calendarType === calendarTypes.hijiri ? 'auto' : 'none'}
      >
        <Calendar
          {...sharedProps}
          calendarType={calendarTypes.hijiri}
          activeDate={hijiriDate}
          onPrev={() => {
            onPrev?.();
            setHijiriDate((current) =>
              moment(current).startOf('iMonth').subtract(1, 'iMonth').valueOf(),
            );
          }}
          onNext={() => {
            onNext?.();
            setHijiriDate((current) =>
              moment(current).startOf('iMonth').add(1, 'iMonth').valueOf(),
            );
          }}
        />
      </View>

      <View
        style={
          calendarType === calendarTypes.gregorian
            ? styles.visible
            : styles.hidden
        }
        pointerEvents={
          calendarType === calendarTypes.gregorian ? 'auto' : 'none'
        }
      >
        <Calendar
          {...sharedProps}
          calendarType={calendarTypes.gregorian}
          activeDate={gregorianDate}
          onPrev={() => {
            onPrev?.();
            setGregorianDate((current) =>
              moment(current).startOf('month').subtract(1, 'month').valueOf(),
            );
          }}
          onNext={() => {
            onNext?.();
            setGregorianDate((current) =>
              moment(current).startOf('month').add(1, 'month').valueOf(),
            );
          }}
        />
      </View>

      {agendaConfig && selectedEventDay ? (
        <EventSheet
          key={`${selectedEventDay.year}-${selectedEventDay.month}-${selectedEventDay.day}`}
          visible
          dateLabel={formatDayLabel(
            selectedEventDay.year,
            selectedEventDay.month,
            selectedEventDay.day,
            calendarType,
          )}
          date={selectedDayDate}
          events={selectedDayEvents}
          localItems={isGoogleSynced ? [] : selectedDayLocalItems}
          agendaConfig={agendaConfig}
          isLoading={google.isLoading}
          error={google.error}
          onClose={() => setSelectedEventDay(null)}
          onCreate={handleReserve}
          onUpdate={handleAgendaUpdate}
          onDelete={handleAgendaDelete}
        />
      ) : null}
    </View>
  );
};

const HCalendarWithGoogleAuth = (props: HCalendarProps) => {
  const auth = useGoogleCalendarAuth(props.googleCalendar);
  const googleCalendar = auth.accessToken
    ? {...props.googleCalendar, accessToken: auth.accessToken}
    : undefined;

  return (
    <View>
      <GoogleSignInBar auth={auth} />
      <HCalendarView {...props} googleCalendar={googleCalendar} />
    </View>
  );
};

const HCalendar = (props: HCalendarProps) => {
  if (hasGoogleOAuthClientId(props.googleCalendar)) {
    return <HCalendarWithGoogleAuth {...props} />;
  }

  return <HCalendarView {...props} />;
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    alignSelf: 'center',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});

export {HCalendar};
export type {HCalendarProps, CalendarType, SelectedDateRange} from './types';
export type {CalendarEvent, GoogleCalendarConfig} from './googleCalendar/types';
export type {AgendaConfig, AgendaItem} from './agenda/types';
export {useGoogleCalendar} from './googleCalendar/useGoogleCalendar';
export {useGoogleCalendarAuth} from './googleCalendar/useGoogleCalendarAuth';
