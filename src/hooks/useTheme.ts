import { useState, useEffect, useCallback } from 'react';
import type { ThemeName } from '../types';

const THEME_KEY = 'noQuli-theme';

export interface UseThemeReturn {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) {
        return stored;
      }
    }
    // Default to gruvbox theme
    return 'gruvbox';
  });

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    // Remove all possible theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-gruvbox');
    root.classList.add(`theme-${theme}`);

    // Also apply to body for full coverage
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-gruvbox');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}

export default useTheme;
