import moment from 'moment-hijri';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { monthsShort as months } from '../../utils';
import { Header } from './Header';
import { Rows } from './Rows';

const Calendar = ({ selectedMonth, ...rest }) => {
  const activeDate = moment().add(selectedMonth, 'iMonth');
  const year = activeDate.iYear();
  const month = activeDate.iMonth();

  const currentDay = activeDate.iDate();
  const firstDay = activeDate.startOf('iMonth').day();

  const _onPress = (item) => {
    console.log(item);
  };

  return (
    <View style={styles.container}>
      <Header month={months[month]} year={year} {...rest} />
      <Rows
        onPress={_onPress}
        firstDay={firstDay}
        currentDay={currentDay}
        month={month}
        year={year}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.05)',
  },
});
