import AsyncStorage from '@react-native-async-storage/async-storage';

// Thin wrapper around AsyncStorage so the rest of the app doesn't need
// to think about JSON parsing or error handling everywhere.

export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.warn('storage getItem failed', key, e);
    return null;
  }
}

export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('storage setItem failed', key, e);
  }
}

// --- Session history ---
const HISTORY_KEY = 'timebloom_history';

export async function getHistory() {
  const history = await getItem(HISTORY_KEY);
  return history || [];
}

export async function addHistoryEntry(entry) {
  const history = await getHistory();
  const updated = [{ id: Date.now().toString(), ...entry }, ...history];
  await setItem(HISTORY_KEY, updated);
  return updated;
}

export async function clearHistory() {
  await setItem(HISTORY_KEY, []);
}

// --- Notes ---
const NOTES_KEY = 'timebloom_notes';

export async function getNotes() {
  const notes = await getItem(NOTES_KEY);
  return notes || [];
}

export async function saveNote(note) {
  const notes = await getNotes();
  const updated = [{ id: Date.now().toString(), ...note }, ...notes];
  await setItem(NOTES_KEY, updated);
  return updated;
}

export async function deleteNote(id) {
  const notes = await getNotes();
  const updated = notes.filter((n) => n.id !== id);
  await setItem(NOTES_KEY, updated);
  return updated;
}
