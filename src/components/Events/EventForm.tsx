import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type EventFormProps = {
  title: string;
  onTitleChange: (value: string) => void;
  submitLabel: string;
  placeholder?: string;
  onSubmit: () => void;
  onCancel?: () => void;
  isSubmitting: boolean;
};

const _EventForm = ({
  title,
  onTitleChange,
  submitLabel,
  placeholder = 'Event title',
  onSubmit,
  onCancel,
  isSubmitting,
}: EventFormProps) => {
  const canSubmit = title.trim().length > 0 && !isSubmitting;

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={onTitleChange}
        placeholder={placeholder}
        placeholderTextColor="#8aa0a8"
        style={styles.input}
      />
      <View style={styles.actions}>
        {onCancel ? (
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={onSubmit}
          disabled={!canSubmit}
          style={[styles.submitButton, !canSubmit && styles.submitDisabled]}
        >
          <Text style={styles.submitText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const EventForm = React.memo(_EventForm);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d0dde3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#24353c',
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5a727c',
  },
  submitButton: {
    backgroundColor: '#79afc1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
