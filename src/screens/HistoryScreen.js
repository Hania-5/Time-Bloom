import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { getHistory, clearHistory } from '../storage/storage';

function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => n.toString().padStart(2, '0');
  return h > 0 ? `${h}h ${pad(m)}m` : `${m}m ${pad(s)}s`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export default function HistoryScreen() {
  const { theme } = useTheme();
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getHistory().then(setHistory);
    }, [])
  );

  const handleClear = async () => {
    await clearHistory();
    setHistory([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: theme.text }]}>History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={{ color: theme.muted }}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <Text style={[styles.empty, { color: theme.muted }]}>
          No sessions yet — start a timer to see it here.
        </Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: theme.surface }]}>
              <View>
                <Text style={[styles.itemLabel, { color: theme.text }]}>{item.label}</Text>
                <Text style={[styles.itemDate, { color: theme.muted }]}>{formatDate(item.date)}</Text>
              </View>
              <Text style={[styles.itemDuration, { color: theme.primary }]}>
                {formatDuration(item.durationSeconds)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: { fontSize: 28, fontWeight: '700' },
  empty: { fontSize: 15, marginTop: 40, textAlign: 'center' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemLabel: { fontSize: 16, fontWeight: '600' },
  itemDate: { fontSize: 13, marginTop: 2 },
  itemDuration: { fontSize: 16, fontWeight: '700' },
});
