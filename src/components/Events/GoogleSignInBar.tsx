import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {GoogleCalendarAuth} from '../../googleCalendar/useGoogleCalendarAuth';

type GoogleSignInBarProps = {
  auth: GoogleCalendarAuth;
};

const GoogleSignInBar = ({auth}: GoogleSignInBarProps) => {
  if (auth.accessToken) {
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Google Calendar connected</Text>
        <Pressable onPress={auth.signOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={auth.signIn}
        disabled={!auth.canPrompt}
        style={[styles.button, !auth.canPrompt && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </Pressable>
      <Text style={styles.hint}>
        {auth.error || 'Sign in to sync your Google Calendar events.'}
      </Text>
    </View>
  );
};

const MemoGoogleSignInBar = React.memo(GoogleSignInBar);

export {MemoGoogleSignInBar as GoogleSignInBar};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#79afc1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#5a727c',
    textAlign: 'center',
  },
});
