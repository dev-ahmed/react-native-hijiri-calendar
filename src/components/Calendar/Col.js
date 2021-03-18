import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import { i } from '../../i18n';
const _Col = ({
  rowData,
  currentDay,
  containerStyle,
  fontStyle,
  currentDayStyle,
  dayNameFontStyle,
  markedDays,
  activeMonth,
  markedDatesTextStyle,
  onPress,
  dayContainerStyle,
  colContainerStyle,
}) => {
  const holidayFontColor = '#a00';

  const handleColColor = (colIndex) => {
    return {color: colIndex == 5 ? holidayFontColor : '#000'};
  };

  const handleCurrentDayStyle = (item) => {
    return {
      fontWeight: item == currentDay ? 'bold' : 'normal',
    };
  };

  const handleMarkedDays = (markedDay, item) => {
    if (item >= 1) {
      const {selectedDays, months, style} = markedDay;
      if ((months.includes(activeMonth) || activeMonth - months[0] >= 1) && selectedDays.includes(item)) {
        const firstItem = selectedDays[0] == item && styles.leftRadius;
        const lastItem =
          selectedDays[selectedDays.length - 1] == item && styles.rightRadius;

        return {
          ...firstItem,
          ...lastItem,
          ...styles.highlightStyle,
          ...style,
        };
      }
    }
  };

  const _onPress = (item) => {
    const marked = isMarkedDay(markedDays, item);
    onPress(item, marked);
  };

  const isMarkedDay = (markedDays, item) => {
    let marked = false;
    if (Array.isArray(markedDays) && item >= 1) {
      markedDays.map((markedDay) => {
        const {selectedDays, months} = markedDay;
        if (months.includes(activeMonth) && selectedDays.includes(item)) {
          marked = true;
        }
      });
    }
    return marked;
  };

  return (
    <View style={[styles.container, containerStyle, colContainerStyle]}>
      {rowData.map((item, colIndex) => {
        return (
          <TouchableOpacity
            onPress={() => _onPress(item)}
            key={colIndex.toString()}
            style={[
              styles.col,
              isNaN(item) && styles.daysCol,
              dayContainerStyle,
            ]}>
            <Text
              style={[
                handleColColor(colIndex),
                handleCurrentDayStyle(item),
                styles.colText,
                item == currentDay && currentDayStyle,
                fontStyle,
                isNaN(item) && {...styles.dayName, ...dayNameFontStyle},
                isMarkedDay(markedDays, item) && markedDatesTextStyle,
              ]}>
              {/* {item != -1 ? (isNaN(item) ? i.t(item) : item) : null} */}
              {item != -1 ? item : null}
            </Text>
            {Array.isArray(markedDays) &&
              markedDays.map((markedDay, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={handleMarkedDays(markedDay, item)}
                  />
                );
              })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const Col = React.memo(_Col);

const styles = StyleSheet.create({
  container: {
    minHeight: '10%',
    flexDirection: 'row',
    paddingVertical: '2%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  col: {
    width: '10%',
    paddingVertical: '2%',
    alignItems: 'center',
  },
  daysCol: {
    // marginVertical: 3,
  },
  colText: {
    flex: 1,
    padding: '1%',
    fontSize: 14,
    textAlign: 'center',
  },
  highlightStyle: {
    top: 2,
    height: 27,
    width: 50,
    position: 'absolute',
    borderColor: '#ff6a00',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    zIndex: -1,
  },
  leftRadius: {
    borderStartWidth: 4,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rightRadius: {
    borderEndWidth: 4,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  dayName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
});
