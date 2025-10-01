import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
// Assuming your ThemeProvider path is correct
import { useTheme } from '../components/ThemeProvider'; 

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const themeToggleRef = useRef<HTMLDivElement>(null);

  const isSystemActive = theme === 'system';
  const isLightActive = theme === 'light';
  const isDarkActive = theme === 'dark';

  // Handle scroll detection for positioning
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close the options popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeToggleRef.current && !themeToggleRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  const handleThemeSelect = (selectedTheme: 'system' | 'light' | 'dark') => {
    setTheme(selectedTheme);
    setShowOptions(false);
  };

  const themePopoverOptions = [
    { label: 'System', value: 'system' as const, icon: Monitor, active: isSystemActive, color: 'text-blue-500', hoverAnim: 'group-hover:rotate-12' },
    { label: 'Light', value: 'light' as const, icon: Sun, active: isLightActive, color: 'text-yellow-500', hoverAnim: 'group-hover:rotate-180' },
    { label: 'Dark', value: 'dark' as const, icon: Moon, active: isDarkActive, color: 'text-blue-500 dark:text-blue-400', hoverAnim: 'group-hover:rotate-[360deg]' }
  ];

  return (
    <div
      ref={themeToggleRef}
      className={`hidden sm:block fixed z-40 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'top-[17px] right-6'
          : 'top-[26px] right-14'
      }`}
      style={{
        paddingTop: 'var(--mobile-safe-area-top)',
        paddingRight: 'var(--mobile-safe-area-right)'
      }}
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`flex items-center justify-center bg-white/25 dark:bg-gray-800/25 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 group shadow-xl touch-target active:scale-95 hover:scale-110 ${
          isScrolled
            ? 'w-[60px] h-16 rounded-xl sm:rounded-2xl'
            : 'p-2 sm:p-3 rounded-xl sm:rounded-2xl'
        }`}
        aria-label="Toggle theme"
      >
        <div className={`relative flex items-center justify-center transition-all duration-300 ease-in-out ${
            isScrolled ? 'w-6 h-6' : 'w-5 h-5 sm:w-6 sm:h-6'
          } ${showOptions ? 'rotate-[360deg]' : 'rotate-0'}`}
        >
          <Monitor
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              isSystemActive
                ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110'
                : 'opacity-0 scale-50 rotate-[-90deg]'
            } text-blue-500 dark:text-blue-400`}
          />
          <Sun
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              isLightActive
                ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-180'
                : 'opacity-0 scale-50 rotate-[90deg]'
            } text-yellow-500`}
          />
          <Moon
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              isDarkActive
                ? 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-[360deg]'
                : 'opacity-0 scale-50 rotate-[-90deg]'
            } text-blue-400`}
          />
        </div>
      </button>

      <div className={`absolute top-full mt-2 right-0 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-gray-300/30 dark:border-gray-700/30 rounded-xl sm:rounded-2xl shadow-xl p-2 flex flex-col hover:gap-2 gap-1 min-w-[160px] transform transition-all duration-700 ease-out origin-top-right ${
        showOptions
          ? 'opacity-100 scale-100 translate-y-0 rotate-0 pointer-events-auto'
          : 'opacity-0 scale-75 -translate-y-4 rotate-12 pointer-events-none'
      }`}>
        {themePopoverOptions.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === themePopoverOptions.length - 1;

          let roundingClass;
          if (option.active) {
            roundingClass = 'rounded-xl';
          } else {
            roundingClass = isFirst
              ? 'rounded-t-xl rounded'
              : isLast
                ? 'rounded-b-xl rounded'
                : 'rounded';
          }

          return (
            <button
              key={option.value}
              onClick={() => handleThemeSelect(option.value)}
              className={`group w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 backdrop-blur-sm transform origin-center hover:scale-105 hover:-translate-y-1 text-xs hover:rounded-xl hover:gap-2 sm:text-sm font-medium ${roundingClass} ${
                option.active
                  ? 'bg-primary/80 text-white shadow-lg dark:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                  : 'text-gray-900 dark:text-white hover:bg-white/10 dark:hover:bg-black/20 dark:shadow-[0_0_8px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]'
              }`}
              style={{
                transitionDelay: showOptions ? `${100 + index * 50}ms` : '0ms',
                opacity: showOptions ? 1 : 0,
              }}
            >
              <option.icon
                size={18}
                className={`transition-all duration-300 group-hover:scale-110 ${option.color} ${option.hoverAnim} ${
                  option.active ? 'scale-110' : ''
                }`}
              />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};