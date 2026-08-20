import {useEffect, useState} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import type {GoogleCalendarConfig} from './types';

WebBrowser.maybeCompleteAuthSession();

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

const asClientId = (value?: string) => value || undefined;

export const useGoogleCalendarAuth = (config?: GoogleCalendarConfig) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    config?.accessToken ?? null,
  );
  const [error, setError] = useState<string | null>(null);

  const fallbackClientId = asClientId(config?.clientId || config?.webClientId);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: fallbackClientId,
    webClientId: asClientId(config?.webClientId) ?? fallbackClientId,
    iosClientId: asClientId(config?.iosClientId) ?? fallbackClientId,
    androidClientId: asClientId(config?.androidClientId) ?? fallbackClientId,
    scopes: [CALENDAR_SCOPE],
    selectAccount: true,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication?.accessToken ?? null);
      setError(null);
      return;
    }

    if (response?.type === 'error') {
      setError(response.error?.message ?? 'Google sign-in failed');
    }
  }, [response]);

  const signIn = async () => {
    const result = await promptAsync();
    if (result?.type === 'error') {
      setError(result.error?.message ?? 'Google sign-in failed');
    }
  };

  const signOut = () => {
    setAccessToken(null);
    setError(null);
  };

  return {
    accessToken,
    error,
    canPrompt: Boolean(request),
    signIn,
    signOut,
  };
};

export type GoogleCalendarAuth = ReturnType<typeof useGoogleCalendarAuth>;
