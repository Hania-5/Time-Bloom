import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem } from '../storage/storage';

// A handful of starter themes. Add more here any time — each just needs
// a background, a surface (card) color, a primary accent, and text color.
export const THEMES = {
  midnight: {
    name: 'Midnight',
    background: '#1a1a2e',
    surface: '#232342',
    primary: '#7f5af0',
    text: '#ffffff',
    muted: '#a0a0c0',
  },
  bloom: {
    name: 'Bloom',
    background: '#2d1b2e',
    surface: '#3d2540',
    primary: '#ff6b9d',
    text: '#ffffff',
    muted: '#c9a0b8',
  },
  forest: {
    name: 'Forest',
    background: '#1b2e1f',
    surface: '#243d29',
    primary: '#6bcf7f',
    text: '#ffffff',
    muted: '#a0c9a8',
  },
  ocean: {
    name: 'Ocean',
    background: '#0f2437',
    surface: '#16344d',
    primary: '#4fb0e8',
    text: '#ffffff',
    muted: '#9dc4dc',
  },
  light: {
    name: 'Light',
    background: '#f5f5f7',
    surface: '#ffffff',
    primary: '#7f5af0',
    text: '#1a1a2e',
    muted: '#6e6e80',
  },
};

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'timebloom_theme';

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('midnight');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await getItem(THEME_STORAGE_KEY);
      if (saved && THEMES[saved]) setThemeKey(saved);
      setLoaded(true);
    })();
  }, []);

  const setTheme = async (key) => {
    if (!THEMES[key]) return;
    setThemeKey(key);
    await setItem(THEME_STORAGE_KEY, key);
  };

  if (!loaded) return null; // could show a splash/loading state here

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeKey], themeKey, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
