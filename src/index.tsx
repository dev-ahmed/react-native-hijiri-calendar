import moment from 'moment-hijri';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from './components/Calendar';
import {calendarTypes} from './constants';
import {isHijiri} from './utils';
import type {HCalendarProps} from './types';

const HCalendar = ({
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
}: HCalendarProps) => {
  const [activeDate, setActiveDate] = useState(() => moment().valueOf());

  const shiftMonth = (direction: -1 | 1) => {
    setActiveDate(current => {
      const nextDate = isHijiri(calendarType)
        ? moment(current).add(direction, 'iMonth')
        : moment(current).add(direction, 'month');
      return nextDate.valueOf();
    });
  };

  return (
    <Calendar
      colContainerStyle={colContainerStyle}
      dayContainerStyle={dayContainerStyle}
      customWeekDays={customWeekDays}
      customGMonths={customGMonths}
      customHMonths={customHMonths}
      headerStyle={headerStyle}
      headerFontStyle={headerFontStyle}
      dayNameFontStyle={dayNameFontStyle}
      containerStyle={[styles.container, containerStyle]}
      weekDaysStyle={weekDaysStyle}
      fontStyle={fontStyle}
      currentDayStyle={currentDayStyle}
      activeDate={activeDate}
      onPrev={() => {
        onPrev?.();
        shiftMonth(-1);
      }}
      onNext={() => {
        onNext?.();
        shiftMonth(1);
      }}
      selectedDates={selectedDates}
      onDaySelect={onDaySelect}
      iconPrev={iconPrev}
      iconNext={iconNext}
      markedDatesTextStyle={markedDatesTextStyle}
      calendarType={calendarType}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    alignSelf: 'center',
  },
});

export {HCalendar};
export type {HCalendarProps, CalendarType, SelectedDateRange} from './types';
