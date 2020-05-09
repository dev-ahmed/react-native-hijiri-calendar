import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const _Col = ({
  rowData,
  currentDay,
  onPress,
  containerStyle,
  fontStyle,
  currentDayStyle,
  dayNameFontStyle,
  markedDays,
  activeMonth,
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
      if (months.includes(activeMonth) && selectedDays.includes(item)) {
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

  return (
    <View style={[styles.container, containerStyle]}>
      {rowData.map((item, colIndex) => {
        return (
          <View key={colIndex.toString()} style={[styles.col]}>
            <Text
              style={[
                handleColColor(colIndex),
                handleCurrentDayStyle(item),
                styles.colText,
                item == currentDay && currentDayStyle,
                isNaN(item) && {...styles.dayName, dayNameFontStyle},
                fontStyle,
              ]}
              onPress={onPress}>
              {item != -1 ? item : null}
            </Text>
            {markedDays &&
              markedDays.map((markedDay, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={handleMarkedDays(markedDay, item)}
                  />
                );
              })}
          </View>
        );
      })}
    </View>
  );
};

export const Col = React.memo(_Col);

const styles = StyleSheet.create({
  container: {
    height: '10%',
    flexDirection: 'row',
    paddingVertical: '2%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  col: {
    width: '10%',
    padding: '2%',
    alignItems: 'center',
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
    // borderColor: 'green',
    borderTopWidth: 4,
    borderBottomWidth: 4,
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
});
