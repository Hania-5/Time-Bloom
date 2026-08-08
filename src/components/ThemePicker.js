import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemePicker() {
  const { theme, themeKey, setTheme, themes } = useTheme();

  return (
    <View>
      <Text style={[styles.label, { color: theme.text }]}>Theme</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.entries(themes).map(([key, t]) => (
          <TouchableOpacity
            key={key}
            onPress={() => setTheme(key)}
            style={[
              styles.swatch,
              { backgroundColor: t.background, borderColor: t.primary },
              key === themeKey && styles.selected,
            ]}
          >
            <View style={[styles.dot, { backgroundColor: t.primary }]} />
            <Text style={{ color: t.text, fontSize: 12, marginTop: 6 }}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  swatch: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 3,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
