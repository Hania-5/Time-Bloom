import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { getNotes, saveNote, deleteNote } from '../storage/storage';

export default function NotesScreen() {
  const { theme } = useTheme();
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');

  useFocusEffect(
    useCallback(() => {
      getNotes().then(setNotes);
    }, [])
  );

  const handleAdd = async () => {
    if (!draft.trim()) return;
    const updated = await saveNote({ text: draft.trim(), date: new Date().toISOString() });
    setNotes(updated);
    setDraft('');
  };

  const handleDelete = async (id) => {
    const updated = await deleteNote(id);
    setNotes(updated);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Notes</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.surface }]}
          placeholder="Jot something down..."
          placeholderTextColor={theme.muted}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteItem, { backgroundColor: theme.surface }]}>
            <Text style={{ color: theme.text, flex: 1 }}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: theme.muted, marginLeft: 12 }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 16 },
  input: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  addButton: {
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 10,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  noteItem: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
});
