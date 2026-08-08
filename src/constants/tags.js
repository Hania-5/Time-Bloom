// Fixed set of session tags. Colors are intentionally NOT theme-dependent —
// they need to stay visually distinct from each other regardless of which
// app theme is active, so they're defined here as fixed hex values.
export const TAGS = [
  { key: 'work', label: 'Work', color: '#7f5af0' },
  { key: 'study', label: 'Study', color: '#4fb0e8' },
  { key: 'exercise', label: 'Exercise', color: '#6bcf7f' },
  { key: 'reading', label: 'Reading', color: '#ff9f6b' },
  { key: 'personal', label: 'Personal', color: '#ff6b9d' },
];

export function getTagByKey(key) {
  return TAGS.find((t) => t.key === key) || null;
}