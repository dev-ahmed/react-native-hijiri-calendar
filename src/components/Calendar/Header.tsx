import {MaterialIcons} from '@expo/vector-icons';
import React, {type ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type HeaderProps = {
  month: string;
  year: number;
  headerStyle?: StyleProp<ViewStyle>;
  headerFontStyle?: StyleProp<TextStyle>;
  onNext: () => void;
  onPrev: () => void;
  iconNext?: ReactNode;
  iconPrev?: ReactNode;
};

const _Header = ({
  month,
  year,
  headerStyle,
  headerFontStyle,
  onNext,
  onPrev,
  iconNext,
  iconPrev,
}: HeaderProps) => {
  return (
    <View>
      <View style={[styles.yearMonth, headerStyle]}>
        {iconPrev ? (
          <TouchableOpacity onPress={onPrev}>{iconPrev}</TouchableOpacity>
        ) : (
          <MaterialIcons
            style={styles.prevIcon}
            size={32}
            color="white"
            name="navigate-next"
            onPress={onPrev}
          />
        )}
        <Text style={[styles.yearMonthText, headerFontStyle]}>
          {month} {year}
        </Text>
        {iconNext ? (
          <TouchableOpacity onPress={onNext}>{iconNext}</TouchableOpacity>
        ) : (
          <MaterialIcons
            onPress={onNext}
            color="white"
            size={32}
            name="navigate-next"
          />
        )}
      </View>
    </View>
  );
};

export const Header = React.memo(_Header);

const styles = StyleSheet.create({
  yearMonth: {
    paddingVertical: 10,
    backgroundColor: '#79afc1',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#dbeede',
  },
  yearMonthText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'white',
  },
  prevIcon: {
    transform: [{rotate: '180deg'}],
  },
});
