import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Calendar from './components/CustomCalendar';

export default ({}) => {
  const [month, setMonth] = useState(0);

  return (
    <View style={styles.container}>
      <Calendar
        selectedMonth={month}
        onPrev={() => setMonth(month - 1)}
        onNext={() => setMonth(month + 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 340,
    width: 340,
  },
});
