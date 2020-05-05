import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const _Col = ({
  rowData,
  currentDay,
  onPress,
  containerStyle,
  fontStyle,
  currentDayStyle,
}) => {
  const holidayFontColor = '#a00';

  return (
    <View style={[styles.container, containerStyle]}>
      {rowData.map((item, colIndex) => {
        return (
          <View key={colIndex.toString()} style={styles.col}>
            <Text
              style={[
                {
                  color: colIndex == 5 ? holidayFontColor : '#000',
                  fontWeight: item == currentDay ? 'bold' : 'normal',
                },
                styles.colText,
                item == currentDay && currentDayStyle,
                fontStyle,
              ]}
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
