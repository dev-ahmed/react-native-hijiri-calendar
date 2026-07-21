import moment from 'moment-hijri';
import React from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {hMonthsShort, gMonthsShort, calendarTypes} from '../../constants';
import {Header} from './Header';
import {Rows} from './Rows';
import {getDateParts, isHijiri} from '../../utils';
import type {
  CalendarType,
  HCalendarProps,
  SelectedDateRange,
} from '../../types';

type CalendarProps = {
  headerStyle?: StyleProp<ViewStyle>;
  headerFontStyle?: StyleProp<TextStyle>;
  activeDate: number;
  selectedPeriod?: unknown;
  containerStyle?: StyleProp<ViewStyle>;
  weekDaysStyle?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  currentDayStyle?: StyleProp<TextStyle>;
  onDaySelect?: HCalendarProps['onDaySelect'];
  dayNameFontStyle?: StyleProp<TextStyle>;
  selectedDates?: SelectedDateRange[];
  calendarType: CalendarType;
  iconPrev?: HCalendarProps['iconPrev'];
  iconNext?: HCalendarProps['iconNext'];
  markedDatesTextStyle?: StyleProp<TextStyle>;
  customGMonths?: string[];
  customHMonths?: string[];
  customWeekDays?: string[];
  onNext: () => void;
  onPrev: () => void;
  dayContainerStyle?: StyleProp<ViewStyle>;
  colContainerStyle?: StyleProp<ViewStyle>;
};

const Calendar = ({
  headerStyle,
  headerFontStyle,
  activeDate,
  containerStyle,
  weekDaysStyle,
  fontStyle,
  currentDayStyle,
  onDaySelect,
  dayNameFontStyle,
  selectedDates,
  calendarType,
  iconPrev,
  iconNext,
  markedDatesTextStyle,
  customGMonths,
  customHMonths,
  customWeekDays,
  onNext,
  onPrev,
  dayContainerStyle,
  colContainerStyle,
}: CalendarProps) => {
  const hMonths = customHMonths ? customHMonths : hMonthsShort;
  const gMonths = customGMonths ? customGMonths : gMonthsShort;

  const cursorDate = moment(activeDate);
  const today = getDateParts(moment(), calendarType);
  const {year, month} = getDateParts(cursorDate, calendarType);

  const firstDay = (
    isHijiri(calendarType)
      ? cursorDate.clone().startOf('iMonth')
      : cursorDate.clone().startOf('month')
  ).day();

  const onPress = (item: string | number, marked: boolean) => {
    if (typeof item !== 'number' || item < 1) {
      return;
    }

    const date =
      calendarType === calendarTypes.hijiri
        ? `${item}/${month + 1}/${year}`
        : `${year}/${month + 1}/${item}`;

    onDaySelect?.(date, marked);
  };

  const months = isHijiri(calendarType) ? hMonths : gMonths;

  return (
    <View style={[styles.container, containerStyle]}>
      <Header
        headerStyle={headerStyle}
        headerFontStyle={headerFontStyle}
        month={months[month]}
        year={year}
        onNext={onNext}
        onPrev={onPrev}
        iconNext={iconNext}
        iconPrev={iconPrev}
      />
      <Rows
        customWeekDays={customWeekDays}
        onPress={onPress}
        firstDay={firstDay}
        currentDay={today.day}
        month={month}
        year={year}
        weekDaysStyle={weekDaysStyle}
        fontStyle={fontStyle}
        currentDayStyle={currentDayStyle}
        dayNameFontStyle={dayNameFontStyle}
        selectedDates={selectedDates}
        markedDatesTextStyle={markedDatesTextStyle}
        calendarType={calendarType}
        dayContainerStyle={dayContainerStyle}
        colContainerStyle={colContainerStyle}
      />
    </View>
  );
};

export {Calendar};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'rgba(0,0,0, 0.05)',
  },
});
