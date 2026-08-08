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
// Aggregates history into the last 7 days' total minutes, oldest to newest.
// Returns [{ label: 'Mon', minutes: 42, dateKey: '2026-08-02' }, ...]
export async function getWeeklyTotals() {
  const history = await getHistory();
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const label = d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
    days.push({ dateKey, label, minutes: 0 });
  }

  const dayMap = Object.fromEntries(days.map((d) => [d.dateKey, d]));

  for (const session of history) {
    const dateKey = session.date?.slice(0, 10);
    if (dayMap[dateKey]) {
      dayMap[dateKey].minutes += Math.round(session.durationSeconds / 60);
    }
  }

  return days;
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
