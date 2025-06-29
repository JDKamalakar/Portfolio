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
        className="p-3 rounded-full backdrop-blur-sm bg-white/15 dark:bg-gray-800/15 border border-white/40 dark:border-gray-700/40 hover:bg-white/25 dark:hover:bg-gray-800/25 transition-all duration-300 hover:scale-110 group shadow-lg"
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6">
          {isSystemTheme ? (
            <Monitor className="text-blue-500 dark:text-blue-400 backdrop-blur-sm" size={24} />
          ) : (
            <>
              <Sun 
                className={`absolute backdrop-blur-sm inset-0 text-yellow-500 transition-all duration-300 ${
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

      {/* Enhanced Animated Theme Popup with maximum transparency and blur */}
      <div className={`absolute top-16 right-0 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/50 dark:border-gray-700/50 rounded-xl shadow-2xl p-2 min-w-[160px] transform transition-all duration-500 ease-out origin-top-right ${
        showOptions 
          ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
          : 'opacity-0 scale-75 -translate-y-4 rotate-12'
      }`}>
        <button
          onClick={handleSystemTheme}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm ${
            isSystemTheme ? 'bg-blue-500/30 text-blue-600 dark:text-blue-400 scale-105 shadow-lg' : 'text-gray-700 dark:text-gray-300'
          }`}
          style={{ 
            transitionDelay: showOptions ? '100ms' : '0ms',
            transform: showOptions ? 'translateX(0)' : 'translateX(-10px)',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Monitor size={16} className="transition-transform duration-300 hover:rotate-12" />
          <span className="text-sm font-medium">System</span>
        </button>
        <button
          onClick={() => handleManualTheme(false)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm ${
            !isSystemTheme && !isDark ? 'bg-yellow-500/30 text-yellow-600 dark:text-yellow-400 scale-105 shadow-lg' : 'text-gray-700 dark:text-gray-300'
          }`}
          style={{ 
            transitionDelay: showOptions ? '150ms' : '0ms',
            transform: showOptions ? 'translateX(0)' : 'translateX(-10px)',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Sun size={16} className="transition-transform duration-300 hover:rotate-180" />
          <span className="text-sm font-medium">Light</span>
        </button>
        <button
          onClick={() => handleManualTheme(true)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm ${
            !isSystemTheme && isDark ? 'bg-blue-500/30 text-blue-600 dark:text-blue-400 scale-105 shadow-lg' : 'text-gray-700 dark:text-gray-300'
          }`}
          style={{ 
            transitionDelay: showOptions ? '200ms' : '0ms',
            transform: showOptions ? 'translateX(0)' : 'translateX(-10px)',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Moon size={16} className="transition-transform duration-300 hover:-rotate-12" />
          <span className="text-sm font-medium">Dark</span>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;