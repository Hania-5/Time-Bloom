import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Hand-rolled bar chart — no chart library needed, so no extra native
// dependencies or version risk. Takes an array of 7 { label, minutes }
// entries (oldest to newest) and renders proportional bars.
export default function WeeklyBarChart({ data }) {
  const { theme } = useTheme();
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1); // avoid divide-by-zero

  return (
    <View style={styles.container}>
      {data.map((d, i) => {
        const heightPct = (d.minutes / maxMinutes) * 100;
        return (
          <View key={i} style={styles.barColumn}>
            <Text style={[styles.valueLabel, { color: theme.muted }]}>
              {d.minutes > 0 ? `${d.minutes}m` : ''}
            </Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${heightPct}%`,
                    backgroundColor: d.minutes > 0 ? theme.primary : theme.surface,
                  },
                ]}
              />
            </View>
            <Text style={[styles.dayLabel, { color: theme.muted }]}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const BAR_TRACK_HEIGHT = 120;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  valueLabel: {
    fontSize: 11,
    marginBottom: 4,
    height: 14,
  },
  barTrack: {
    height: BAR_TRACK_HEIGHT,
    width: 20,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
});