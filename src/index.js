import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from './components/Calendar';

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
}) => {
  const [month, setMonth] = useState(0);

  return (
    <Calendar
      headerStyle={headerStyle}
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
