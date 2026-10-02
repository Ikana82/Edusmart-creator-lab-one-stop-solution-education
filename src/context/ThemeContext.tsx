import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTheme, THEME_CONFIGS, ThemeConfig } from '../types/theme';

interface ThemeContextType {
  currentTheme: ColorTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: ColorTheme) => void;
  availableThemes: ColorTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => {
    try {
      const saved = localStorage.getItem('edusmart_theme');
      if (saved && (saved === 'biru' || saved === 'hijau' || saved === 'navy' || saved === 'lilac' || saved === 'pink' || saved === 'orange')) {
        return saved as ColorTheme;
      }
    } catch {
      // Fallback
    }
    return 'biru';
  });

  const setTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem('edusmart_theme', theme);
    } catch {
      // Ignore
    }
  };

  const themeConfig = THEME_CONFIGS[currentTheme];
  const availableThemes: ColorTheme[] = ['biru', 'hijau', 'navy', 'lilac', 'pink', 'orange'];

  return (
    <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
