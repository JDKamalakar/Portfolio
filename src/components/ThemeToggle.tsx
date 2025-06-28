import React, { useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, isSystemTheme, setSystemTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const handleSystemTheme = () => {
    setSystemTheme(true);
    setShowOptions(false);
  };

  const handleManualTheme = (dark: boolean) => {
    setSystemTheme(false);
    if (isDark !== dark) {
      toggleTheme();
    }
    setShowOptions(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-3 rounded-full backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-110 group shadow-lg"
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6">
          {isSystemTheme ? (
            <Monitor className="text-blue-500 dark:text-blue-400" size={24} />
          ) : (
            <>
              <Sun 
                className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${
                  isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
                size={24}
              />
              <Moon 
                className={`absolute inset-0 text-blue-400 transition-all duration-300 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}
                size={24}
              />
            </>
          )}
        </div>
      </button>

      {showOptions && (
        <div className="absolute top-16 right-0 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border border-white/30 dark:border-gray-700/30 rounded-xl shadow-xl p-2 min-w-[160px]">
          <button
            onClick={handleSystemTheme}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50 ${
              isSystemTheme ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Monitor size={16} />
            <span className="text-sm font-medium">System</span>
          </button>
          <button
            onClick={() => handleManualTheme(false)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50 ${
              !isSystemTheme && !isDark ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Sun size={16} />
            <span className="text-sm font-medium">Light</span>
          </button>
          <button
            onClick={() => handleManualTheme(true)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50 ${
              !isSystemTheme && isDark ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Moon size={16} />
            <span className="text-sm font-medium">Dark</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;