import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemePicker from '../components/ThemePicker';

// Starter version of music integration: deep-links into Spotify rather than
// controlling playback in-app. Full playback control needs the Spotify
// native SDK, which requires an Expo dev client build (see README).
async function openSpotify() {
  const spotifyUrl = 'spotify:'; // opens the Spotify app if installed
  const webUrl = 'https://open.spotify.com';
  const supported = await Linking.canOpenURL(spotifyUrl);
  await Linking.openURL(supported ? spotifyUrl : webUrl);
}

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Settings</Text>

      <View style={styles.section}>
        <ThemePicker />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Music</Text>
        <TouchableOpacity
          style={[styles.musicButton, { backgroundColor: theme.surface }]}
          onPress={openSpotify}
        >
          <Text style={{ color: theme.text, fontWeight: '600' }}>Open Spotify</Text>
          <Text style={{ color: theme.muted, fontSize: 12, marginTop: 2 }}>
            Full in-app playback control coming later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  section: { marginBottom: 32 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  musicButton: {
    padding: 16,
    borderRadius: 12,
  },
});
