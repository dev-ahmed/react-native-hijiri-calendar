import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AgendaRow} from './AgendaRow';
import {EventForm} from './EventForm';
import {EventRow} from './EventRow';
import {
  generateTimeSlots,
  getAllDayEvents,
  getEventForSlot,
  getLocalItemForSlot,
} from '../../agenda/utils';
import type {AgendaConfig, AgendaItem, TimeSlot} from '../../agenda/types';
import type {CalendarEvent} from '../../googleCalendar/types';

type EventSheetProps = {
  visible: boolean;
  dateLabel: string;
  date: string;
  events: CalendarEvent[];
  localItems: AgendaItem[];
  agendaConfig: Required<AgendaConfig>;
  isLoading: boolean;
  error?: string | null;
  onClose: () => void;
  onCreate: (title: string, slot: TimeSlot) => Promise<void>;
  onUpdate: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const EventSheet = ({
  visible,
  dateLabel,
  date,
  events,
  localItems,
  agendaConfig,
  isLoading,
  error,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: EventSheetProps) => {
  const [title, setTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const slots = useMemo(() => generateTimeSlots(agendaConfig), [agendaConfig]);
  const allDayEvents = getAllDayEvents(events);

  const resetForm = () => {
    setTitle('');
    setSelectedSlot(null);
    setEditingId(null);
    setFormError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    const booked = getEventForSlot(events, slot, date);
    const local = getLocalItemForSlot(localItems, slot, date);
    const reserved = booked ?? local;

    setSelectedSlot(slot);
    setEditingId(reserved?.id ?? null);
    setTitle(reserved?.title ?? '');
    setFormError(null);
  };

  const handleSubmit = async () => {
    const nextTitle = title.trim();
    if (!nextTitle || !selectedSlot) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await onUpdate(editingId, nextTitle);
      } else {
        await onCreate(nextTitle, selectedSlot);
      }
      resetForm();
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Could not save reservation';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (eventId: string) => {
    Alert.alert('Remove reservation', 'This cannot be undone.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          onDelete(eventId)
            .then(() => {
              if (editingId === eventId) {
                resetForm();
              }
            })
            .catch((caught) => {
              const message =
                caught instanceof Error
                  ? caught.message
                  : 'Could not remove reservation';
              setFormError(message);
            });
        },
      },
    ]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Agenda · {dateLabel}</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator color="#79afc1" style={styles.loader} />
          ) : null}
          {error || formError ? (
            <Text style={styles.error}>{formError ?? error}</Text>
          ) : null}
          <ScrollView style={styles.list}>
            {allDayEvents.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                onEdit={(item) => {
                  setEditingId(item.id);
                  setSelectedSlot(null);
                  setTitle(item.title);
                }}
                onDelete={handleDelete}
              />
            ))}
            {slots.map((slot) => {
              const booked = getEventForSlot(events, slot, date);
              const local = getLocalItemForSlot(localItems, slot, date);
              const reserved = booked ?? local;
              const isSelected =
                selectedSlot?.start === slot.start &&
                selectedSlot?.end === slot.end;

              return (
                <AgendaRow
                  key={slot.start}
                  slot={slot}
                  title={reserved?.title}
                  isSelected={isSelected}
                  onSelect={() => handleSelectSlot(slot)}
                  onDelete={
                    reserved ? () => handleDelete(reserved.id) : undefined
                  }
                />
              );
            })}
          </ScrollView>
          {selectedSlot ? (
            <EventForm
              title={title}
              onTitleChange={setTitle}
              placeholder="Reservation title"
              submitLabel={editingId ? 'Save' : `Reserve ${selectedSlot.start}`}
              onSubmit={handleSubmit}
              onCancel={resetForm}
              isSubmitting={isSubmitting}
            />
          ) : (
            <Text style={styles.hint}>Select a time slot to reserve it.</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const MemoEventSheet = React.memo(EventSheet);

export {MemoEventSheet as EventSheet};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  overlay: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#f3f6f8',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#24353c',
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#79afc1',
  },
  loader: {
    marginVertical: 8,
  },
  error: {
    color: '#a00',
    fontSize: 13,
    marginBottom: 8,
  },
  list: {
    maxHeight: 320,
    marginBottom: 12,
  },
  hint: {
    paddingVertical: 8,
    textAlign: 'center',
    color: '#5a727c',
    fontSize: 13,
  },
});
