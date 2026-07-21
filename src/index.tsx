import moment from 'moment-hijri';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from './components/Calendar';
import {calendarTypes} from './constants';
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
  const [hijiriDate, setHijiriDate] = useState(() =>
    moment().startOf('iMonth').valueOf(),
  );
  const [gregorianDate, setGregorianDate] = useState(() =>
    moment().startOf('month').valueOf(),
  );

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
    </View>
  );
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
