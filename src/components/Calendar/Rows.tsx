import React from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  generateMatrix,
  generateSelectedDatesMatrix,
  getMonth,
  getDay,
  getCurrentMonth,
  getCurrentYear,
} from '../../utils';
import {Col} from './Col';
import type {CalendarType, SelectedDateRange} from '../../types';

type RowsProps = {
  month: number;
  firstDay: number;
  currentDay: number;
  year: number;
  fontStyle?: StyleProp<TextStyle>;
  weekDaysStyle?: StyleProp<ViewStyle>;
  currentDayStyle?: StyleProp<TextStyle>;
  dayNameFontStyle?: StyleProp<TextStyle>;
  selectedDates?: SelectedDateRange[];
  calendarType: CalendarType;
  markedDatesTextStyle?: StyleProp<TextStyle>;
  onPress: (item: string | number, marked: boolean) => void;
  customWeekDays?: string[];
  dayContainerStyle?: StyleProp<ViewStyle>;
  colContainerStyle?: StyleProp<ViewStyle>;
};

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
}: RowsProps) => {
  const matrix = generateMatrix({
    month,
    firstDay,
    year,
    calendarType,
    customWeekDays,
  });
  const currentMonth = getCurrentMonth(calendarType);
  const currentYear = getCurrentYear(calendarType);
  const flatMatrix = [...matrix[4], ...matrix[5]].filter(
    (value): value is number => typeof value === 'number',
  );
  const maxDay = Math.max(...flatMatrix);

  const markedDates =
    selectedDates &&
    selectedDates.map((item) => {
      const isSameMonthFrom = getMonth(item.from, calendarType) === month;
      let startingDay: number | null = getDay(item.from, calendarType);
      let endingDay: number | null = getDay(item.to, calendarType);

      const startingDayMonthFrom = getMonth(item.from, calendarType);
      const endingDayMonthTo = getMonth(item.to, calendarType);

      if (
        startingDayMonthFrom <= month &&
        month <= endingDayMonthTo
      ) {
        if (isSameMonthFrom && month !== endingDayMonthTo) {
          endingDay = maxDay;
        }
        if (endingDayMonthTo < month) {
          endingDay = null;
        }
        if (endingDayMonthTo === month && month !== startingDayMonthFrom) {
          startingDay = 1;
        }
        if (endingDayMonthTo > month && startingDayMonthFrom < month) {
          startingDay = 1;
          endingDay = maxDay;
        }
      }

      return {
        selectedDays: generateSelectedDatesMatrix({
          startDate: startingDay,
          endDate: endingDay,
          monthMatrix: matrix,
        }),
        months: [
          getMonth(item.from, calendarType),
          getMonth(item.to, calendarType),
        ],
        style: item.style,
      };
    });

  const isCurrentDay: number | false =
    currentMonth === month && currentYear === year && currentDay;

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
              rowIndex === 0 && weekDaysBackground,
              rowIndex === 0 && weekDaysStyle,
            ]}
            currentDay={isCurrentDay}
            rowData={row}
            activeMonth={month}
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
    paddingBottom: 8,
  },
});

export const Rows = React.memo(_Rows);
