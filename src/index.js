import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from './components/Calendar';
import {calendarTypes} from './constants';

const HCalendar = ({
  // locale,
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
}) => {
  const [month, setMonth] = useState(0);

  return (
    <Calendar
      // locale={locale}
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
      selectedMonth={month}
      onPrev={() => {
        if (onPrev) onPrev();
        setMonth(month - 1);
      }}
      onNext={() => {
        if (onNext) onNext();
        setMonth(month + 1);
      }}
      selectedDates={selectedDates}
      onDaySelect={onDaySelect}
      iconPrev={iconPrev}
      iconNext={iconNext}
      markedDatesTextStyle={markedDatesTextStyle}
      calendarType={calendarType} //gregorian / hijiri
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 300,
    alignSelf: 'center',
  },
});

export {HCalendar};
