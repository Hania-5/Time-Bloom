import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TAGS } from '../constants/tags';

// Horizontal row of selectable tag chips. `selected` is a tag key or null.
// Pass `allowNone` to let the user clear the selection by tapping again
// or via an explicit "None" chip (used on the Timer screen where a tag
// is optional).
export default function TagPicker({ selected, onSelect, allowNone = true }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {allowNone && (
        <TouchableOpacity
          style={[
            styles.chip,
            { borderColor: '#666' },
            selected === null && styles.chipSelectedNone,
          ]}
          onPress={() => onSelect(null)}
        >
          <Text style={[styles.chipText, { color: selected === null ? '#fff' : '#999' }]}>None</Text>
        </TouchableOpacity>
      )}
      {TAGS.map((tag) => {
        const isSelected = selected === tag.key;
        return (
          <TouchableOpacity
            key={tag.key}
            style={[
              styles.chip,
              { borderColor: tag.color },
              isSelected && { backgroundColor: tag.color },
            ]}
            onPress={() => onSelect(isSelected && allowNone ? null : tag.key)}
          >
            <View style={[styles.dot, { backgroundColor: tag.color }]} />
            <Text style={[styles.chipText, { color: isSelected ? '#fff' : tag.color }]}>
              {tag.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 4,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  chipSelectedNone: {
    backgroundColor: '#666',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});