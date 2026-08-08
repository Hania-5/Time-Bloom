import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { addHistoryEntry } from '../storage/storage';
import Clock from '../components/Clock';

function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => n.toString().padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function TimerScreen() {
  const { theme } = useTheme();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [label, setLabel] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStartPause = () => setRunning((r) => !r);

  const handleReset = async () => {
    if (seconds > 0) {
      await addHistoryEntry({
        label: label.trim() || 'Untitled session',
        durationSeconds: seconds,
        date: new Date().toISOString(),
      });
    }
    setRunning(false);
    setSeconds(0);
    setLabel('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" />
      <Clock corner="top-right" />

      <TextInput
        style={[styles.labelInput, { color: theme.muted }]}
        placeholder="What are you working on?"
        placeholderTextColor={theme.muted}
        value={label}
        onChangeText={setLabel}
      />

      <Text style={[styles.timerText, { color: theme.text }]}>
        {formatDuration(seconds)}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleStartPause}
        >
          <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton, { borderColor: theme.muted }]}
          onPress={handleReset}
        >
          <Text style={[styles.buttonText, { color: theme.muted }]}>
            {running || seconds > 0 ? 'Stop & Save' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  labelInput: {
    position: 'absolute',
    top: 80,
    fontSize: 16,
    textAlign: 'center',
    width: '80%',
  },
  timerText: {
    fontSize: 72,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
    marginBottom: 48,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
