import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import I18n from '../../i18n';

const _Header = ({
  month,
  year,
  headerStyle,
  headerFontStyle,
  onNext,
  onPrev,
  iconNext,
  iconPrev,
}) => {
  return (
    <View>
      <View style={[styles.yearMonth, headerStyle]}>
        {iconPrev ? (
          <TouchableOpacity onPress={onPrev}> {iconPrev}</TouchableOpacity>
        ) : (
          <MaterialIcons
            style={{transform: [{rotate: '180deg'}]}}
            size={32}
            color="white"
            name="navigate-next"
            onPress={onPrev}
          />
        )}
        <Text style={[styles.yearMonthText, headerFontStyle]}>
          {I18n.t(month)} {year}
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: -1,
    paddingVertical: 10,
  },
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
});
