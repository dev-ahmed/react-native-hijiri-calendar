import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import type {TimeSlot} from '../../agenda/types';

type AgendaRowProps = {
  slot: TimeSlot;
  title?: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
};

const _AgendaRow = ({
  slot,
  title,
  isSelected,
  onSelect,
  onDelete,
}: AgendaRowProps) => {
  const isReserved = Boolean(title);

  return (
    <Pressable
      onPress={onSelect}
      style={[
        styles.row,
        isReserved && styles.reservedRow,
        isSelected && styles.selectedRow,
      ]}
    >
      <Text style={styles.time}>
        {slot.start} – {slot.end}
      </Text>
      <Text style={styles.title} numberOfLines={1}>
        {title || 'Available'}
      </Text>
      {onDelete ? (
        <Pressable onPress={onDelete} hitSlop={8}>
          <Text style={styles.delete}>Remove</Text>
        </Pressable>
      ) : (
        <Text style={styles.action}>{isReserved ? 'Edit' : 'Reserve'}</Text>
      )}
    </Pressable>
  );
};

export const AgendaRow = React.memo(_AgendaRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d0dde3',
  },
  reservedRow: {
    backgroundColor: '#e7f1f5',
  },
  selectedRow: {
    backgroundColor: '#d5e7ee',
  },
  time: {
    width: 92,
    fontSize: 12,
    fontWeight: '600',
    color: '#4a6570',
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: '#24353c',
    paddingRight: 8,
  },
  action: {
    fontSize: 12,
    fontWeight: '600',
    color: '#79afc1',
  },
  delete: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a00',
  },
});
