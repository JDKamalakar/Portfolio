import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextType {
  theme: 'system' | 'light' | 'dark';
  setTheme: (theme: 'system' | 'light' | 'dark') => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to get system theme, safely handles SSR
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default for SSR or environments without matchMedia
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize theme state directly from localStorage during initial render
  const [theme, setInternalTheme] = useState<'system' | 'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'system' | 'light' | 'dark' | null;
      if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return 'system'; // Default if no saved theme or not in browser environment
  });

  const [isDark, setIsDark] = useState<boolean>(false);

  // 2. Memoize applyTheme function using useCallback
  const applyTheme = useCallback((currentTheme: 'system' | 'light' | 'dark', isInitialLoad: boolean = false) => {
    const root = document.documentElement; // Targets the <html> tag
    root.classList.remove('light', 'dark'); // Always clean up first

    let actualIsDark = false;

    if (currentTheme === 'system') {
      actualIsDark = getSystemTheme() === 'dark';
      root.classList.toggle('dark', actualIsDark);
      root.classList.toggle('light', !actualIsDark); // Ensure 'light' is also applied if not dark
    } else {
      actualIsDark = currentTheme === 'dark';
      root.classList.toggle('dark', actualIsDark);
      root.classList.toggle('light', !actualIsDark); // Ensure 'light' is also applied if not dark
    }
    setIsDark(actualIsDark);

    // Only save to localStorage if it's not the initial load within this function call
    // The public setTheme will handle saving on explicit user actions
    if (!isInitialLoad) {
       localStorage.setItem('theme', currentTheme);
    }
  }, []); // No dependencies needed for applyTheme as it uses memoized getSystemTheme and direct DOM access


  // 3. Effect to apply theme class on initial load (only once)
  // This useEffect will run once after the component mounts, applying the theme from state (which was from localStorage)
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this runs only in browser
      applyTheme(theme, true); // Pass true to indicate initial load, so it doesn't re-save to localStorage here
    }
  }, []); // Empty dependency array means this runs once on mount


  // 4. Effect to re-apply theme and listen for system changes when theme state or system preference changes
  useEffect(() => {
    // This effect runs whenever 'theme' state changes, including from localStorage init.
    // It also sets up the listener for 'system' theme changes.
    applyTheme(theme); // Re-apply theme class

    if (theme === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system'); // Re-apply system theme logic
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, applyTheme]); // Depend on theme and the memoized applyTheme


  // 5. Public setTheme function that updates internal state AND persists to localStorage
  const publicSetTheme = useCallback((newTheme: 'system' | 'light' | 'dark') => {
    setInternalTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme); // Explicitly save to localStorage here
    }
    // applyTheme will be called by the useEffect above due to theme state change
  }, []);

  const value = {
    theme,
    setTheme: publicSetTheme, // Expose the persisting setter
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
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