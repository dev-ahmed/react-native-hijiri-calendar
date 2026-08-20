import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {formatEventTime} from '../../googleCalendar/utils';
import type {CalendarEvent} from '../../googleCalendar/types';

type EventRowProps = {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
};

const _EventRow = ({event, onEdit, onDelete}: EventRowProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <Text style={styles.time}>{formatEventTime(event)}</Text>
      </View>
      <TouchableOpacity onPress={() => onEdit(event)} style={styles.icon}>
        <MaterialIcons name="edit" size={20} color="#4a6570" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(event.id)} style={styles.icon}>
        <MaterialIcons name="delete" size={20} color="#a00" />
      </TouchableOpacity>
    </View>
  );
};

export const EventRow = React.memo(_EventRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d0dde3',
  },
  text: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#24353c',
  },
  time: {
    marginTop: 2,
    fontSize: 12,
    color: '#5a727c',
  },
  icon: {
    padding: 6,
  },
});
