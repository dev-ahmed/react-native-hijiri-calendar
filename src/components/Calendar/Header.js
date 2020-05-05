import {MaterialIcons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const _Header = ({month, year, onNext, onPrev}) => {
  return (
    <>
      <View style={styles.yearMonth}>
        <MaterialIcons
          style={{transform: [{rotate: '180deg'}]}}
          size={32}
          color="white"
          name="navigate-next"
          onPress={onPrev}
        />
        <Text style={styles.yearMonthText}>
          {month} {year}
        </Text>
        <MaterialIcons
          onPress={onNext}
          color="white"
          size={32}
          name="navigate-next"
        />
      </View>
    </>
  );
};

_Header.propTypes = {};

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
    backgroundColor: 'rgb(0, 92, 185)',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  yearMonthText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'white',
  },
});
