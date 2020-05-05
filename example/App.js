import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HCalendar } from 'react-native-hijiri-calendar';

export default ({}) => {
  const [month, setMonth] = useState(0);

  return (
    <View style={styles.container}>
      <HCalendar selectedMonth={month} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
