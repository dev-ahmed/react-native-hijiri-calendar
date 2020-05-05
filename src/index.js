import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from './components/Calendar';

const HCalendar = ({
  containerStyle,
  fontStyle,
  onPrev,
  onNext,
  weekDaysStyle,
  currentDayStyle,
}) => {
  const [month, setMonth] = useState(0);

  return (
    <Calendar
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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    minWidth: 350,
  },
});

export { HCalendar };
