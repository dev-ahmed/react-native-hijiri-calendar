import React from 'react';
import moment from 'moment-hijri';
import { StyleSheet, View } from 'react-native';
import { getMonthDaysInYear, generateMatrix } from '../../utils';
import { Col } from './Col';

// const weekDays = ['Ah', 'It', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'];
const weekDays = moment.weekdaysMin();
const nDays = getMonthDaysInYear();

const _Rows = ({ month, firstDay, currentDay, year, ...rest }) => {
  const matrix = generateMatrix({ nDays, month, weekDays, firstDay });
  const currentMonth = moment().iMonth();
  const currentYear = moment().iYear();

  const isCurrentDay =
    currentMonth == month && currentYear == year && currentDay;

  return (
    <View style={styles.container}>
      {matrix.map((row, rowIndex) => {
        console.log(row);
        return (
          <Col
            {...rest}
            containerStyle={{ backgroundColor: rowIndex == 0 ? '#ddd' : null }}
            currentDay={isCurrentDay}
            rowData={row}
            index={rowIndex}
          />
        );
      })}
    </View>
  );
};

_Rows.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: -1,
  },
});

export const Rows = React.memo(_Rows);
