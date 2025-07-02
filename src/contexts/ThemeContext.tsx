import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  setSystemTheme: (useSystem: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isSystemTheme, setIsSystemThemeState] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedSystemPref = localStorage.getItem('useSystemTheme');
    
    // If no saved preference exists, default to system theme
    if (savedSystemPref === null || savedSystemPref === 'true') {
      setIsSystemThemeState(true);
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      setIsSystemThemeState(false);
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      
      mediaQuery.addEventListener('change', handleChange);
      setIsDark(mediaQuery.matches);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [isSystemTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    if (!isSystemTheme) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, isSystemTheme]);

  useEffect(() => {
    localStorage.setItem('useSystemTheme', isSystemTheme.toString());
  }, [isSystemTheme]);

  const toggleTheme = () => {
    if (isSystemTheme) {
      // From System to Light
      setIsSystemThemeState(false);
      setIsDark(false);
    } else if (!isDark) {
      // From Light to Dark
      setIsDark(true);
    } else {
      // From Dark back to System
      setIsSystemThemeState(true);
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  };

  const setSystemTheme = (useSystem: boolean) => {
    setIsSystemThemeState(useSystem);
    if (useSystem) {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isSystemTheme, setSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};