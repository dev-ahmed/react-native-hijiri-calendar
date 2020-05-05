import React from 'react';
import moment from 'moment-hijri';
import { StyleSheet, View } from 'react-native';
import { generateMatrix, generateHighlightedDays } from '../../utils';
import { Col } from './Col';

const _Rows = ({
  month,
  firstDay,
  currentDay,
  year,
  highlightedPeriod,
  fontStyle,
  weekDaysStyle,
  currentDayStyle,
  ...rest
}) => {
  const matrix = generateMatrix({ month, firstDay });

  const currentMonth = moment().iMonth();
  const currentYear = moment().iYear();

  const isCurrentDay =
    currentMonth == month && currentYear == year && currentDay;

  return (
    <View style={styles.container}>
      {matrix.map((row, rowIndex) => {
        return (
          <Col
            {...rest}
            key={rowIndex.toString()}
            containerStyle={[
              { backgroundColor: rowIndex == 0 ? '#ddd' : null },
              rowIndex == 0 && weekDaysStyle,
            ]}
            currentDay={isCurrentDay}
            rowData={row}
            index={rowIndex}
            activeMonth={month}
            highlightedPeriod={highlightedPeriod}
            year={year}
            fontStyle={fontStyle}
            currentDayStyle={currentDayStyle}
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
