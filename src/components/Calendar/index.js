import moment from 'moment-hijri';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hMonthsShort, gMonthsShort, calendarTypes} from '../../constants';
import {Header} from './Header';
import {Rows} from './Rows';
import {getYear, getMonth, getDay, isHijiri, handleFormat} from '../../utils';
// import { i } from '../../i18n';

const Calendar = ({
  headerStyle,
  headerFontStyle,
  selectedMonth,
  selectedPeriod,
  containerStyle,
  weekDaysStyle,
  fontStyle,
  currentDayStyle,
  // locale,
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
  ...rest
}) => {
  // i.locale = locale;

  const hMonths = !!customHMonths ? customHMonths : hMonthsShort;
  const gMonths = !!customGMonths ? customGMonths : gMonthsShort;

  const activeDate = moment().add(
    selectedMonth,
    isHijiri(calendarType) ? 'iMonth' : 'month',
  );

  const year = getYear(handleFormat(activeDate, calendarType), calendarType);
  const month = getMonth(handleFormat(activeDate, calendarType), calendarType);
  const currentDay = getDay(
    handleFormat(activeDate, calendarType),
    calendarType,
  );

  const firstDay = activeDate
    .startOf(isHijiri(calendarType) ? 'iMonth' : 'month')
    .day();

  const _onPress = (item, marked) => {
    const date =
      calendarType == calendarTypes.hijiri
        ? `${item}/${month + 1}/${year}`
        : `${year}/${month + 1}/${item}`;

    if (onDaySelect && item >= 1) onDaySelect(date, marked);
  };

  const months = isHijiri(calendarType) ? hMonths : gMonths;

  return (
    <View style={[styles.container, containerStyle]}>
      <Header
        headerStyle={headerStyle}
        headerFontStyle={headerFontStyle}
        month={months[month]}
        year={year}
        {...rest}
        iconNext={iconNext}
        iconPrev={iconPrev}
      />
      <Rows
        customWeekDays={customWeekDays}
        highlightedPeriod={selectedPeriod}
        onPress={_onPress}
        firstDay={firstDay}
        currentDay={currentDay}
        month={month}
        year={year}
        weekDaysStyle={weekDaysStyle}
        fontStyle={fontStyle}
        currentDayStyle={currentDayStyle}
        dayNameFontStyle={dayNameFontStyle}
        selectedDates={selectedDates}
        markedDatesTextStyle={markedDatesTextStyle}
        calendarType={calendarType}
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
