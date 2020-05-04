import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from './components/Calendar';

const HCalendar = ({ containerStyle, onPrev, onNext }) => {
  const [month, setMonth] = useState(0);

  return (
    <Calendar
      containerStyle={[styles.container, containerStyle]}
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
