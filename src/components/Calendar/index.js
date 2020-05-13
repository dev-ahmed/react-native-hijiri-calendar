import moment from 'moment-hijri';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hMonthsShort, gMonthsShort} from '../../constants';
import {Header} from './Header';
import {Rows} from './Rows';
import {getYear, getMonth, getDay, isHijiri} from '../../utils';

const Calendar = ({
  selectedMonth,
  selectedPeriod,
  containerStyle,
  weekDaysStyle,
  fontStyle,
  currentDayStyle,
  locale = 'en',
  onDaySelect,
  headerStyle,
  dayNameFontStyle,
  selectedDates,
  calendarType,
  iconPrev,
  iconNext,
  markedDatesTextStyle,
  ...rest
}) => {
  moment.locale(locale);
  const activeDate = moment().add(selectedMonth, isHijiri ? 'iMonth' : 'month');
  const year = getYear(activeDate, calendarType);
  const month = getMonth(activeDate, calendarType);

  const currentDay = getDay(activeDate, calendarType);
  const firstDay = activeDate.startOf(isHijiri ? 'iMonth' : 'month').day();

  const _onPress = (item) => {
    if (onDaySelect && item >= 1) onDaySelect(item);
  };

  const months = isHijiri(calendarType) ? hMonthsShort : gMonthsShort;

  return (
    <View style={[styles.container, containerStyle]}>
      <Header
        headerStyle={headerStyle}
        month={months[month]}
        year={year}
        {...rest}
        iconNext={iconNext}
        iconPrev={iconPrev}
      />
      <Rows
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
