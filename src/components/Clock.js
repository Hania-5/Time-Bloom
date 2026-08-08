import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Renders in a fixed corner of whatever screen it's placed on.
// Pass `corner` as one of: 'top-right' (default), 'top-left', 'bottom-right', 'bottom-left'.
export default function Clock({ corner = 'top-right' }) {
  const { theme } = useTheme();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 15); // updates every 15s, plenty for a clock display
    return () => clearInterval(interval);
  }, []);

  return (
    <Text style={[styles.clock, styles[corner], { color: theme.muted }]}>
      {formatTime(now)}
    </Text>
  );
}

const styles = StyleSheet.create({
  clock: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '500',
  },
  'top-right': { top: 16, right: 16 },
  'top-left': { top: 16, left: 16 },
  'bottom-right': { bottom: 16, right: 16 },
  'bottom-left': { bottom: 16, left: 16 },
});
