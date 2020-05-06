import moment from 'moment-hijri';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {monthsShort as months} from '../../constants';
import {Header} from './Header';
import {Rows} from './Rows';

const Calendar = ({
  selectedMonth,
  selectedPeriod,
  containerStyle,
  weekDaysStyle,
  fontStyle,
  currentDayStyle,
  locale = 'en',
  onDaySelect,
  headerStyle,
  dayNameFontStyle,
  ...rest
}) => {
  moment.locale(locale);
  const activeDate = moment().add(selectedMonth, 'iMonth');
  const year = activeDate.iYear();
  const month = activeDate.iMonth();

  const currentDay = activeDate.iDate();
  const firstDay = activeDate.startOf('iMonth').day();

  const _onPress = (item) => {
    if (onDaySelect) onDaySelect(item);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Header
        headerStyle={headerStyle}
        month={months[month]}
        year={year}
        {...rest}
      />
      <Rows
        highlightedPeriod={selectedPeriod}
        onPress={_onPress}
        firstDay={firstDay}
        currentDay={currentDay}
        month={month}
        year={year}
        weekDaysStyle={weekDaysStyle}
        fontStyle={fontStyle}
        currentDayStyle={currentDayStyle}
        dayNameFontStyle={dayNameFontStyle}
      />
    </View>
  );
};

export {Calendar};

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
