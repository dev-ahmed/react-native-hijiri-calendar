import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import type {MarkedDays} from '../../types';

type ColProps = {
  rowData: Array<string | number>;
  currentDay: number | false;
  containerStyle?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  currentDayStyle?: StyleProp<TextStyle>;
  dayNameFontStyle?: StyleProp<TextStyle>;
  markedDays?: MarkedDays[] | false;
  activeMonth: number;
  markedDatesTextStyle?: StyleProp<TextStyle>;
  onPress: (item: string | number, marked: boolean) => void;
  dayContainerStyle?: StyleProp<ViewStyle>;
  colContainerStyle?: StyleProp<ViewStyle>;
};

const isMarkedDay = (
  markedDays: MarkedDays[] | false | undefined,
  item: string | number,
  activeMonth: number,
): boolean => {
  if (!Array.isArray(markedDays) || typeof item !== 'number' || item < 1) {
    return false;
  }

  return markedDays.some(({selectedDays, months}) => {
    return months.includes(activeMonth) && selectedDays.includes(item);
  });
};

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
}: ColProps) => {
  const holidayFontColor = '#a00';

  const handleColColor = (colIndex: number) => {
    return {color: colIndex === 5 ? holidayFontColor : '#000'};
  };

  const handleCurrentDayStyle = (item: string | number) => {
    return {
      fontWeight: item === currentDay ? ('bold' as const) : ('normal' as const),
    };
  };

  const handleMarkedDays = (
    markedDay: MarkedDays,
    item: string | number,
  ): ViewStyle | undefined => {
    if (typeof item !== 'number' || item < 1) {
      return undefined;
    }

    const {selectedDays, months, style} = markedDay;
    if (
      (months.includes(activeMonth) || activeMonth - months[0] >= 1) &&
      selectedDays.includes(item)
    ) {
      const firstItem = selectedDays[0] === item ? styles.leftRadius : null;
      const lastItem =
        selectedDays[selectedDays.length - 1] === item
          ? styles.rightRadius
          : null;

      return {
        ...firstItem,
        ...lastItem,
        ...styles.highlightStyle,
        ...(style as object),
      };
    }

    return undefined;
  };

  const handlePress = (item: string | number) => {
    const marked = isMarkedDay(markedDays, item, activeMonth);
    onPress(item, marked);
  };

  return (
    <View style={[styles.container, containerStyle, colContainerStyle]}>
      {rowData.map((item, colIndex) => {
        return (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            key={colIndex.toString()}
            style={[
              styles.col,
              typeof item !== 'number' && styles.daysCol,
              dayContainerStyle,
            ]}
          >
            <Text
              style={[
                handleColColor(colIndex),
                handleCurrentDayStyle(item),
                styles.colText,
                item === currentDay && currentDayStyle,
                fontStyle,
                typeof item !== 'number' && {
                  ...styles.dayName,
                  ...(dayNameFontStyle as object),
                },
                isMarkedDay(markedDays, item, activeMonth) &&
                  markedDatesTextStyle,
              ]}
            >
              {item === -1 ? '' : String(item)}
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
    flexDirection: 'row',
    minHeight: 36,
    paddingVertical: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    minHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysCol: {},
  colText: {
    fontSize: 14,
    lineHeight: 20,
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
    fontSize: 13,
    fontWeight: 'bold',
  },
});
