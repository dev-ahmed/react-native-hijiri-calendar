import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const _Col = ({
  rowData,
  currentDay,
  onPress,
  containerStyle,
  fontStyle,
  currentDayStyle,
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

  return (
    <View style={[styles.container, containerStyle]}>
      {rowData.map((item, colIndex) => {
        return (
          <View key={colIndex.toString()} style={styles.col}>
            <Text
              style={[
                handleColColor(colIndex),
                handleCurrentDayStyle(item),
                styles.colText,
                item == currentDay && currentDayStyle,
                fontStyle,
              ]}
              onPress={onPress}>
              {item != -1 ? item : null}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export const Col = React.memo(_Col);

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    padding: '4%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  col: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colText: {
    flex: 1,
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
  },
});
