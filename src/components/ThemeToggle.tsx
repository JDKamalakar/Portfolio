import React, { useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, isSystemTheme, setSystemTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleSystemTheme = () => {
    if (!isSystemTheme) {
      triggerRotation();
      setSystemTheme(true);
    }
    setShowOptions(false);
  };

  const handleManualTheme = (dark: boolean) => {
    if (isSystemTheme || isDark !== dark) {
      triggerRotation();
      setSystemTheme(false);
      if (isDark !== dark) {
        toggleTheme();
      }
    }
    setShowOptions(false);
  };

  const triggerRotation = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 600);
  };

  const handleToggleClick = () => {
    triggerRotation();
    toggleTheme();
    setShowOptions(!showOptions);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={handleToggleClick}
        className="p-3 rounded-2xl backdrop-blur-md bg-white/25 dark:bg-gray-800/25 border border-gray-300/40 dark:border-gray-700/40 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-110 group shadow-xl"
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6">
          {/* System Theme Icon */}
          <Monitor 
            className={`absolute inset-0 text-blue-500 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse ${
              isSystemTheme ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
            } ${isRotating ? 'animate-spin' : ''}`}
            size={24}
          />
          
          {/* Light Theme Icon */}
          <Sun 
            className={`absolute inset-0 text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-180 ${
              !isSystemTheme && !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
            } ${isRotating ? 'animate-spin' : ''}`}
            size={24}
          />
          
          {/* Dark Theme Icon */}
          <Moon 
            className={`absolute inset-0 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:animate-pulse ${
              !isSystemTheme && isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            } ${isRotating ? 'animate-spin' : ''}`}
            size={24}
          />
        </div>
      </button>

      {/* Enhanced Animated Theme Popup with navigation-style blur and spacing */}
      <div className={`absolute top-16 right-0 backdrop-blur-md bg-white/25 dark:bg-gray-800/25 border border-gray-300/40 dark:border-gray-700/40 rounded-2xl shadow-xl p-3 min-w-[180px] transform transition-all duration-500 ease-out origin-top-right ${
        showOptions 
          ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
          : 'opacity-0 scale-75 -translate-y-4 rotate-12'
      }`}>
        <button
          onClick={handleSystemTheme}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm mb-2 group ${
            isSystemTheme 
              ? 'bg-blue-500/40 text-blue-700 dark:text-blue-300 shadow-lg scale-105 border border-blue-300/30 dark:border-blue-500/30' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
          }`}
          style={{ 
            transitionDelay: showOptions ? '100ms' : '0ms',
            transform: showOptions ? 'translateX(0)' : 'translateX(-10px)',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Monitor 
            size={18} 
            className={`transition-all duration-300 ${
              isSystemTheme 
                ? 'animate-pulse scale-110' 
                : 'group-hover:rotate-12 group-hover:scale-110'
            }`} 
          />
          <span className="text-sm font-medium">System</span>
        </button>
        
        <button
          onClick={() => handleManualTheme(false)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm mb-2 group ${
            !isSystemTheme && !isDark 
              ? 'bg-yellow-500/40 text-yellow-700 dark:text-yellow-300 shadow-lg scale-105 border border-yellow-300/30 dark:border-yellow-500/30' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
          }`}
          style={{ 
            transitionDelay: showOptions ? '150ms' : '0ms',
            transform: showOptions ? 'translateX(0)' : 'translateX(-10px)',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Sun 
            size={18} 
            className={`transition-all duration-300 ${
              !isSystemTheme && !isDark 
                ? 'animate-pulse scale-110' 
                : 'group-hover:rotate-180 group-hover:scale-110'
            }`} 
          />
          <span className="text-sm font-medium">Light</span>
        </button>
        
        <button
          onClick={() => handleManualTheme(true)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm group ${
            !isSystemTheme && isDark 
              ? 'bg-blue-500/40 text-blue-700 dark:text-blue-300 shadow-lg scale-105 border border-blue-300/30 dark:border-blue-500/30' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
          }`}
          style={{ 
            transitionDelay: showOptions ? '200ms' : '0ms',
            transform: showOptions ? 'translateX(0)' : 'translateX(-10px)',
            opacity: showOptions ? 1 : 0
          }}
        >
          <Moon 
            size={18} 
            className={`transition-all duration-300 ${
              !isSystemTheme && isDark 
                ? 'animate-pulse scale-110' 
                : 'group-hover:-rotate-12 group-hover:scale-110'
            }`} 
          />
          <span className="text-sm font-medium">Dark</span>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;