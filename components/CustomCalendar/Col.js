import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment-hijri';

const _Col = ({
  rowData,
  currentDay,
  containerStyle,
  onPress,
  activeMonth,
  highlightedPeriod,
  year,
}) => {
  const holidayFontColor = '#a00';

  const start = moment(highlightedPeriod.start, 'iYYYY-iM-iD');
  const end = moment(highlightedPeriod.end, 'iYYYY-iM-iD');

  const handleHighlightedPeriod = (item) => {
    const isBefore = moment(
      `${year}-${activeMonth}-${item}`,
      'iYYYY-iM-iD'
    ).isSameOrBefore(end);
    const isAfter = moment(
      `${year}-${activeMonth}-${item}`,
      'iYYYY-iM-iD'
    ).isSameOrAfter(start);

    const style = {};

    if (item !== -1 && isAfter && isBefore) {
      style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    return style;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {rowData.map((item, colIndex) => {
        return (
          <View
            key={colIndex.toString()}
            style={[handleHighlightedPeriod(item), styles.col]}
          >
            <Text
              style={{
                color: colIndex == 5 ? holidayFontColor : '#000',
                fontWeight: item == currentDay ? 'bold' : 'normal',
                ...styles.rowText,
              }}
              onPress={onPress}
            >
              {item != -1 ? item : null}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

_Col.propTypes = {};

export const Col = React.memo(_Col);

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    padding: 15,
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
  rowText: {
    flex: 1,
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
  },
});
