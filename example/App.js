import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {HCalendar} from 'react-native-hijiri-calendar';

const calendarOptions = [
  {value: 'hijiri', label: 'Hijri'},
  {value: 'gregorian', label: 'Gregorian'},
];

export default function App() {
  const [calendarType, setCalendarType] = useState('hijiri');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.switchTrack}>
        {calendarOptions.map((option) => {
          const isActive = calendarType === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => setCalendarType(option.value)}
              style={[
                styles.switchOption,
                isActive && styles.switchOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.switchOptionText,
                  isActive && styles.switchOptionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.calendarContainer}>
        <View
          style={calendarType === 'hijiri' ? styles.visible : styles.hidden}
          pointerEvents={calendarType === 'hijiri' ? 'auto' : 'none'}
        >
          <HCalendar
            calendarType="hijiri"
            onDaySelect={(day, marked) => {
              console.log(day, marked);
            }}
            selectedDates={[
              {
                from: '1441/9/1',
                to: '1441/9/5',
                style: {borderColor: 'blue'},
              },
              {
                from: '1441/9/4',
                to: '1441/9/12',
                style: {borderColor: 'green'},
              },
            ]}
          />
        </View>
        <View
          style={calendarType === 'gregorian' ? styles.visible : styles.hidden}
          pointerEvents={calendarType === 'gregorian' ? 'auto' : 'none'}
        >
          <HCalendar calendarType="gregorian" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f6f8',
  },
  switchTrack: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 4,
    borderRadius: 14,
    backgroundColor: '#e2ebef',
    borderWidth: 1,
    borderColor: '#d0dde3',
  },
  switchOption: {
    minWidth: 112,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  switchOptionActive: {
    backgroundColor: '#79afc1',
    shadowColor: '#3d6b7a',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  switchOptionText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#5a727c',
  },
  switchOptionTextActive: {
    color: '#fff',
  },
  calendarContainer: {
    width: '100%',
    height: '38%',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});
