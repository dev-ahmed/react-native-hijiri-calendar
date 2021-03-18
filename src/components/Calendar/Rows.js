import React from 'react';

import {StyleSheet, View} from 'react-native';
import {
  generateMatrix,
  generateSelectedDatesMatrix,
  getMonth,
  getDay,
  getCurrentMonth,
  getCurrentYear,
} from '../../utils';
import {Col} from './Col';

const _Rows = ({
  month,
  firstDay,
  currentDay,
  year,
  fontStyle,
  weekDaysStyle,
  currentDayStyle,
  dayNameFontStyle,
  selectedDates,
  calendarType,
  markedDatesTextStyle,
  onPress,
  customWeekDays,
  ...props
}) => {
  const matrix = generateMatrix({
    month,
    firstDay,
    year,
    calendarType,
    customWeekDays,
  });
  const currentMonth = getCurrentMonth(calendarType);
  const currentYear = getCurrentYear(calendarType);
  const flatMatrix=[...matrix[4], ...matrix[5]]
  const maxDay= Math.max(...flatMatrix)
  let startingDay;
  let endingDay;
  let startingDayMonthFrom;
  let endingDayMonthTo;
  
  const markedDates =
    selectedDates &&
    selectedDates.map((item) => {
      const isSameMonthFrom=getMonth(item.from) === month     
       startingDay = getDay(item.from);
       endingDay = getDay(item.to);
       startingDayMonthFrom=getMonth(item.from)
       endingDayMonthTo=getMonth(item.to)

      if(isSameMonthFrom){
        endingDay= maxDay;
      }
      if(endingDayMonthTo < month){
        endingDay=null
      }
      if(endingDayMonthTo === month){
        startingDay=1
      }
      
      if(endingDayMonthTo > month && startingDayMonthFrom < month){
        startingDay=1
        endingDay=maxDay
      }

      return {
        selectedDays: generateSelectedDatesMatrix({
          startDate: startingDay,
          endDate: endingDay,
          monthMatrix: matrix,
        }),
        months: [getMonth(item.from), getMonth(item.to)],
        style: item.style,
      };
    });

  const isCurrentDay =
    currentMonth == month && currentYear == year && currentDay;

  const weekDaysBackground = {backgroundColor: '#bcced6'};
  
  return (
    <View style={styles.container}>
      {matrix.map((row, rowIndex) => {
        return (
          <Col
            {...props}
            onPress={onPress}
            key={rowIndex.toString()}
            containerStyle={[
              rowIndex == 0 && weekDaysBackground,
              rowIndex == 0 && weekDaysStyle,
            ]}
            currentDay={isCurrentDay}
            rowData={row}
            index={rowIndex}
            activeMonth={month}
            year={year}
            fontStyle={fontStyle}
            currentDayStyle={currentDayStyle}
            dayNameFontStyle={dayNameFontStyle}
            markedDays={markedDates}
            markedDatesTextStyle={markedDatesTextStyle}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export const Rows = React.memo(_Rows);
